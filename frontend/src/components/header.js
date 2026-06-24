import React from 'react';
import './header.css';
import Userbox from './userbox';

function Header({ setPage, setModalBox }) {

    function changePage() {
        setPage('Basket');
    }

    return (
        <div className="Header">
            <div className="header-logo" onClick={() => setPage('Main')}>
                NORDIC.STORE
            </div>
            <ul>
                <li onClick={() => setPage('Main')}>Главная</li>
                <li onClick={() => setPage('Basket')}>Корзина</li>
                <li onClick={() => setPage('Cabinet')}>Личный кабинет</li>
                <li onClick={() => setModalBox('Admin')}>Админ</li>
            </ul>
            <Userbox setModalBox={setModalBox}/>
        </div>
    );
}

export default Header;