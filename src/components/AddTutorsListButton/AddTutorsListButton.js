import React from 'react';
import { Button } from '../AddTutorPopUp/AddTutorPopUp.styled';
import { Logo, LogoContainer, Wrapper } from './AddTutorsListButton.styled';
import logo from '../../assets/logo.png';

const AddTutorsListButton = ({ handleToggleButton }) => (
	<Wrapper>
		<LogoContainer>
			<Logo src={logo} alt='Logo' />
		</LogoContainer>
		<Button onClick={handleToggleButton}>Dodaj Tutora</Button>
	</Wrapper>
);

export default AddTutorsListButton;
