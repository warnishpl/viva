import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	background-color: #03a9f4; 
	color: #ffffff;
	padding: 10px;
	border-radius: 5px;
`;

const AddTutorsListButton = ({ handleToggleButton }) => (
	<Button onClick={handleToggleButton}>Dodaj Tutora</Button>
);

export default AddTutorsListButton;
