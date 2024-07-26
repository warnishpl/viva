import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(40px, 200px) minmax(150px, 200px) 10px minmax(200px,600px) 10px minmax(40px, 200px);
    grid-template-rows: 20px 150px 10px calc( 100vh - 200px ) 20px;

    & > button:nth-child(1) {
        //addTutor
        grid-area: 2 / 2 / 3 / 3;  
    }

    & > div:nth-child(2) {
        //assignEq
        grid-area: 2 / 4 / 3 / 5;
        background-color: #B3E5FC; 
        padding: 10px;
        border-radius: 5px;
    }

    & > div:nth-child(3) {
        //tutorslist
        grid-area: 4 / 2 / 5 / 4;
        background-color: #E1F5FE; 
        padding: 10px;
        border-radius: 5px;
    }

    & > div:nth-child(4) {
        //eqList
        grid-area: 4 / 4 / 5 / 6;
        background-color: #E3F2FD; 
        padding: 10px;
        border-radius: 5px;
    }
`;
