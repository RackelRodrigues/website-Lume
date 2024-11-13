import Header from "../../components/header";
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const Background = styled.div`
background-color: #1C1D20;
height: 100vh;



`;
const Button = styled.button`
width: 400px;
height: 70px;
background-color: #ffff;
border-radius: 75px;
color: #000;
font-family: Raleway;
font-size: 20px;
font-weight: 300;
cursor: pointer;

`;

const H1 = styled.h1`
font-family: Raleway;
font-size: 300px;
font-weight: 500;
color: #ffff;
margin-bottom: 20px;
`;

const H3 = styled.h3`

font-family: Raleway;
font-size: 25px;
font-weight: 200;
color: #ffff;
 margin-bottom: 40px;
`;

const Center = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;


`;


const Errorpage = ()=>{
    return(
        <>
        <Background>
        <Header/>
        <Center>
        <H1>404</H1>
        <H3>Pagina não encontrada</H3>
        <StyledLink to='/'>
        <Button>Retornar a pagina inicial</Button>
        </StyledLink>
        </Center>
        </Background>
        </>
    )
}

export default Errorpage;