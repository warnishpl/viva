import styled from 'styled-components';

export const Container = styled.div`
	padding: 20px;
	background-color: #ffffff;
	border: 1px solid #b3e5fc;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	overflow: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ItemContainer = styled.div`
	margin-bottom: 5px;
	padding: 10px;
	border: 1px solid #b3e5fc;
	border-radius: 5px;
	background-color: #e3f2fd;
`;

export const Input = styled.input`
	padding: 10px;
	border: 1px solid #b3e5fc;
	border-radius: 5px;
	width: 100%;
	margin-bottom: 10px;
`;