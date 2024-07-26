import React, { useState, useEffect } from 'react';
import { isBeforeMidnight } from '../utils/helpers/isBeforeToday';
import { formatDateTime } from '../utils/helpers/formatDateTime';
import {
	getLocalStorageValue,
	setLocalStorageValue,
} from '../utils/functions/localStorageFunctions';
import TransferButton from './TransferButton';

const AssignedEquipmentList = ({
	tutorsList,
	selectedTutor,
	setSelectedTutor,
	setTutorsList,
}) => {
	const [equipmentList, setEquipmentList] = useState(tutorsList);

	useEffect(() => {
		const storedTutorsList = getLocalStorageValue('tutorsList');
		if (storedTutorsList) {
			setEquipmentList(storedTutorsList);
		}
	}, []);

	useEffect(() => {
		setEquipmentList(tutorsList);
	}, [tutorsList]);

	// Filtrowanie tutorów, którzy mają sprzęt
	const filteredTutors = equipmentList.filter(
		(tutor) => tutor.equipment && tutor.equipment.length > 0
	);

	// Filtrowanie sprzętu do wyświetlenia
	const equipmentToShow = selectedTutor
		? equipmentList.find((tutor) => tutor.id === selectedTutor)?.equipment || []
		: filteredTutors.flatMap((tutor) =>
				tutor.equipment.map((item) => ({
					...item,
					tutorId: tutor.id,
					tutorName: `${tutor.name} ${tutor.surname}`,
				}))
		  );

	// Sortowanie sprzętu po dacie od najnowszych do najstarszych
	equipmentToShow.sort((a, b) => new Date(b.date) - new Date(a.date));

	const removeItem = (tutorId, itemId) => {
		const updatedTutors = equipmentList.map((tutor) => {
			if (tutor.id === tutorId) {
				return {
					...tutor,
					equipment: tutor.equipment.filter((item) => item.id !== itemId),
				};
			}
			return tutor;
		});
		setEquipmentList(updatedTutors);
		setTutorsList(updatedTutors); // Update the tutors list in the parent component
		setLocalStorageValue('tutorsList', updatedTutors);
	};

	return (
		<div>
			{selectedTutor && equipmentToShow.length === 0 ? (
				<p>Tutor nie posiada żadnego sprzętu.</p>
			) : (
				equipmentToShow.map((item, index) => (
					<div key={index}>
						{selectedTutor ? (
							<>
								<p>Nazwa: {item.name}</p>
								<p>Ilość: {item.quantity}</p>
								<p>
									Data wypożyczenia:{' '}
									<span
										style={{
											color: isBeforeMidnight(item.date) ? 'red' : 'black',
										}}
									>
										{formatDateTime(item.date)}
									</span>
								</p>
								<button onClick={() => removeItem(selectedTutor, item.id)}>
									Usuń z listy
								</button>
								<TransferButton
									item={item}
									tutorsList={tutorsList}
									setTutorsList={setTutorsList}
									selectedTutor={selectedTutor}
								/>
							</>
						) : (
							<>
								<p>Tutor: {item.tutorName}</p>
								<p>Nazwa: {item.name}</p>
								<p>Ilość: {item.quantity}</p>
								<p>
									Data wypożyczenia:{' '}
									<span
										style={{
											color: isBeforeMidnight(item.date) ? 'red' : 'black',
										}}
									>
										{formatDateTime(item.date)}
									</span>
								</p>
								<button onClick={() => removeItem(item.tutorId, item.id)}>
									Usuń z listy
								</button>
								<TransferButton
									item={item}
									tutorsList={tutorsList}
									setTutorsList={setTutorsList}
									selectedTutor={item.tutorId}
								/>
							</>
						)}
					</div>
				))
			)}
		</div>
	);
};

export default AssignedEquipmentList;
