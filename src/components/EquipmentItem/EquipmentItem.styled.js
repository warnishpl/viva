import styled from 'styled-components';

export const ButtonsContainer = styled.div`
	margin-top: 10px;
	display: flex;
	gap: 5px;
	justify-content: space-between;
`;
export const ItemContainer = styled.div`
	width: calc(100% - 6px);
	margin: 3px;
	padding: 15px;
	border-radius: 6px;
	background-color: #b3e5fc;
`;
export const DataWrapper = styled.div`
	display: flex;
`;
export const ColumnWrapper = styled.div`
	width: 40%;
	& > :nth-child(2) {
		margin-top: 10px;
	}
`;
