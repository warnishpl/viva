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

const Select = styled.select`
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

const TransferButton = ({ item, tutorsList, setTutorsList, selectedTutor }) => {
    const [quantity, setQuantity] = useState('');
    const [targetTutor, setTargetTutor] = useState('');
    const [showTransferForm, setShowTransferForm] = useState(false);

    const handleTransfer = () => {
        const parsedTargetTutor = parseInt(targetTutor, 10);

        const sourceTutor = tutorsList.find((tutor) => tutor.id === selectedTutor);
        const destinationTutor = tutorsList.find(
            (tutor) => tutor.id === parsedTargetTutor
        );

        if (!sourceTutor) {
            console.error('Source tutor not found');
            return;
        }
        if (!destinationTutor) {
            console.error('Destination tutor not found');
            return;
        }
        if (!quantity || quantity <= 0) {
            console.error('Invalid quantity');
            return;
        }

        const parsedQuantity = parseInt(quantity, 10);
        if (parsedQuantity > item.quantity) {
            console.error('Quantity exceeds available items');
            return;
        }

        const updatedSourceTutor = {
            ...sourceTutor,
            equipment: sourceTutor.equipment
                .map((equip) =>
                    equip.id === item.id
                        ? { ...equip, quantity: equip.quantity - parsedQuantity }
                        : equip
                )
                .filter((equip) => equip.quantity > 0),
        };

        const updatedDestinationTutor = {
            ...destinationTutor,
            equipment: [
                ...destinationTutor.equipment,
                {
                    ...item,
                    id: `${item.id}-${Date.now()}`,
                    quantity: parsedQuantity,
                    date: new Date().toISOString(),
                },
            ],
        };

        const updatedTutorsList = tutorsList.map((tutor) =>
            tutor.id === updatedSourceTutor.id
                ? updatedSourceTutor
                : tutor.id === updatedDestinationTutor.id
                ? updatedDestinationTutor
                : tutor
        );

        setLocalStorageValue(LOCALSTORAGE_KEYS.TUTORS_LIST, updatedTutorsList);
        setTutorsList(updatedTutorsList);
        setShowTransferForm(false);
    };

    return (
        <Container>
            {showTransferForm ? (
                <div>
                    <Input
                        type='number'
                        placeholder='Ilość'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Select
                        value={targetTutor}
                        onChange={(e) => setTargetTutor(e.target.value)}
                    >
                        <option value='' disabled>
                            Wybierz tutora
                        </option>
                        {tutorsList
                            .filter((tutor) => tutor.id !== selectedTutor)
                            .map((tutor) => (
                                <option key={tutor.id} value={tutor.id}>
                                    {tutor.name} {tutor.surname}
                                </option>
                            ))}
                    </Select>
                    <Button onClick={handleTransfer}>Potwierdź</Button>
                    <Button onClick={() => setShowTransferForm(false)}>Anuluj</Button>
                </div>
            ) : (
                <Button onClick={() => setShowTransferForm(true)}>Przenieś</Button>
            )}
        </Container>
    );
};

export default TransferButton;
