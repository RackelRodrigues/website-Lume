import styled, { keyframes } from "styled-components";
import arrow from "../../../public/images/Vector.svg";
import image from "../../../public/images/Bibliophile-pana.svg";
import Iarrows from "../../../public/images/lrows.svg";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between; /* Adiciona espaço entre os elementos */
  width: 100%;
  max-width: 100%; /* Evita que o container ultrapasse a largura da tela */
  overflow-x: hidden;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const Div = styled.span`
  position: absolute;
  width: 700px; // Ajuste conforme necessário
  height: 700px; // Ajuste conforme necessário
  background-color: #c084fc; // Cor roxa suave
  border-radius: 50%;
  filter: blur(100px);
  z-index: -1;
  top: -70%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 800px;
  position: relative;
  top: -30px;
  left: 80px;
  z-index: 1;
`;

const Imgsvg = styled.img`
  position: relative;
  top: -30px; /* Ajusta a altura para ficar um pouco acima do título */
  right: -35rem;
  height: 50px;
  width: 50px;
  margin-left: 35px;
`;

const DoubleLine = styled.div`
  position: relative;
  width: 25%; /* Largura da linha */
  height: 3px; /* Espessura da linha principal */
  background-color: #c084fc;
  border-radius: 40px; /* Cor da linha principal */
  margin: 10px 0;

  /* Primeira linha (before) */
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #c084fc;
    border-radius: 10px;
    top: -6px; /* Ajusta a posição vertical da primeira linha */
  }
`;
const LineContainer = styled.div`
  position: absolute;
  bottom: 0; /* Coloca a linha na parte inferior da tela */
  left: 50%; /* Centraliza a linha horizontalmente */
  transform: translateX(-50%); /* Ajusta a linha para ficar exatamente centralizada */
  width: 100%; /* Faz a linha ocupar toda a largura da tela */
  display: flex;
  justify-content: center; /* Centraliza a linha horizontalmente */
  align-items: center; 
`;

const Line = styled.span`
  position: relative;
  width: 40%; 
  height: 3px; 
  background-color: #c084fc;
  border-radius: 40px;
  margin: 10px 0;

`;

const Titulo = styled.h2`
  color: #222;
  font-weight: 600;
  font-family: Raleway;
  font-size: 30px;
  font-weight: 400;
  padding-right: 100px;
`;

const Subtitulo = styled.p`
  font-family: Raleway;
  font-size: 25px;
  font-weight: 300;
  max-width: 600px;
  width: 100%;
  color: #222;
  margin-left: 20px;
`;

const Button = styled.button`
  background-color: #c084fc;
  color: #fff;
  width: 200px;
  border: 0;
  height: 50px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 300;
  margin-top: 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #c022fc;
  }
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
  font-size: 40px;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  animation: ${changeColor} 10s linear infinite;
`;

const ConteinerHome = styled.div`
  position: relative; /* Serve como referência para posicionar o botão */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 50%;
  left: 30px;
`;

const ConteinerTitulo = styled.div`
  display: flex;
  align-items: center;
`;

const ConteinerBottom = styled.div`
  position: relative;
  width: 50%;
`;

const MainHome1 = () => {
  return (
    <>
      <MainContainer>
        <ConteinerHome>
          <ConteinerTitulo>
            <Imgsvg src={arrow} alt="foto de uma seta" />
            <Titulo>Descubra seu novo brilho literário no</Titulo>
          </ConteinerTitulo>
          <Span>Lume</Span>
          <Subtitulo>
            Em nosso universo literário, cada livro é uma chama acesa,
            oferecendo luz a novas histórias e mundos para você explorar.
            Permita-se mergulhar em narrativas envolventes, descobrindo emoções
            e experiências que só a leitura pode proporcionar.{" "}
          </Subtitulo>
          <StyledLink to="/Login">
            <Button>Descubra agora</Button>
          </StyledLink>
        </ConteinerHome>

        <ConteinerBottom>
          <Img src={image} alt="Rapaz lendo estante" />
        </ConteinerBottom>

      </MainContainer>
      <LineContainer>
        <Line />
      </LineContainer>
    </>
  );
};

export default MainHome1;
