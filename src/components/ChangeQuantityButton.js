import React, { useState } from 'react';
import styled from 'styled-components';
import { setLocalStorageValue } from '../utils/functions/localStorageFunctions';

const Container = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%; 
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #B3E5FC;
    border-radius: 5px;
    flex: 1; 
    box-sizing: border-box; 
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
    const [editQuantity, setEditQuantity] = useState(item.quantity);
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
        setIsEditing(false);
        setLocalStorageValue('tutorsList', updatedTutors);
    };

    return (
        <Container>
            {isEditing ? (
                <>
                    <Input
                        type='number'
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(parseInt(e.target.value, 10) || 0)} // Handle non-numeric input
                    />
                    <Button onClick={() => handleChangeQuantity(editQuantity)}>
                        Zapisz
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>Anuluj</Button>
                </>
            ) : (
                <Button onClick={() => setIsEditing(true)}>Zmień ilość</Button>
            )}
        </Container>
    );
};

export default ChangeQuantityButton;
