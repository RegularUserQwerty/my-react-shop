import React, {useState} from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Main from './views/main';
import Basket from './views/basket';
import Userbox from './components/userbox';
import Modalbox from './components/modalbox';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
	
  const[page, setPage] = useState('Main')
	const[modalBox, setModalBox] = useState('none')

	const pages = {
		Main: <Main />,
		Basket: <Basket />
	}

	const modalBoxes = {
		none: null,
		Login: <Modalbox setModalBox={setModalBox}><Login /></Modalbox>,
		Registration: <Modalbox setModalBox={setModalBox}><Registration /></Modalbox>
	}

	return (
		<div className="App">
			<Header setPage={ setPage } setModalBox={setModalBox}/>
			{ pages[page] }
			{ modalBoxes[modalBox] }
			<Footer />
		</div>
	);
}

export default App;
