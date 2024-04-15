import styled from'styled-components';
import { FaArrowRight } from "react-icons/fa6";

const Background = styled.div`
background-color: #1C1D20;


`;

const LogoImg = styled.img`
width: 50px;
height: 50px;
border-radius: 10px;
`;

const Box = styled.div`
width: 100%;
height: 400px;
background-color:#D9D9D9;
border-top-left-radius: 40px; 
  border-top-right-radius: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;


`;

const TextLogo = styled.h3`
font-family: Raleway;
font-size: 20px;
font-weight: 500;
color: #000;
margin-left: 10px;

`;

const ConteinerLogo = styled.div`
display: flex;
align-items: center;
margin-bottom: 30px;
`;


const Input = styled.input`
background-color:transparent;
padding-left: 12px;
width: 100%;
height: 100%;
border: 0;
outline: none;
font-family: Raleway;
font-size: 15px;
font-weight: 200;


`;

const Conteiner = styled.div`
width: 390px;
height: 40px;
background-color: #fff;
border-radius: 18px;
display: flex;
align-items: center;
justify-content: flex-end;
`;

const Button = styled.button`
width: 30px;
height: 30px;
border-radius: 50%;
color: #000;
background-color: #C084FC;
border: none;
display: flex;
align-items: center;
justify-content: center;
margin-right: 5px;
margin-left: 10px;
cursor: pointer;
`;

const Linha = styled.div`
  border-bottom: 1px solid #4b5563; 
  margin: 10px 0; 
  width: 1430px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Titulos = styled.h2`
font-family: Raleway;
font-size: 18px;
font-weight: 600;
cursor: pointer;
color: #000;

`;

const BoxNames = styled.div`
display: block;
margin-right: 30px;
`;

const BoxAllnames=styled.div`
display: flex;
flex-direction: row;
grid-column: 2; 
justify-self: end;
margin-right: 20px;
`;

const Subnames = styled.p`
font-family: Raleway;
font-size: 14px;
font-weight: 300;
color: #000;
margin-top: 20px;
cursor: pointer;

`;

const Text = styled.p`
font-family: Raleway;
font-size: 18px;
font-weight: 300;
font-family: Raleway;
width: 320px;
margin-bottom: 40px;

`;

const Purple = styled.span`
color: #C084FC;
font-family: Raleway;
font-size: 18px;
font-weight: 300;

`;

const Nameline = styled.p`
font-family: Inter;
font-size: 15px;
font-weight: 100;
color: #4b5563;
line-height: 18px;


`;

const Conteinernames = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 1400px;

`;

const Boxline = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

`;

const Conteinergrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
padding-top: 30px;
margin: 0 0 60px 25px;
`;

const Conteinerleft= styled.div`
grid-column: 1;

`;

const Footer = ()=>{
    return(
    <>
    <Background>
       
    <Box>
        <Conteinergrid>
         <Conteinerleft>
        <ConteinerLogo>
        <LogoImg src='https://i.ibb.co/23CypmW/logo-lume-para-7d58bfb5-3159-4e27-bba5-c88fc931f16e.png' alt='logo lume'/>
         <TextLogo>Lume</TextLogo>
        </ConteinerLogo>

        <Text>Explore novos mundos com <Purple>Lume</Purple>: 
            Sua jornada literária começa aqui.</Text>
        <Conteiner>
            <Input placeholder='Insira seu email'/>
            <Button>
                <FaArrowRight size={15} color='#000'/>
            </Button>
        </Conteiner>
        </Conteinerleft>
        <BoxAllnames>
        <BoxNames>
        <Titulos>Explorar</Titulos>
        <Subnames>Inicio</Subnames>
        <Subnames>Livros</Subnames>
        <Subnames>Planos</Subnames>
        <Subnames>Blog</Subnames>
        </BoxNames>
        <BoxNames>
        <Titulos>Documentação</Titulos>
        <Subnames>Central de Ajuda</Subnames>
        <Subnames>Contato</Subnames>
        <Subnames>FAQ</Subnames>
        <Subnames>POlítica de Privacidade</Subnames>
        </BoxNames>
        <BoxNames>
        <Titulos>Social</Titulos>
        <Subnames>Facebook</Subnames>
        <Subnames>Instagram</Subnames>
        <Subnames>Youtube</Subnames>
        <Subnames>Twitter</Subnames>
        </BoxNames>
        </BoxAllnames>
        </Conteinergrid>
<Boxline>
        <Linha/>
        <Conteinernames>
        <Nameline>
            © Lume. All right Reserved 2024
        </Nameline>
        <Nameline>
        Terms & Conditions
        </Nameline>
        </Conteinernames>
        </Boxline>
    </Box>

    
    </Background>
    </>
    )
}

export default Footer;