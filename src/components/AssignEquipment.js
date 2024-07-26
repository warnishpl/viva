import React, { useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../utils/constants/localStorageKeys';
import { setLocalStorageValue } from '../utils/functions/localStorageFunctions';

const AssignEquipment = ({ tutorsList, selectedTutor, setTutorsList }) => {
    const [equipmentName, setEquipmentName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleAssignEquipment = () => {
        if (!selectedTutor) {
            alert('Wybierz tutora przed przypisaniem sprzętu.');
            return;
        }

        if (quantity <= 0) {
            alert('Niepoprawna ilość.');
            return;
        }

        const updatedTutorsList = tutorsList.map((tutor) => {
            if (tutor.id === selectedTutor) {
                const existingEquipment = tutor.equipment.find(
                    (e) => e.name === equipmentName
                );
                if (existingEquipment) {
                    existingEquipment.quantity += parseInt(quantity, 10);
                } else {
                    tutor.equipment.push({
                        id: new Date().getTime(), // Unique ID for the equipment
                        name: equipmentName,
                        quantity: parseInt(quantity, 10),
                        date: new Date().toISOString(),
                    });
                }
            }
            return tutor;
        });

        setTutorsList(updatedTutorsList);
        setLocalStorageValue(LOCALSTORAGE_KEYS.TUTORS_LIST, updatedTutorsList);
        setEquipmentName('');
        setQuantity('');
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Nazwa sprzętu'
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
            />
            <input
                type='number'
                placeholder='Ilość'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={handleAssignEquipment}>Przypisz sprzęt</button>
        </div>
    );
};

export default AssignEquipment;
