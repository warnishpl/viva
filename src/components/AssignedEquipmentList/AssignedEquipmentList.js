import React, { useState, useEffect } from 'react';
import {
	getLocalStorageValue,
	setLocalStorageValue,
} from '../../utils/functions/localStorageFunctions';
import EquipmentItem from '../EquipmentItem/EquipmentItem';
import { Container } from './AssignedEquipmentList.styled';

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
					<EquipmentItem
						key={index}
						item={item}
						selectedTutor={selectedTutor}
						tutorsList={tutorsList}
						setTutorsList={setTutorsList}
						removeItem={removeItem}
					/>
				))
			)}
		</Container>
	);
};

export default AssignedEquipmentList;
