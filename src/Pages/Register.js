import {Button,Title, Table, AppShell, Container, Paper, TextInput, PasswordInput} from '@mantine/core'; 
import {useEventListener} from '@mantine/hooks';
import {useState} from 'react';
import {generateRSAKeyPair, hashSHA256, encryptAES} from './../core/cryptowizardry.js'
import axios from 'axios';


export default function Register() {
	const [form, setForm] = useState({});
	const [errors, setError] = useState({});
	const [loading, setLoading] = useState(false);	

	function createError(error_name, error_label){
		var new_errors = {...errors};			
		new_errors[error_name] = error_label;
		setError(new_errors);	
		console.log(errors)
	}
	function deleteError(error_name){
		// delete error
		var new_errors = {...errors};
		delete new_errors[error_name];
		setError(new_errors);
	}

	function handleFormChange(field_name, field_value){
		// check if user is now repeating password
		if(field_name === 'password-repeat'){
			if((!form.password)||(field_value != form['password'])){
				createError('password-repeat', "Password repeat does not match.")
			}else{
				deleteError('password-repeat');
			}
		}
		if(field_name === 'username'){
			if(errors['username']){
				deleteError('username');
			}
		}

		var new_form = {...form};
		new_form[field_name] = field_value;
		setForm(new_form);
	}
	
	function handleSubmit(){
		setLoading(true);
		generateRSAKeyPair((privateKey, publicKey) => {

            // encrypt private key with password
            const encryptionKey = hashSHA256(form.password);
            const encPrivateKey = encryptAES(privateKey, encryptionKey);


            // hash username
            const identifier = hashSHA256(form.username);

            const payload = {
                identifier: identifier,
		savePrivateKey:1,
		publicKey: publicKey,
                encPrivateKey: encPrivateKey
            }
		console.log(payload)
		axios.post('http://localhost:8080/register', payload)
                .then(function (resp) {
			setLoading(false);
			console.log('Response recieved');
                    console.log(resp);
			if(resp.data.status == -1){
				// username is already taken
				createError('username', 'Username is already taken.')
			}
                })
                .catch(function (err) {
			setLoading(false);
                    console.log(err);
                    //setError('Error communicating with the server.')
                })


        });	
	}
	
	return (
    <Container size={420} my={40}>
	<Paper radius="sm" p={30} shadow="sm" mt={30} withBorder>
		<Title order={3} mb="lg">Register</Title>
		<TextInput error={errors['username']} name="username" onChange={(event)=>handleFormChange(event.currentTarget.name, event.currentTarget.value)} radius="sm" label="Username :" placeholder="" size="md" required />
		<PasswordInput name="password" radius="sm" mt="md" label="Password :" size="md" onChange={(event)=>handleFormChange(event.currentTarget.name, event.currentTarget.value)} required />
		<PasswordInput name="password-repeat" error={errors['password-repeat']} radius="sm" mt="md" label="Repeat password :" size="md" onChange={(event)=>handleFormChange(event.currentTarget.name, event.currentTarget.value)} required />
		<Button loading={loading} onClick={handleSubmit} color="indigo" mt="lg" radius="sm" size="md" fullWidth>Continues</Button>
		<Button onClick={()=>window.location='/login'} color="indigo" variant="default" radius="sm" size="md" mt="sm" fullWidth>Log in</Button>			
	</Paper>    
</Container>
	)
}
