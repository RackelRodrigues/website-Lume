import styled, { keyframes } from 'styled-components';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';


const Conteiner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

`;

const BackgroundImage = styled.div`
background-color: #E3D9BA;
height: 100vh;
width: 659px;
position: relative;
`
    
const Img = styled.img`
background-color: #E3D9BA;
  height: 650px;
  width: 659px;
  border-top-left-radius: 50%; 
  border-top-right-radius: 50%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: absolute; 
  bottom: 0;
  right: 0;
  left: 0;
`;

const BackgroundTexto = styled.div`
background-color: #C084FC;
height: 737,5px;
width: 860px;
display: flex;
align-items: center;
justify-content: center;

`;


const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Titulo = styled.h2`
width: 500px;
height: 82px;
font-family: Raleway;
font-size: 25px;
font-weight: 900;
color: #FFFFFF;
opacity: 0;
animation: ${slideInRight} 2s ease-out;
animation-fill-mode: forwards;

`;

const Subtitulo = styled.p`
color: #ffff;
font-family: Raleway;
font-size: 25px;
font-weight: 200;
width: 640px;
height: 533px;
opacity: 0;
  animation: ${slideInRight} 2s ease-out;
  animation-fill-mode: forwards;
`;


const Boxtext = styled.div`
  opacity: 0;
  animation: ${slideInRight} 2s ease-out;
  animation-fill-mode: forwards;
  
  
`;

const Historypart = styled.section``;

const  MainHome2 =()=>{
  const [ref, inView] = useInView({
    threshold: 0.5, 
    triggerOnce: true, 
  });


    return(
    <>
    <Historypart id='nossa-historia'>
    <Conteiner>
    <BackgroundImage>
    <Img src="https://i.ibb.co/WVGCGkV/walpaper-livros.jpg" alt="livros"/>
    </BackgroundImage>
    <BackgroundTexto ref={ref}>
    {inView && (
    <Boxtext>
  <Titulo>
    Lume: Sua Biblioteca Online de Aventuras Literárias!
    </Titulo>
    <Subtitulo>
    O Lume nasceu da paixão por livros de um grupo de amigos. Eles buscavam mais do que apenas um aplicativo para armazenar seus livros favoritos; queriam uma plataforma que os ajudasse a organizar suas leituras de forma eficiente e envolvente. Assim, surgiu o Lume, um espaço virtual onde os usuários podem não só catalogar seus livros, mas também interagir com eles de maneira única.

No Lume, os usuários podem marcar livros como "quero ler", "lendo" e "abandonado", facilitando o acompanhamento de suas leituras e descobertas literárias. Além disso, o aplicativo oferece recomendações personalizadas com base nos gostos e hábitos de leitura de cada usuário, tornando-se um companheiro perfeito para os amantes da literatura. O Lume trouxe a magia da literatura para o mundo digital, conectando leitores e livros de uma forma nunca vista antes. 
</Subtitulo>
    </Boxtext>
      )}
    </BackgroundTexto>
</Conteiner>
</Historypart>
    </>)
 }

 export default MainHome2;