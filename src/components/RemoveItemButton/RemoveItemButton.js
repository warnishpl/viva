import { Button, Container } from './RemoveItemButton.styled';

export function RemoveItemButton({ removeItem, selectedTutor, itemId }) {
	return (
		<Container>
			<Button onClick={() => removeItem(selectedTutor, itemId)}>
				Usuń z listy
			</Button>
		</Container>
	);
}
