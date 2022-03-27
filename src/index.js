import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MantineProvider, Global} from '@mantine/core';
import {Routes,  Route, Link, BrowserRouter} from 'react-router-dom';
import Login from './Pages/Login.js';
import Register from './Pages/Register.js';
import Main from './Pages/Main.js';

ReactDOM.render(
<React.StrictMode>
<MantineProvider theme={{colorScheme:'dark'}}  withGlobalStyles>
	<Global styles={(theme)=>({
		body:{
			backgroundColor:theme.colors.dark[9],
		}

		})} />
	<BrowserRouter>
	<Routes>
		<Route path="/" element={<Login />} />
		<Route path="register" element={<Register />} />
		<Route path="login" element={<Login />} />
		<Route path="main" element={<Main />} />
	</Routes>
	</BrowserRouter>
</MantineProvider>
</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
