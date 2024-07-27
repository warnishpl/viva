import { createGlobalStyle } from 'styled-components';

export const SetGlobalStyle = createGlobalStyle`
/* reset */
*,
*::after,
*::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
*::-webkit-scrollbar-track
{
	background-color: #E3F2FD;
    border-radius: 10px;
}

*::-webkit-scrollbar
{
    border-radius: 10px;
	width: 10px;
	background-color: #F5F5F5;
}

*::-webkit-scrollbar-thumb
{
    border-radius: 10px;
	background-color: #B3E5FC;
}
html,
body {
    height: 100%;
    background-color: #E3F2FD; /* Jasnoniebieski kolor tła */
    font-family: 'Arial', sans-serif;
}
html {
    font-size: 1rem;
    scroll-behavior: smooth;
}
a {
    text-decoration: none;
}
img {
    height: auto;
}
input,
button,
textarea,
select {
    font-family: inherit;
}
button {
	font-size: medium;
    border: none;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
}
textarea {
    resize: vertical;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
/* reset */
`;
