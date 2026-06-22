import React from 'react';
import './modalbox.css';

function Modalbox({setModalBox, children}) {
	return (
		<>
			<div className='echo' onClick={() => setModalBox('none')}></div>
			<div className="Modalbox">{children}</div>
		
		</>
	);
}

export default Modalbox;
