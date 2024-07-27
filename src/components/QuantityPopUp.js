import React, { useState } from 'react';
import styled from 'styled-components';

const PopUpContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #ffffff;
	border: 1px solid #b3e5fc;
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
		background-color: #ff5722;
		color: #ffffff;
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: #e64a19;
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
	border: 1px solid #b3e5fc;
	border-radius: 5px;
`;

const Button = styled.button`
	background-color: #03a9f4;
	color: #ffffff;
	padding: 10px;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #0288d1;
	}
`;

const QuantityPopUp = ({ initialQuantity, handleSave, handleClose }) => {
	const [quantity, setQuantity] = useState(initialQuantity);

	const onSave = () => {
		handleSave(quantity);
		handleClose();
	};

	return (
		<PopUpContainer>
			<Header>
				<Button onClick={handleClose}>X</Button>
			</Header>
			<FormGroup>
				<Input
					type='number'
					value={quantity}
					onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
				/>
				<Button onClick={onSave}>Zapisz</Button>
				<Button onClick={handleClose}>Anuluj</Button>
			</FormGroup>
		</PopUpContainer>
	);
};

export default QuantityPopUp;
