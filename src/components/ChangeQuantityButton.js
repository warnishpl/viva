import React, { useState } from 'react';
import styled from 'styled-components';
import { setLocalStorageValue } from '../utils/functions/localStorageFunctions';
import QuantityPopUp from './QuantityPopUp';

const Container = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%; 
`;

const Button = styled.button`
    background-color: #03A9F4;
    color: #FFFFFF;
    padding: 10px; 
    border-radius: 5px;
    cursor: pointer;
    flex: 1; 
    box-sizing: border-box; 

    &:hover {
        background-color: #0288D1;
    }
`;

const ChangeQuantityButton = ({ item, tutorsList, setTutorsList, selectedTutor }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleChangeQuantity = (newQuantity) => {
        if (newQuantity < 0) {
            alert('Ilość nie może być ujemna.');
            return;
        }

        const updatedTutors = tutorsList.map((tutor) => {
            if (tutor.id === selectedTutor) {
                const updatedEquipment = tutor.equipment.map((equip) =>
                    equip.id === item.id ? { ...equip, quantity: newQuantity } : equip
                );
                return { ...tutor, equipment: updatedEquipment };
            }
            return tutor;
        });
        setTutorsList(updatedTutors);
        setLocalStorageValue('tutorsList', updatedTutors);
    };

    return (
        <Container>
            <Button onClick={() => setIsEditing(true)}>Zmień ilość</Button>
            {isEditing && (
                <QuantityPopUp
                    initialQuantity={item.quantity}
                    handleSave={handleChangeQuantity}
                    handleClose={() => setIsEditing(false)}
                />
            )}
        </Container>
    );
};

export default ChangeQuantityButton;
