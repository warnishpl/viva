import React, { useState } from 'react';
import {
	Button,
	FormGroup,
	Header,
	Input,
	PopUpContainer,
} from './QuantityPopUp.styled';

const QuantityPopUp = ({ initialQuantity, handleSave, handleClose }) => {
	const [quantity, setQuantity] = useState(initialQuantity);

	const onSave = () => {
		if (quantity <= 0) {
			alert('Ilość musi być większa niż 0.');
			return;
		}
		handleSave(quantity);
		handleClose();
	};

	return (
		<PopUpContainer>
			<Header>
				<p>Zmień ilość: </p>
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
