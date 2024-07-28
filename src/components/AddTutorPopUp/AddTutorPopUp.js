import React, { useState } from 'react';
import {
	Button,
	FormWrapper,
	Header,
	Input,
	PopUpContainer,
} from './AddTutorPopUp.styled';

const AddTutorPopUp = ({ handleToggleButton, handleAddTutor }) => {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');

	const handleSubmit = () => {
		if (!name || !surname) {
			alert('Wypełnij wszystkie pola.');
			return;
		}
		handleAddTutor({ id: Date.now(), name, surname, equipment: [] });
	};

	return (
		<PopUpContainer>
			<Header>
				<p>Dodaj wychowawce:</p>
				<button onClick={handleToggleButton}>X</button>
			</Header>
			<FormWrapper>
				<Input
					type='text'
					placeholder='Imię'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					type='text'
					placeholder='Nazwisko'
					value={surname}
					onChange={(e) => setSurname(e.target.value)}
				/>
				<Button onClick={handleSubmit}>Zapisz</Button>
			</FormWrapper>
		</PopUpContainer>
	);
};

export default AddTutorPopUp;
