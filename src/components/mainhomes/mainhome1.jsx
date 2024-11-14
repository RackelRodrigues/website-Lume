import styled, { keyframes } from 'styled-components';
import {arrow} from '../../../public/images/arrow.svg';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;


const Img = styled.img`
height: 450px;
height: 450px;
margin-left: 35px;
`;


const Titulo = styled.h2`
color: #A3B1A9;
font-weight: 600;
font-family: Raleway;
font-size: 50px;
font-weight: 600;




`;

const Subtitulo = styled.p`
font-family: Raleway;
font-size: 20px;
font-weight: 200;
width: 500px;

color: #A3B1A9;


`;

const Button = styled.button`
background-color: #C084FC;
color: #000;
width: 250px;
height: 50px;
border-radius: 30px;
font-size: 20px;
font-weight: 100;
transition: background-color 0.3s ease; 
cursor: pointer;
  
&:hover {
    background-color: #C022FC; }

`;

const changeColor = keyframes`
  0% { color: #D0A460; }
  20% { color: #ED0952; }
  40%{color:#ED4409; }
  60%{color: #ED6C09;}
  80%{color: #ED6C09; }
  100% { color: #C084FC; }
`;

const Span = styled.span`
  animation: ${changeColor} 10s linear infinite;
`;

const ConteinerHome = styled.div`
display: flex;
align-items: center;
flex-direction: column;


`;

const ConteinerBottom = styled.div`
display: flex;
align-items: center;
justify-content: center;

margin-left: 480px;

`;

const ConteinerImagem = styled.div``;



const MainHome1 =()=>{
    return(
        <>
        <ConteinerHome>
        <Titulo>
        Descubra seu novo brilho literário no<Span>Lume</Span>,
        </Titulo>
        <Subtitulo>
        Em nosso universo literário, cada livro é uma chama acesa, oferecendo luz a novas histórias e mundos para você explorar. Permita-se mergulhar em narrativas envolventes, descobrindo emoções e experiências que só a leitura pode proporcionar.   </Subtitulo>
        </ConteinerHome>
       <ConteinerBottom>
        <StyledLink to='/Login'>
        <Button>Descubra agora</Button>  
        </StyledLink>
        <Img src='https://i.ibb.co/7JwZ7s8/livros-home.png' alt='foto de Livros'/>
        </ConteinerBottom>
        <ConteinerImagem>

    </ConteinerImagem>
        </>
    )
}


export default MainHome1;