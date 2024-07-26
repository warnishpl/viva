import React, { useState, useEffect } from 'react';
import { isBeforeMidnight } from '../utils/helpers/isBeforeToday';
import { formatDateTime } from '../utils/helpers/formatDateTime';
import {
	getLocalStorageValue,
	setLocalStorageValue,
} from '../utils/functions/localStorageFunctions';
import ChangeQuantityButton from './ChangeQuantityButton';
import TransferButton from './TransferButton';
import { Container, ItemContainer } from './AssignedEquipmentList.styled';

const AssignedEquipmentList = ({
	tutorsList,
	selectedTutor,
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

	const filteredTutors = equipmentList.filter(
		(tutor) => tutor.equipment && tutor.equipment.length > 0
	);

	const equipmentToShow = selectedTutor
		? equipmentList.find((tutor) => tutor.id === selectedTutor)?.equipment || []
		: filteredTutors.flatMap((tutor) =>
				tutor.equipment.map((item) => ({
					...item,
					tutorId: tutor.id,
					tutorName: `${tutor.name} ${tutor.surname}`,
				}))
		  );

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
		setTutorsList(updatedTutors);
		setLocalStorageValue('tutorsList', updatedTutors);
	};

	return (
		<Container>
			{selectedTutor && equipmentToShow.length === 0 ? (
				<p>Tutor nie posiada żadnego sprzętu.</p>
			) : (
				equipmentToShow.map((item, index) => (
					<ItemContainer key={index}>
						{selectedTutor ? (
							<>
								<span>Nazwa: {item.name}</span>
								<span>Ilość: {item.quantity}</span>
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
								<div className='button-container'>
									<ChangeQuantityButton
										item={item}
										tutorsList={tutorsList}
										setTutorsList={setTutorsList}
										selectedTutor={selectedTutor}
									/>
									<button onClick={() => removeItem(selectedTutor, item.id)}>
										Usuń z listy
									</button>
									<TransferButton
										item={item}
										tutorsList={tutorsList}
										setTutorsList={setTutorsList}
										selectedTutor={selectedTutor}
									/>
								</div>
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
								<div className='button-container'>
									<ChangeQuantityButton
										item={item}
										tutorsList={tutorsList}
										setTutorsList={setTutorsList}
										selectedTutor={item.tutorId}
									/>
									<button onClick={() => removeItem(item.tutorId, item.id)}>
										Usuń z listy
									</button>
									<TransferButton
										item={item}
										tutorsList={tutorsList}
										setTutorsList={setTutorsList}
										selectedTutor={item.tutorId}
									/>
								</div>
							</>
						)}
					</ItemContainer>
				))
			)}
		</Container>
	);
};

export default AssignedEquipmentList;
