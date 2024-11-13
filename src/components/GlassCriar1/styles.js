import styled from "styled-components";
import { Link } from 'react-router-dom';
import { BsPersonBoundingBox } from "react-icons/bs";

export const Box = styled.div`
width: 100%;
max-width: 550px;
height: 500px;
border-radius: 15px;
background-color: rgba(255, 255, 255, 0.15);
backdrop-filter:blur(8.5px);
`;


export const Titulo = styled.h2`
font-family: Raleway;
font-size: 30px;
font-weight: 300;
color: #fff;
margin: 25px 0 15px 0;

`;


export const Label = styled.p`
color: #fff;
font-family: Raleway;
font-size: 18px;
font-weight: 100;
margin: 2px 0 8px 0;
`;

export const BoxHead = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

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
    outline: 3px solid #C084FC;
  
  }
`;

export const ContainerInput = styled.div`
background-color: #D9D9D9;
width: 400px;
height: 45px;
border-radius: 10px;


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
margin-top: 20px;
`;


export const Button = styled.button`
width: 400px;
height: 45px;
color: #000;
background-color: #D0A460;
border-radius: 30px;
border: 0;
outline: none;
margin-top:  30px;
font-family: Raleway;
font-size: 20px;
font-weight: 100;
cursor: pointer;

&:hover {
 background-color:  #9b7537;
 border: 0;
outline: none;
}
`;



export const ButtonPurple = styled.button`
width: 400px;
height: 45px;
color: #000;
background-color: #C084FC;
border-radius: 30px;
border: 0;
outline: none;
margin-top:  30px;
font-family: Raleway;
font-size: 20px;
font-weight: 100;


&:hover {
 background-color:  #9333ea;
 border: 0;
outline: none;
}
`;

export const BoxLinks = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`;

export const StyledLink = styled(Link)`
  text-decoration: none;
 
`;

export const Span = styled.a`
font-family: Raleway;
font-size: 15px;
font-weight: 50;
color: ${(props) => props.color || "#fff"};
margin-left: 8px;
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

export const StyledIcon = styled(BsPersonBoundingBox)`
  color: #000; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color:  #333; 
  }
`;

export const FotoDiv = styled.label`
width: 200px;
aspect-ratio: 1 / 1;
border-radius: 50%;
background-color: #D9D9D9;
display: flex;
align-items: center;
justify-content: center;
border: 3px solid #000;
cursor: pointer;
&:hover{
    color:  #333;
    border: 3px solid  #333;
}
&:active{
    background-color: #333;
}

`;

export const ImgFoto = styled.img`
max-width: 100%;
object-fit: cover;
border-radius: 50%;
`;

export const InputFoto = styled.input`
display: none;

`;


export const PreviaFoto = styled.div`
  width: 200px;
  height: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Erro = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;



export const Form = styled.form`
   
`;