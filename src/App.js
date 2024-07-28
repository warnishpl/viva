import React, { useState } from 'react';
import { SetGlobalStyle } from './GlobalStyle';
import { Wrapper } from './App.styled';
import AddTutorPopUp from './components/AddTutorPopUp/AddTutorPopUp';
import AddTutorsListButton from './components/AddTutorsListButton/AddTutorsListButton';
import TutorsList from './components/TutorsList/TutorsList';
import AssignEquipment from './components/AssignEquipment/AssignEquipment';
import AssignedEquipmentList from './components/AssignedEquipmentList/AssignedEquipmentList';
import {
	getLocalStorageValue,
	setLocalStorageValue,
} from './utils/functions/localStorageFunctions';
import { LOCALSTORAGE_KEYS } from './utils/constants/localStorageKeys';

function App() {
	const [isAddTutorButtonClicked, setAddTutorButtonClicked] = useState(false);
	const [tutorsList, setTutorsList] = useState(
		getLocalStorageValue(LOCALSTORAGE_KEYS.TUTORS_LIST) || []
	);
	const [selectedTutor, setSelectedTutor] = useState(null);

	const handleToggleButton = () => {
		setAddTutorButtonClicked(!isAddTutorButtonClicked);
	};

	const handleAddTutor = (newTutor) => {
		const updatedTutorsList = [...tutorsList, newTutor];
		setTutorsList(updatedTutorsList);
		setLocalStorageValue(LOCALSTORAGE_KEYS.TUTORS_LIST, updatedTutorsList);
		setAddTutorButtonClicked(false);
	};

	return (
		<>
			<SetGlobalStyle />
			<Wrapper>
				<AddTutorsListButton handleToggleButton={handleToggleButton} />

				<AssignEquipment
					tutorsList={tutorsList}
					setTutorsList={setTutorsList}
					selectedTutor={selectedTutor}
				/>
				<TutorsList
					tutorsList={tutorsList}
					setTutorsList={setTutorsList}
					selectedTutor={selectedTutor}
					setSelectedTutor={setSelectedTutor}
				/>
				<AssignedEquipmentList
					tutorsList={tutorsList}
					selectedTutor={selectedTutor}
					setTutorsList={setTutorsList}
				/>
				{isAddTutorButtonClicked && (
					<AddTutorPopUp
						handleToggleButton={handleToggleButton}
						handleAddTutor={handleAddTutor}
					/>
				)}
			</Wrapper>
		</>
	);
}

export default App;
