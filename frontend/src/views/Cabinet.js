import React, { useState, useEffect } from 'react';
import './Cabinet.css';

function Cabinet({ setPage }) { //принимаем setPage из App чтобы перенаправить на главную при выходе
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false); //открыто ли поле смены пароля

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            setError('Войдите в аккаунт, чтобы просмотреть личный кабинет.');
            return;
        }

        fetch('http://localhost:9001/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) throw new Error('Не удалось авторизоваться или токен устарел');
            return res.json();
        })
        .then(data => setUser(data.user))
        .catch(err => setError(err.message));
    }, []);

    // выход из аккаунта
    function handleLogout() {
        localStorage.removeItem('token'); // стираем токен
        setPage('Main'); // кидаем пользователя на главную страницу
    }

    function changePassword() {
        const token = localStorage.getItem('token');
        const newPassword = document.getElementById('new-password').value;

        if (!newPassword) {
            setMessage('Введите новый пароль!');
            return;
        }

        fetch('http://localhost:9001/change-password', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPassword: newPassword })
        })
        .then(res => res.json())
        .then(data => {
            setMessage(data.message);
            document.getElementById('new-password').value = ''; 
            setIsEditing(false); // прячем поле обратно после успешной смены
        })
        .catch(() => {
            setMessage('Ошибка при смене пароля');
        });
    }

    if (error) {
        return (
            <div className="Cabinet-container">
                <h3 className="Cabinet-error">{error}</h3>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="Cabinet-container">
                <p className="Cabinet-loading">Загрузка профиля...</p>
            </div>
        );
    }

    return (
        <div className="Cabinet-container">
            <h2>Личный кабинет</h2>
            <div className="Cabinet-card">
                <p><strong>Логин:</strong> {user.login}</p>
                <p><strong>Email:</strong> {user.email}</p>
                
                <div className="Cabinet-divider"></div>
                
                 {/* если кнопка не нажата - показываем просто кнопку вызова меню  */}
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="Cabinet-btn-secondary">
                        Сменить пароль
                    </button>
                ) : (
                    /* если нажали - показываем форму */
                    <div className="Cabinet-password-block">
                        <h3>Новый пароль</h3>
                        <input id="new-password" type="password" placeholder="Введите новый пароль" className="Cabinet-input" />
                        <div className="Cabinet-btn-group">
                            <button onClick={changePassword} className="Cabinet-btn">Сохранить</button>
                            <button onClick={() => setIsEditing(false)} className="Cabinet-btn-cancel">Отмена</button>
                        </div>
                    </div>
                )}
                
                {message && <p className="Cabinet-message">{message}</p>}

                <div className="Cabinet-divider"></div>

                <button onClick={handleLogout} className="Cabinet-btn-logout">
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
}

export default Cabinet;