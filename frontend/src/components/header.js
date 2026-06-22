import React from 'react';
import './header.css';
import Userbox from './userbox';

function Header({setPage, setModalBox}) {

  function changePage(){
		setPage('Basket')
	}

	return (
		<div className="Header">
			<ul>
				<li onClick={() => setPage('Main')}>Главная</li>
				<li onClick={() => setPage('Basket')}>Корзина</li>
			</ul>
			<Userbox setModalBox={setModalBox}/>
		</div>
	);
}

export default Header;
