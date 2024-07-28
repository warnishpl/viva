import React, { useState } from 'react';

import { LOCALSTORAGE_KEYS } from '../../utils/constants/localStorageKeys';
import { setLocalStorageValue } from '../../utils/functions/localStorageFunctions';
import TransferPopUp from '../TransferPopUp/TransferPopUp';
import { Button, Container } from './TransferButton.styled';



const TransferButton = ({ item, tutorsList, setTutorsList, selectedTutor }) => {
	const [showTransferForm, setShowTransferForm] = useState(false);

	const handleTransfer = (quantity, targetTutor) => {
		const parsedTargetTutor = parseInt(targetTutor, 10);
		const sourceTutor = tutorsList.find((tutor) => tutor.id === selectedTutor);
		const destinationTutor = tutorsList.find(
			(tutor) => tutor.id === parsedTargetTutor
		);

		if (!sourceTutor || !destinationTutor || !quantity || quantity <= 0) {
			console.error('Invalid transfer data');
			return;
		}

		const parsedQuantity = parseInt(quantity, 10);
		if (parsedQuantity > item.quantity) {
			console.error('Quantity exceeds available items');
			return;
		}

		const updatedSourceTutor = {
			...sourceTutor,
			equipment: sourceTutor.equipment
				.map((equip) =>
					equip.id === item.id
						? { ...equip, quantity: equip.quantity - parsedQuantity }
						: equip
				)
				.filter((equip) => equip.quantity > 0),
		};

		const updatedDestinationTutor = {
			...destinationTutor,
			equipment: [
				...destinationTutor.equipment,
				{
					...item,
					id: `${item.id}-${Date.now()}`,
					quantity: parsedQuantity,
					date: new Date().toISOString(),
				},
			],
		};

		const updatedTutorsList = tutorsList.map((tutor) =>
			tutor.id === updatedSourceTutor.id
				? updatedSourceTutor
				: tutor.id === updatedDestinationTutor.id
				? updatedDestinationTutor
				: tutor
		);

		setLocalStorageValue(LOCALSTORAGE_KEYS.TUTORS_LIST, updatedTutorsList);
		setTutorsList(updatedTutorsList);
		setShowTransferForm(false);
	};

	return (
		<Container>
			<Button onClick={() => setShowTransferForm(true)}>Przenieś</Button>

			{showTransferForm && (
				<TransferPopUp
					tutorsList={tutorsList}
					selectedTutor={selectedTutor}
					handleTransfer={handleTransfer}
					handleClose={() => setShowTransferForm(false)}
				/>
			)}
		</Container>
	);
};

export default TransferButton;
