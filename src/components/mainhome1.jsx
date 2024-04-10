import styled, { keyframes } from 'styled-components';

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
        Bem-vindo(a) ao <Span>Lume</Span>,
        </Titulo>
        <Subtitulo>
        Onde cada livro é uma chama acesa, iluminando novas histórias e mundos para você explorar!
        </Subtitulo>
        </ConteinerHome>
       <ConteinerBottom>
        <Button>Explorar</Button>  
        <Img src='https://i.ibb.co/7JwZ7s8/livros-home.png' alt='foto de Livros'/>
        </ConteinerBottom>
        <ConteinerImagem>

    </ConteinerImagem>
        </>
    )
}


export default MainHome1;