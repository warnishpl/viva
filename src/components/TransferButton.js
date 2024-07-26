import React, { useState } from 'react';

const TransferButton = ({ item, tutorsList, setTutorsList, selectedTutor }) => {
	const [quantity, setQuantity] = useState('');
	const [targetTutor, setTargetTutor] = useState('');
	const [showTransferForm, setShowTransferForm] = useState(false);

	const handleTransfer = () => {
		const sourceTutor = tutorsList.find((tutor) => tutor.id === selectedTutor);
		const destinationTutor = tutorsList.find(
			(tutor) => tutor.id === targetTutor
		);

		if (!sourceTutor || !destinationTutor || !quantity || quantity <= 0) {
			console.error('Invalid transfer data');
			return;
		}

		const updatedSourceTutor = {
			...sourceTutor,
			equipment: sourceTutor.equipment
				.map((equip) =>
					equip.id === item.id
						? { ...equip, quantity: equip.quantity - quantity }
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
					quantity: parseInt(quantity),
					date: new Date().toISOString(),
				},
			],
		};

		setTutorsList(
			tutorsList.map((tutor) =>
				tutor.id === updatedSourceTutor.id
					? updatedSourceTutor
					: tutor.id === updatedDestinationTutor.id
					? updatedDestinationTutor
					: tutor
			)
		);

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
