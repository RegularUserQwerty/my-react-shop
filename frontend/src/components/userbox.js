import React from 'react';
import './userbox.css';

function Userbox({setModalBox}) {
	return (
		<div className="Userbox">
			<button onClick={() => setModalBox('Login')}>Вход</button>
			<button onClick={() => setModalBox('Registration')}>Регистрация</button>
		</div>
	);
}

export default Userbox;
