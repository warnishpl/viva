import styled from 'styled-components';
// Styled components
export const Container = styled.div`
	padding: 20px;
	background-color: #ffffff;
	border: 1px solid #b3e5fc;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	overflow: auto;
`;

export const TutorItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;
	padding: 5px 5px 5px 10px;
	border: 1px solid #b3e5fc;
	border-radius: 5px;
	background-color: ${(props) =>
		props.$isSelected
			? '#90CAF9'
			: props.$hasEquipment
			? '#ffc1c1'
			: '#E3F2FD'};
	cursor: pointer;

	span {
		color: ${(props) => (props.$hasOldEquipment ? 'red' : 'black')};
	}

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