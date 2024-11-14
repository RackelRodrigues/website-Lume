
import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
   
  }

  body {
    font-family: Arial, sans-serif;
  }
`;

export const Background = styled.div`
background-color: #fff;
height: 100vh;

`;


export const Background2 = styled.div`

background-color: #fff;

display: flex;

flex-direction: column;
justify-content: center;
`;


export const Background3 = styled.div`
background-color: #f0f0f0;

`;


export const ContentWrapper = styled.div`
  padding-top: 150px; 
`;