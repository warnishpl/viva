import React, { useState } from 'react';

const AddTutorPopUp = ({ handleToggleButton, handleAddTutor }) => {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');

	const handleSubmit = () => {
		handleAddTutor({ id: Date.now(), name, surname, equipment: [] });
	};

	return (
		<div className='popup'>
			<div>
				<button onClick={handleToggleButton}>X</button>
			</div>
			<div>
				<input
					type='text'
					placeholder='Imię'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Nazwisko'
					value={surname}
					onChange={(e) => setSurname(e.target.value)}
				/>
				<button onClick={handleSubmit}>Zapisz</button>
			</div>
		</div>
	);
};

export default AddTutorPopUp;
