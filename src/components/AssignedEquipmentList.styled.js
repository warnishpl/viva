import styled from 'styled-components';

export const Container = styled.div`
	padding: 20px;
	background-color: #ffffff;
	border: 1px solid #b3e5fc;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	overflow: auto;
`;

export const ItemContainer = styled.div`
	margin-bottom: 5px;
	padding: 10px;
	border: 1px solid #b3e5fc;
	border-radius: 5px;
	background-color: #e3f2fd;


	.button-container {
		display: flex;
		gap: 5px;
	}

	.button-container > * {
		flex: 1;
		margin: 0;
	}

	.button-container button {
		background-color: #ff5722;
		color: #ffffff;
		padding: 10px 0;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		text-align: center;
		box-sizing: border-box;

		&:hover {
			background-color: #e64a19;
		}
	}
`;
