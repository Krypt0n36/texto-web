import {Grid, Paper,Title, Input, Divider, Group, Avatar, Text} from '@mantine/core';
import {Search} from 'tabler-icons-react';
import {useViewportSize} from '@mantine/hooks';
import MessageBox from './../Components/MessageBox.js';



function SearchBox(props){
	return (
	<Group {...props}>
		<Input style={{width:'100%'}} icon={<Search />} fullWidth placeholder="Search in contacts" radius="xl" size="md" />
	</Group>

	);

}





function ContactsList(props){
	
	return (
	<>
		<Title order={5}>DIRECT MESSAGES</Title>
		{props.list.map((item)=><Group mt="sm" spacing="sm">
			<Avatar size={50} src={item.avatar} radius={30} />
			<Group position="left" spacing="none" direction="column">
			<Text size="md" weight={700}>
				{item.username}
			</Text>
			<Text size="sm">{item.lastMessage}</Text>
			</Group>
		</Group>)}
	</>
	);
}

export default function Main(){
	const {height, width} = useViewportSize();
	
	const contacts = [
	{username:'Kry', avatar:'https://variety.com/wp-content/uploads/2021/10/Guy-oseary-ape.jpg?w=1000', lastMessage:'Hello'},
	{username:'Firas', avatar:'https://watcher.guru/news/wp-content/uploads/2021/08/unnamed-2-1.png.webp', lastMessage:'Wassup'}
	]



	return (
		<Grid style={{height:height}}>
			<Grid.Col  span={4} p="md">
				<Paper p="sm" >
					<SearchBox mb="sm" fullWidth/>
					<ContactsList list={contacts} />
				</Paper>
			</Grid.Col>
			<Grid.Col span={8} p="md">

					<MessageBox contact={contacts[0]} />

			</Grid.Col>

		</Grid>

	
	);

}
