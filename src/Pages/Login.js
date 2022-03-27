import {Button,Title, Table, AppShell, Container, Paper, TextInput, PasswordInput} from '@mantine/core'; 

export default function Login() {
  return (
    <Container size={420} my={40}>
	<Paper radius="sm" p={30} shadow="sm" mt={30} withBorder>
		<Title order={3} mb="lg">Login</Title>
      		<TextInput radius="sm" label="Username :" placeholder="" size="md" required />
		<PasswordInput radius="sm" mt="md" label="Password :" size="md" required />
		
		<Button color="indigo" mt="lg" radius="sm" size="md" fullWidth>Connect</Button>
		<Button onClick={()=>window.location='/register'} color="indigo" variant="default" radius="sm" size="md" mt="sm" fullWidth>Create account</Button>			
	</Paper>    
</Container>
	)
}
