import React, { useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../../utils/constants/localStorageKeys';
import { setLocalStorageValue } from '../../utils/functions/localStorageFunctions';
import { Button, Container, Input } from './AssignEquipment.styled';

const AssignEquipment = ({ tutorsList, selectedTutor, setTutorsList }) => {
	const [equipmentName, setEquipmentName] = useState('');
	const [quantity, setQuantity] = useState('');

	const handleAssignEquipment = () => {
		if (!selectedTutor) {
			alert('Wybierz tutora przed przypisaniem sprzętu.');
			return;
		}

		if (quantity <= 0) {
			alert('Niepoprawna ilość.');
			return;
		}

		const updatedTutorsList = tutorsList.map((tutor) => {
			if (tutor.id === selectedTutor) {
				const existingEquipment = tutor.equipment.find(
					(e) => e.name === equipmentName
				);
				if (existingEquipment) {
					existingEquipment.quantity += parseInt(quantity, 10);
				} else {
					tutor.equipment.push({
						id: new Date().getTime(),
						name: equipmentName,
						quantity: parseInt(quantity, 10),
						date: new Date().toISOString(),
					});
				}
			}
			return tutor;
		});

		setTutorsList(updatedTutorsList);
		setLocalStorageValue(LOCALSTORAGE_KEYS.TUTORS_LIST, updatedTutorsList);
		setEquipmentName('');
		setQuantity('');
	};

	const handleEquipmentNameChange = (e) => {
		const input = e.target.value;
		setEquipmentName(input);

		try {
			const parsed = JSON.parse(input);
			if (parsed.code && parsed.customId) {
				setEquipmentName(`${parsed.code}#${parsed.customId}`);
			}
		} catch (err) {
			// Input is not valid JSON, ignore error
		}
	};

	return (
		<Container>
			<Input
				type='text'
				placeholder='Nazwa sprzętu'
				value={equipmentName}
				onChange={handleEquipmentNameChange}
			/>
			<Input
				type='number'
				placeholder='Ilość'
				value={quantity}
				onChange={(e) => setQuantity(e.target.value)}
			/>
			<Button onClick={handleAssignEquipment}>Przypisz sprzęt</Button>
		</Container>
	);
};

export default AssignEquipment;
