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

const AddTutorPopUp = ({ handleToggleButton, handleAddTutor }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const handleSubmit = () => {
        if (!name || !surname) {
            alert('Wypełnij wszystkie pola.');
            return;
        }
        handleAddTutor({ id: Date.now(), name, surname, equipment: [] });
    };

    return (
        <PopUpContainer>
            <Header>
                <button onClick={handleToggleButton}>X</button>
            </Header>
            <FormGroup>
                <Input
                    type='text'
                    placeholder='Imię'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type='text'
                    placeholder='Nazwisko'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <Button onClick={handleSubmit}>Zapisz</Button>
            </FormGroup>
        </PopUpContainer>
    );
};

export default AddTutorPopUp;
