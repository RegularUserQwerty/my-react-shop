import React, { useState } from 'react';
import './product.css';

function Product({ id, header, image, price }) {
    const [btnText, setBtnText] = useState('В корзину');

    function addToBasket() {
        const currentBasket = JSON.parse(localStorage.getItem('basket')) || [];
        const productData = { id, header, image, price };       
        currentBasket.push(productData);
        localStorage.setItem('basket', JSON.stringify(currentBasket));       
        setBtnText('Добавлено!  ');
        setTimeout(() => {
            setBtnText('В корзину');
        }, 1000);
    }

    return (
        <div className="Product">
            <img src={image} alt={header} />
            <h1>{header}</h1>
            <p>{ `${price} руб` }</p>           
            <button onClick={addToBasket}>{btnText}</button> 
        </div>
    );
}

export default Product;