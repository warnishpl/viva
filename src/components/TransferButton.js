import React, { useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../utils/constants/localStorageKeys';
import { setLocalStorageValue } from '../utils/functions/localStorageFunctions';

const TransferButton = ({ item, tutorsList, setTutorsList, selectedTutor }) => {
	const [quantity, setQuantity] = useState('');
	const [targetTutor, setTargetTutor] = useState('');
	const [showTransferForm, setShowTransferForm] = useState(false);

	const handleTransfer = () => {
		const parsedTargetTutor = parseInt(targetTutor, 10);

		const sourceTutor = tutorsList.find((tutor) => tutor.id === selectedTutor);
		const destinationTutor = tutorsList.find(
			(tutor) => tutor.id === parsedTargetTutor
		);

		if (!sourceTutor) {
			console.error('Source tutor not found');
			return;
		}
		if (!destinationTutor) {
			console.error('Destination tutor not found');
			return;
		}
		if (!quantity || quantity <= 0) {
			console.error('Invalid quantity');
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

		// Update localStorage
		setLocalStorageValue(LOCALSTORAGE_KEYS.TUTORS_LIST, updatedTutorsList);

		// Update state
		setTutorsList(updatedTutorsList);
		setShowTransferForm(false);
	};

	return (
		<div>
			{showTransferForm ? (
				<div>
					<input
						type='number'
						placeholder='Ilość'
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<select
						value={targetTutor}
						onChange={(e) => setTargetTutor(e.target.value)}
					>
						<option value='' disabled>
							Wybierz tutora
						</option>
						{tutorsList
							.filter((tutor) => tutor.id !== selectedTutor)
							.map((tutor) => (
								<option key={tutor.id} value={tutor.id}>
									{tutor.name} {tutor.surname}
								</option>
							))}
					</select>
					<button onClick={handleTransfer}>Potwierdź</button>
					<button onClick={() => setShowTransferForm(false)}>Anuluj</button>
				</div>
			) : (
				<button onClick={() => setShowTransferForm(true)}>Przenieś</button>
			)}
		</div>
	);
};

export default TransferButton;
