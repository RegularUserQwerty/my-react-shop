import React, { useState } from 'react';

function Login({ setPage, setModalBox }) { //добавил setModalBox
    const [message, setMessage] = useState(''); 
    const [isError, setIsError] = useState(false); 

    function Log() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        
        if (!login || !password) {
            setMessage('Заполните все поля!');
            setIsError(true);
            return;
        }

        const data = {
            login: login,
            password: password
        };

        const api = 'http://localhost:9001/login';

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) throw new Error('Неверный логин или пароль');
            return res.json();
        })
        .then((result) => {
            localStorage.setItem('token', result.token);
            setIsError(false);
            setMessage('Вы успешно авторизованы! Перенаправление...');
            
            // Ждем 1,5 секунды 
            setTimeout(() => {
                setPage('Cabinet');     //переключаем страницу на Кабинет и
                setModalBox('none');    //закрываем модальное окно
            }, 1500);
        })
        .catch(err => {
            setIsError(true);
            setMessage(err.message || 'Ошибка при входе');
        });
    }

    return (
        <div>
            <h1>Логин</h1>
            <input id='login' type='text' placeholder='Логин' />
            <br /><br />
            <input id='password' type='password' placeholder='Пароль' />
            <br /><br />
            <button onClick={Log}>Войти</button>

            {/* Выводим сообщение на экран */}
            {message && (
                <p style={{ color: isError ? 'red' : 'green', marginTop: '15px', fontWeight: 'bold' }}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default Login;