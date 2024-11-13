import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Box = styled.div`
width: 100%;
max-width: 650px;
height: 650px;
border-radius: 15px;
background-color: rgba(255, 255, 255, 0.15);
backdrop-filter:blur(8.5px);
`;

export const Titulo = styled.h2`
font-family: Raleway;
font-size: 30px;
font-weight: 300;
color: #fff;
margin: 40px 0 40px 0;

`;


export const BoxHead = styled.div`
display: flex;
align-items: center;
justify-content: center;
;
`;

export const Label = styled.p`
color: #fff;
font-family: Raleway;
font-size: 18px;
font-weight: 100;
margin: 2px 0 8px 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
 
`;


export const DivEmail = styled.div`
margin-top: 20px;
width: 400px;
height: 50px;
margin-bottom: 20px;
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0; 
`;


export const Input = styled.input`
background-color:transparent;
padding-left: 12px;
width: 100%;
height: 100%;
border: 0;
outline: none;

border-radius: 10px;
&:focus {
    border: 0; 
    outline: none;
  
  }
`;

export const ContainerInput = styled.div`
background-color: #D9D9D9;
width: 400px;
height: 45px;
border-radius: 10px;
display: flex;
align-items: center;


`;

export const Boxinputs = styled.div`
display: flex;
flex-direction: column ;
margin-top: 15px;
`;


export const BoxCenter = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 20px 0 30px 0;
`;

export const Button = styled.button`
width: 400px;
height: 45px;
color: #000;
background-color: #D0A460;
border-radius: 30px;
border: 0;
outline: none;
margin-top:  5px;
font-family: Raleway;
font-size: 20px;
font-weight: 100;


&:hover {
 background-color:  #9b7537;
 border: 0;
outline: none;
}
`;





export const BoxFinal = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin: 20px 0 20px 0;
`;

export const Erro = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;





export const ToggleButton = styled.button`
  margin-right: 15px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Text = styled.p`
font-family: Raleway;
font-size: 15px;
font-weight: 50;
color: ${(props) => props.color || "#fff"};
display: flex;
margin-top:  30px;
`;

export const Span = styled.a`
font-family: Raleway;
font-size: 15px;
font-weight: 50;
color: ${(props) => props.color || "#fff"};
margin-left: 8px;
cursor: pointer;

`;

export const Form = styled.form`
   
`;
