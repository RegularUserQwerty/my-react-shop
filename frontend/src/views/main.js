import React from 'react';
import './main.css';
import Product from '../components/product';
import image from '../images/product.jpg'

function Main() {

	const products = [
		{
			id: 1, header: 'Товар 1', image: image, price: 120
		},
		{
			id: 2, header: 'Товар 2', image: image, price: 3765
		},
		{
			id: 3, header: 'Товар 3', image: image, price: 860
		},
		{
			id: 4, header: 'Товар 4', image: image, price: 25430
		},
		{
			id: 5, header: 'Товар 5', image: image, price: 35
		},
		{
			id: 6, header: 'Товар 6', image: image, price: 780
		}		
	]

	function getProductList() {
		return products.map((item) => <Product key={item.id} header={item.header} image={item.image} price={item.price}/>)
	}

	return (
		<div className="Main">
			{ getProductList() }
		</div>
	);
}

export default Main;
