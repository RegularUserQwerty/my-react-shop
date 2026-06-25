import React, { useState } from 'react';

function Registration() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); 

  function Reg() {
    // валидация имейл
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      alert("Пожалуйста, введите корректный email адрес!");
      return; 
    }

    const data = { login, password, email };
    console.log(data);

    const api = 'http://localhost:9001/registration';
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(result => result.json())
    .then((result) => {
      console.log(result);
      setMessage("Вы успешно зарегистрированы!");
      setLogin('');
      setPassword('');
      setEmail('');
    })
    .catch((err) => {
      console.log(err);
      alert("Ошибка при регистрации на сервере!");
    });
  }

  return (
    <>
      <h1>Регистрация</h1>
      {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
      <input value={login} onChange={(e) => setLogin(e.target.value)} type='text' placeholder='Логин'/>
      <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Пароль'/>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='email'/>
      <button onClick={Reg}>Сохранить</button>
    </>
  );
}

export default Registration;