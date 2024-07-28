import React, { useState } from 'react';
import { setLocalStorageValue } from '../../utils/functions/localStorageFunctions';
import QuantityPopUp from '../QuantityPopUp/QuantityPopUp';
import { Button, Container } from './ChangeQuantityButton.styled';


const ChangeQuantityButton = ({
	item,
	tutorsList,
	setTutorsList,
	selectedTutor,
}) => {
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
		setLocalStorageValue('tutorsList', updatedTutors);
	};

	return (
		<Container>
			
			<Button onClick={() => setIsEditing(true)}>Zmień ilość</Button>
			{isEditing && (
				<QuantityPopUp
					initialQuantity={item.quantity}
					handleSave={handleChangeQuantity}
					handleClose={() => setIsEditing(false)}
				/>
			)}
		</Container>
	);
};

export default ChangeQuantityButton;
