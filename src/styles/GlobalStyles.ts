import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #222;
    colour: #fff;
    font-family: 'Arial', sans-serif;
    user-select: none;
  }
  
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
  }
`;

export default GlobalStyles;
