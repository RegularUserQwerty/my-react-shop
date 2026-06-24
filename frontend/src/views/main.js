import React, {useState, useEffect} from 'react';
import './main.css';
import Product from '../components/product';

function Main() {

	const [products, setProducts] = useState([])

	useEffect(() => {
		const api = 'http://localhost:9001/products'

		fetch(api)
		.then(result => result.json())
		.then((result) => {
			console.log(result)
			setProducts(result.data)
		})

	}, [])

	return (
		<div className="Main">
			{ products.map((item) => (
				<Product 
					key={item._id} 
					id={item._id}
					header={item.title || item.header} 
					image={item.image} 
					price={item.price}
				/>
			)) }
		</div>
	);
}

export default Main;
