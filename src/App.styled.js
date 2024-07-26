import styled from 'styled-components';

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 20px 1fr 10px 2fr 10px 20px;
	grid-template-rows: 20px 100px 3fr 20px;
	grid-column-gap: 10px;
	grid-row-gap: 10px;

	& > button:nth-child(1) {
		//dodaj tutora
		grid-area: 2 / 2 / 3 / 3;
		background-color: red;
	}

	& > div:nth-child(2) {
		//przypisz sprzet
		grid-area: 2 / 4 / 3 / 5;
		background-color: orange;
	}

	& > div:nth-child(3) {
		//tutorslist
		grid-area: 3 / 2 / 4 / 3;
		background-color: yellow;
	}

	& > div:nth-child(4) {
		//eqList
		grid-area: 3 / 4 / 4 / 5;
		background-color: green;
	}
`;
