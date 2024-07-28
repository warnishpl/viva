import styled from "styled-components";

export const PopUpContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF; 
    border: 1px solid #B3E5FC;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 10px;
`;


export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #B3E5FC; 
    border-radius: 5px;
`;

export const Button = styled.button`
`;