import React from 'react';

function Login() {

		function Log(){
				const login = document.getElementById('login').value
				const password = document.getElementById('password').value
				const data = {
						login: login,
						password: password
				}
				console.log(data)
		}

	return (
		<>
			<h1>Логин</h1>
			<input id='login' type='text' placeholder='Логин'/>
			<input id='password' type='password' placeholder='Пароль'/>
			<button onClick={Log}>Войти</button>
		</>
	);
}

export default Login;
