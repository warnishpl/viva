import React, { useState } from 'react';
import styled from 'styled-components';

const PopUpContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    border: 1px solid #B3E5FC;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    button {
        background-color: #FF5722;
        color: #FFFFFF;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #E64A19;
        }
    }
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
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

const TransferPopUp = ({ item, tutorsList, selectedTutor, handleTransfer, handleClose }) => {
    const [quantity, setQuantity] = useState('');
    const [targetTutor, setTargetTutor] = useState('');

    const onTransfer = () => {
        handleTransfer(quantity, targetTutor);
        handleClose();
    };

    return (
        <PopUpContainer>
            <Header>
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
                <Button onClick={onTransfer}>Potwierdź</Button>
                <Button onClick={handleClose}>Anuluj</Button>
            </FormGroup>
        </PopUpContainer>
    );
};

export default TransferPopUp;
