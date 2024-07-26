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
	background-color: #84CEFF;
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


.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 20px;
		border: 1px solid #ccc;
		box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
		z-index: 1000;
	}
`;
