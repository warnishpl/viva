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
html,
body {
    height: 100%;
    background-color: #E3F2FD; /* Jasnoniebieski kolor tła */
    font-family: 'Arial', sans-serif;
}
html {
    font-size: 62.5%;
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
	font-size: smaller;
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
