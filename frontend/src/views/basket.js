import React, { useState, useEffect } from 'react';
import Product from '../components/product';
import './basket.css';

function Basket() {
    const [basketItems, setBasketItems] = useState([]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvc, setCardCVC] = useState('');

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('basket')) || [];
        setBasketItems(items);
    }, []);

    function removeItem(indexToRemove) {
        const updatedBasket = basketItems.filter((_, index) => index !== indexToRemove);
        setBasketItems(updatedBasket);
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
    }

    function clearBasket() {
        setBasketItems([]);
        localStorage.removeItem('basket');
    }

    function handleOrderSubmit(e) {
        e.preventDefault(); // запрещаем перезагрузку страницы
        //валидация
        if (!address || !cardNumber || !cardExpiry || !cardCvc) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        alert(`🎉 Заказ успешно оформлен!\nДоставка по адресу: ${address}\nСпасибо за покупку!`);
        
        // Чистим корзину и закрываем окно
        clearBasket();
        setIsModalOpen(false);
    }

    const totalPrice = basketItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

    if (basketItems.length === 0) {
        return (
            <div className="basket-empty">
                <h2>Ваша корзина пуста 🛒</h2>
                <p>Добавьте что-нибудь с главной страницы сайта.</p>
            </div>
        );
    }

    return (
        <div className="basket-container">
            <h2 className="basket-title">🛒 Корзина покупок</h2>
            
            <div className="basket-products-container">
                {basketItems.map((item, index) => (
                    <div key={index} className="basket-card-wrapper">
                        <Product 
                            id={item.id}
                            header={item.header}
                            image={item.image}
                            price={item.price}
                        />
                        <button onClick={() => removeItem(index)} className="basket-delete-btn">
                            Удалить из корзины
                        </button>
                    </div>
                ))}
            </div>

            <div className="basket-footer">
                <h3 className="basket-total">Итого: <span className="basket-total-price">{totalPrice} руб.</span></h3>
                <div>
                    <button onClick={clearBasket} className="basket-clear-btn">
                        Очистить всё
                    </button>
            
                    <button onClick={() => setIsModalOpen(true)} className="basket-order-btn">
                        Оформить заказ
                    </button>
                </div>
            </div>

    
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Оформление заказа</h3>
                        
                        <form onSubmit={handleOrderSubmit} className="order-form">
                            <label>
                                Адрес доставки:
                                <input 
                                    type="text" 
                                    placeholder="Город, улица, дом, квартира" 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                />
                            </label>

                            <label>
                                Номер карты:
                                <input 
                                    type="text" 
                                    placeholder="0000 0000 0000 0000" 
                                    maxLength="16"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                            </label>

                            <div className="card-extra-fields">
                                <label>
                                    Срок действия:
                                    <input 
                                        type="text" 
                                        placeholder="ММ/ГГ" 
                                        maxLength="5"
                                        value={cardExpiry}
                                        onChange={(e) => setCardExpiry(e.target.value)}
                                    />
                                </label>

                                <label>
                                    CVC код:
                                    <input 
                                        type="password" 
                                        placeholder="123" 
                                        maxLength="3"
                                        value={cardCvc}
                                        onChange={(e) => setCardCVC(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-order-btn">
                                    Отмена
                                </button>
                                <button type="submit" className="submit-order-btn">
                                    Оплатить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Basket;