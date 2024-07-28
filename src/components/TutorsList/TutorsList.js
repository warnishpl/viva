import React from 'react';
import { isBeforeMidnight } from '../../utils/helpers/isBeforeToday';
import { LOCALSTORAGE_KEYS } from '../../utils/constants/localStorageKeys';
import { setLocalStorageValue } from '../../utils/functions/localStorageFunctions';
import { Container, TutorItem } from './TutorsList.styled';



const TutorsList = ({
	tutorsList,
	setTutorsList,
	selectedTutor,
	setSelectedTutor,
}) => {
	const deleteTutor = (id) => {
		const updatedTutorsList = tutorsList.filter((tutor) => tutor.id !== id);
		setTutorsList(updatedTutorsList);
		setLocalStorageValue(LOCALSTORAGE_KEYS.TUTORS_LIST, updatedTutorsList);
	};

	const handleTutorClick = (id) => {
		if (selectedTutor === id) {
			setSelectedTutor(null);
		} else {
			setSelectedTutor(id);
		}
	};

	return (
		<Container>
			{tutorsList.map((tutor) => (
				<TutorItem
					key={tutor.id}
					$isSelected={tutor.id === selectedTutor}
					$hasEquipment={tutor.equipment.length > 0}
					$hasOldEquipment={tutor.equipment.some((item) =>
						isBeforeMidnight(item.date)
					)}
					onClick={() => handleTutorClick(tutor.id)}
				>
					<span>
						{tutor.name} {tutor.surname}
					</span>
					<button
						onClick={(e) => {
							e.stopPropagation();
							deleteTutor(tutor.id);
						}}
					>
						Usuń
					</button>
				</TutorItem>
			))}
		</Container>
	);
};

export default TutorsList;
