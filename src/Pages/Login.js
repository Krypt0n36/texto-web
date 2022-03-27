import {Alert, Button,Title, Table, AppShell, Container, Paper, TextInput, PasswordInput} from '@mantine/core'; 
import {useState} from 'react';
import {hashSHA256, deriveRSAPublicKey, decryptAES} from './../core/cryptowizardry.js';
import {AlertCircle} from 'tabler-icons-react';
import axios from 'axios';


export default function Login() {
  
	const [form, setForm] = useState({});
	const [error, setError] = useState(undefined);
	const [loader, setLoader] = useState(false);
	

	function handleChange(field_name, field_value){
		var new_form = {...form};
		new_form[field_name] = field_value;
		setForm(new_form);
	}
	
	function handleSubmit(){
		setLoader(true)
		
		const identifier = hashSHA256(form.username);
        	const password = hashSHA256(form.password);
		console.log(form)	
		console.log({identifier, password})
		// pull key pairs
		axios.get(`http://localhost:8080/pullKeyPair?identifier=${identifier}`)
            	.then((resp) => {
			console.log(resp);
                if(resp.data.status==1){
                    // decrypt private key
                    var privateKey;
                    try {
                        privateKey = decryptAES(resp.data.privateKey, password);
    
                    } catch {
                        setError('Authentication failed, username and password does not correspond.')
                    }
                    // to add : derive public key from private key and compare it with the one's in the response in order to locally verify the authentication process
                    if (resp.data.publicKey == deriveRSAPublicKey(privateKey)) {
                        // Authentication is valid
                        alert('valid')
                    }
                    else {
                        setError('Authentication failed, username and password does not correspond.')
                    }
                    setLoader(false);
                }else if(resp.data.status == 0){
                    setLoader(false);

                    setError('Authentication failed, username and password does not correspond.')
                }else{
                    setLoader(false)
                    setError(`Authentication error, server returned ${resp.data.status} .`)
                }
                
                
            })
            .catch((err) => {
                console.log('[!] Error axios.')
                console.log(err)
                setError('Authentication failed, network error.')

                setLoader(false);
            })
	}




	return (
    <Container size={420} my={40}>
	<Paper radius="sm" p={30} shadow="sm" mt={30} withBorder>
		<Title order={3} mb="lg">Login</Title>
		<TextInput name="username" onChange={(event)=>handleChange(event.currentTarget.name, event.currentTarget.value)} radius="sm" label="Username :" placeholder="" size="md" required />
		<PasswordInput name="password" onChange={(event)=>handleChange(event.currentTarget.name, event.currentTarget.value)} radius="sm" mt="md" label="Password :" size="md" required />
		{error&&<Alert mt="md" icon={<AlertCircle size={16} />} title="Oops!" color="red">
			{error}
		</Alert>}
		<Button onClick={handleSubmit} loading={loader} color="indigo" mt="lg" radius="sm" size="md" fullWidth>Connect</Button>
		<Button onClick={()=>window.location='/register'} color="indigo" variant="default" radius="sm" size="md" mt="sm" fullWidth>Create account</Button>			
	</Paper>    
</Container>
	)
}
