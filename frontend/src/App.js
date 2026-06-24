import React, {useState} from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Main from './views/main';
import Basket from './views/basket';
import Cabinet from './views/Cabinet';
import Userbox from './components/userbox';
import Modalbox from './components/modalbox';
import Login from './components/Login';
import Registration from './components/Registration';
import Admin from './components/Admin';


function App() {
	
  const[page, setPage] = useState('Main')
	const[modalBox, setModalBox] = useState('none')

	const pages = {
		Main: <Main />,
		Basket: <Basket />,
		Cabinet: <Cabinet setPage={setPage} />
	}

	const modalBoxes = {
		none: null,
		Login: <Modalbox setModalBox={setModalBox}><Login setPage={setPage} setModalBox={setModalBox} /></Modalbox>,
		Registration: <Modalbox setModalBox={setModalBox}><Registration /></Modalbox>,
		Admin: <Modalbox setModalBox={setModalBox}><Admin setModalBox={setModalBox} /></Modalbox>
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
