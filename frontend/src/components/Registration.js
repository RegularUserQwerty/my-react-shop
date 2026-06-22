import React from 'react';

function Registration() {

	function Reg(){
				const login = document.getElementById('login').value
				const password = document.getElementById('password').value
				const email = document.getElementById('email').value
				const data = {
						login: login,
						password: password,
						email: email
				}
				console.log(data)
		}

	return (
		<>
			<h1>Регистрация</h1>
			<input id='login' type='text' placeholder='Логин'/>
			<input id='password' type='password' placeholder='Пароль'/>
			<input id='email' type='email' placeholder='email'/>
			<button onClick={Reg}>Сохранить</button>
		</>
	);
}

export default Registration;