import React, { useState } from 'react';
import { setLocalStorageValue } from '../utils/functions/localStorageFunctions';

const ChangeQuantityButton = ({ item, tutorsList, setTutorsList, selectedTutor }) => {
	const [editQuantity, setEditQuantity] = useState(item.quantity);
	const [isEditing, setIsEditing] = useState(false);

	const handleChangeQuantity = (newQuantity) => {
		if (newQuantity < 0) {
			alert('Ilość nie może być ujemna.');
			return;
		}

		const updatedTutors = tutorsList.map((tutor) => {
			if (tutor.id === selectedTutor) {
				const updatedEquipment = tutor.equipment.map((equip) =>
					equip.id === item.id ? { ...equip, quantity: newQuantity } : equip
				);
				return { ...tutor, equipment: updatedEquipment };
			}
			return tutor;
		});
		setTutorsList(updatedTutors);
		setIsEditing(false);
		setLocalStorageValue('tutorsList', updatedTutors);
	};

	return (
		<div>
			{isEditing ? (
				<>
					<input
						type='number'
						value={editQuantity}
						onChange={(e) => setEditQuantity(parseInt(e.target.value, 10))}
					/>
					<button onClick={() => handleChangeQuantity(editQuantity)}>
						Zapisz
					</button>
					<button onClick={() => setIsEditing(false)}>Anuluj</button>
				</>
			) : (
				<button onClick={() => setIsEditing(true)}>Zmień ilość</button>
			)}
		</div>
	);
};

export default ChangeQuantityButton;
