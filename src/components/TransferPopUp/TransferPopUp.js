import React, { useState } from 'react';
import { Button, FormGroup, Header, Input, PopUpContainer, Select } from './TransferPopUp.styled';

const TransferPopUp = ({ tutorsList, selectedTutor, selectedTutorStock, handleTransfer, handleClose }) => {
    const [quantity, setQuantity] = useState('');
    const [targetTutor, setTargetTutor] = useState('');

    const onTransfer = () => {
        const quantityNumber = parseInt(quantity, 10);

        if (isNaN(quantityNumber) || quantityNumber <= 0) {
            alert('Proszę podać prawidłową ilość.');
            return;
        }
        if (quantityNumber > selectedTutorStock) {
            alert('Podana ilość przekracza stan magazynowy.');
            return;
        }
        if (!targetTutor) {
            alert('Proszę wybrać wychowawcę z listy.');
            return;
        }
        handleTransfer(quantityNumber, targetTutor);
        handleClose();
    };

    return (
        <PopUpContainer>
            <Header>
                <p>Przenieś: </p>
                <button onClick={handleClose}>X</button>
            </Header>
            <FormGroup>
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
                        Wybierz wychowawcę
                    </option>
                    {tutorsList
                        .filter((tutor) => tutor.id !== selectedTutor)
                        .map((tutor) => (
                            <option key={tutor.id} value={tutor.id}>
                                {tutor.name} {tutor.surname}
                            </option>
                        ))}
                </Select>
                <Button onClick={onTransfer}>Potwierdź</Button>
                <Button onClick={handleClose}>Anuluj</Button>
            </FormGroup>
        </PopUpContainer>
    );
};

export default TransferPopUp;
