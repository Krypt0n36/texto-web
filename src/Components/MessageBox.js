import {Group, Text,Avatar, Title, Paper} from '@mantine/core';



function Header(props){
	
	return( 
		<Paper style={{width:'100%', borderBottomRightRadius:'0px', borderBottomLeftRadius:'0px'}} p="md" withBorder>
	<Group>
		<Avatar src={props.avatar} size={40} radius={40} />
		<Title order={5}>{props.username}</Title>
	</Group>	
	</Paper>
	);


}



function Bubble({msg, p}){
	if(p==0){
		return (
			<div mb="sm"><div style={{backgroundColor:'#3b5bdb', padding:'10px', width:'fit-content', borderRadius:'5px', borderTopLeftRadius:'0px'}}>{msg}</div></div>
		)
	}else{
		return 	(<div mb="sm" style={{width:'100%'}}><div style={{margin:'auto', marginRight:'0px',backgroundColor:'#00000042', padding:'10px', width:'fit-content', borderRadius:'5px', borderTopRightRadius:'0px'}}>{msg}</div></div>)

	}
}

function Conversation(props){
	return (
		<Paper p="md" style={{height:'400px', width:'100%', borderTopRightRadius:'0px', borderTopLeftRadius:'0px'}} withBorder>
		<Bubble msg="Hello Hassen" p={0} />
		<Bubble msg="Yes you" p={1} />
	</Paper>

	);
}

export default function MessageBox(props){

	return (
	<Group spacing={0} direction="column">
		<Header avatar={props.contact.avatar} username={props.contact.username} />
		<Conversation />		
	</Group>

	);

}
