import styled, { keyframes } from "styled-components";
import Homideitado from "../../../public/images/Homideitado.svg";

const Conteiner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  margin-bottom: 50px;
`;



const Img = styled.img`
  height: 650px;
  width: 650px;
`;
const StyledHr = styled.hr`
 position: relative;
  width: 2px; 
  height: 80%; 
  margin: 20px auto; 
  background-color: transparent;
  border: none; 
  display: block; 

  &:before {
    content: '';
    position: absolute;
    width: 2px; 
    height: 100%; 
    background-color: #c084fc; 
    border-radius: 5px; 
  }
`;

const Titulo = styled.h2`
  font-family: Raleway;
  font-size: 25px;
  font-weight: bold;
  color: #000;
position: relative;
margin-bottom: 20px;
  &::before {
    content: '';
    position: absolute;
    width: 40%; 
    height: 3px; 
    background-color: #c084fc;
    bottom: -20px;
    ${(props) => (props.positionType === 'left' ? 'left: -2px;' : 'right: 3px;')} 
 border-radius: 10px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 80%; 
    height: 3px; 
    background-color: #c084fc;
    bottom: -10px;
    ${(props) => (props.positionType === 'left' ? 'left: -2px;' : 'right: 3px;')} 
    border-radius: 10px;
    
  }

`; 

const Subtitulo = styled.p`
  color: #000;
  font-family: Raleway;
  font-size: 20px;
  font-weight: 200;
  width: 100%;
  max-width: 200px;
  margin-top: 15px;
`;

const Boxtext = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
`;

const Historypart = styled.div`

`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px; 
`;

const Button = styled.button`
  background-color: #d0a460; 
  color: #fff;
  width: 200px;
  height: 50px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 300;
  border: 0;
  transition: background-color 0.3s ease; 
  margin-bottom: 40px;
  &:hover {
    background-color:  #c0873f; 

  }
`;


const MainHome2 = () => {
  return (
    <>
      <Conteiner>
        <Historypart>
          
          <StyledHr />
          <Boxtext>
            <Titulo>Modelos Exclusivos</Titulo>
            <Subtitulo>
              Utilize algoritmos para recomendar livros com base nas
              preferências de leitura de cada usuário, aumentando as chances de
              descoberta de novos títulos interessantes.
            </Subtitulo>
          </Boxtext>
          

          <StyledHr />
          <Boxtext>
            <Titulo>Grupos de Leitura</Titulo>
            <Subtitulo>
              Crie espaços para grupos de leitura online, onde os usuários
              possam discutir livros em conjunto, compartilhar insights e
              participar de eventos relacionados à leitura.
            </Subtitulo>{" "}
          </Boxtext>
        </Historypart>

        <Img src={Homideitado} alt="pessoas lendo " />
        <Historypart>
          <StyledHr />
          <Boxtext>
            <Titulo >Favorito</Titulo>
            <Subtitulo>
              Permita que os usuários marquem seus livros favoritos, facilitando
              o acesso a eles posteriormente e mostrando quais são os livros
              mais apreciados pela comunidade.
            </Subtitulo>
          </Boxtext>
          <StyledHr />
          <Boxtext>
            <Titulo >Desafios de Leitura</Titulo>
            <Subtitulo>
              Promova desafios de leitura periódicos, incentivando os usuários a
              explorar diferentes gêneros e aumentar seu número de leituras ao
              longo do tempo.
            </Subtitulo>
          </Boxtext>
        </Historypart>
      </Conteiner>
      <ButtonContainer>
      <Button>Junte-se a nos</Button></ButtonContainer>
    </>
  );
};

export default MainHome2;
