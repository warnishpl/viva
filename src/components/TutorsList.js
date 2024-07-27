import React from 'react';
import styled from 'styled-components';
import { isBeforeMidnight } from '../utils/helpers/isBeforeToday';
import { LOCALSTORAGE_KEYS } from '../utils/constants/localStorageKeys';
import { setLocalStorageValue } from '../utils/functions/localStorageFunctions';

// Styled components
const Container = styled.div`
	padding: 20px;
	background-color: #ffffff;
	border: 1px solid #b3e5fc; 
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	overflow: auto;
`;

const TutorItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;
	padding: 5px 5px 5px 10px;
	border: 1px solid #b3e5fc; 
	border-radius: 5px;
	background-color: ${
		(props) =>
			props.$isSelected
				? '#90CAF9' 
				: props.$hasEquipment
				? '#ffc1c1' 
				: '#E3F2FD' 
	};
	cursor: pointer;

	span {
		color: ${(props) =>
			props.$hasOldEquipment
				? 'red'
				: 'black'};
	}

	button {
		background-color: #ff5722;
		color: #ffffff;
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: #e64a19; 
		}
	}
`;

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
