import styled from "styled-components";

export const Container = styled.div`
position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
width: 600px;
height: 200px;
border-radius: 15px;
background-color: rgba(255, 255, 255, 0.15);
backdrop-filter:blur(8.5px);
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
z-index: 1; 

`;

export const H1= styled.h1`
font-family: Raleway;
font-size: 28px;
color: #000;


`;


