import React, { useState } from 'react';
import styled from 'styled-components';
import { LOCALSTORAGE_KEYS } from '../utils/constants/localStorageKeys';
import { setLocalStorageValue } from '../utils/functions/localStorageFunctions';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #B3E5FC;
    border-radius: 5px;
`;

const Button = styled.button`
    background-color: #03A9F4;
    color: #FFFFFF;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0288D1;
    }
`;

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
                        id: new Date().getTime(), 
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
        <Container>
            <Input
                type='text'
                placeholder='Nazwa sprzętu'
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
            />
            <Input
                type='number'
                placeholder='Ilość'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <Button onClick={handleAssignEquipment}>Przypisz sprzęt</Button>
        </Container>
    );
};

export default AssignEquipment;
