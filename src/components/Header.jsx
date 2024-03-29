import Logo_lume from '../images/logo_lume.png'
import { GoPerson } from "react-icons/go";
import styled from 'styled-components';


const ContainerHeader = styled.div`
 background-color: transparente;
  
  padding: 10px 20px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LogoImg = styled.img`
width: 70px;
height: 70px;
border-radius: 10px;
`;

const Text = styled.h3`
font-family: Raleway;
font-size: 25px;
font-weight: 400;
color: #A3B1A9;

`;



const COntainerLogin = styled.div`
width: 130px;
height: 35px;
background-color: #D9D9D9;
border-radius: 30px ;
color: #1E1E1E;

`;



const Aviso = styled.h1``;

const h2 = styled.h2``;


const button = styled.button``;

const Header = () =>{
return(
<>
<ContainerHeader>
<LogoImg src={Logo_lume} alt="Logo Lume"/>
<Text>Lume</Text>


<Text></Text>
<Text></Text>
<Text></Text>
</ContainerHeader>
</>)
}


export default Header;