import React from 'react';
import { isBeforeMidnight } from '../utils/helpers/isBeforeToday';
import { LOCALSTORAGE_KEYS } from '../utils/constants/localStorageKeys';
import { setLocalStorageValue } from '../utils/functions/localStorageFunctions';

const TutorsList = ({ tutorsList, setTutorsList, selectedTutor, setSelectedTutor }) => {
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
        <div>
            {tutorsList.map((tutor) => (
                <div
                    key={tutor.id}
                    style={{
                        backgroundColor: tutor.id === selectedTutor ? 'blue' : tutor.equipment.length > 0 ? 'lightcoral' : 'transparent',
                        color: tutor.equipment.some((e) => isBeforeMidnight(e.date)) ? 'red' : 'black'
                    }}
                    onClick={() => handleTutorClick(tutor.id)}
                >
                    <span>{tutor.name} {tutor.surname}</span>
                    <button onClick={(e) => { e.stopPropagation(); deleteTutor(tutor.id); }}>Usuń</button>
                </div>
            ))}
        </div>
    );
};

export default TutorsList;
