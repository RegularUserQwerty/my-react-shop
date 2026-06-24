import React, { useState } from 'react';

function Admin({ setModalBox }) {
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    function handleAddProduct() {
        const title = document.getElementById('prod-title').value;
        const price = document.getElementById('prod-price').value;
    const image = document.getElementById('prod-image').value;

        if (!title || !price) {
            setMessage('Заполните название и цену!');
            setIsError(true);
            return;
        }

        const data = { title, price, image };

        fetch('http://localhost:9001/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) throw new Error('Не удалось добавить товар');
            return res.json();
        })
        .then((result) => {
            setIsError(false);
            setMessage('Товар успешно добавлен!');
            
            // очищаем поля формы
            document.getElementById('prod-title').value = '';
            document.getElementById('prod-price').value = '';
            document.getElementById('prod-image').value = '';

            // закрываем модалбокс 
            setTimeout(() => {
                setModalBox('none');
                // Перезагруз страницы так как новые товары без этого не появлилсь сразу
                window.location.reload(); 
            }, 1000);
        })
        .catch(err => {
            setIsError(true);
            setMessage(err.message);
        });
    }

    return (
        <div>
            <h1>Добавить товар</h1>
            <input id='prod-title' type='text' placeholder='Название товара' />
            <br /><br />
            <input id='prod-price' type='number' placeholder='Цена (руб.)' />
            <br /><br />
            <input id='prod-image' type='text' placeholder='Ссылка на картинку (URL)' />
            <br /><br />
            <button onClick={handleAddProduct}>Добавить на сайт</button>

            {message && (
                <p>
                    {message}
                </p>
            )}
        </div>
    );
}

export default Admin;