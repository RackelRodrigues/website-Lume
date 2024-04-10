import Logo_lume from '../images/logo_lume.png'
import { GoPerson } from "react-icons/go";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContainerHeader = styled.div`
 background-color: transparente;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;

`;

const LogoImg = styled.img`
width: 50px;
height: 50px;
border-radius: 10px;
`;

const Text = styled.h3`
font-family: Raleway;
font-size: 20px;
font-weight: 200;
color: #A3B1A9;
position: relative; 
display: inline-block;
 margin-left: 25px;
 &:hover {
    color: #d0a460;
    cursor: pointer;

  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: #d0a460;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  
  &:hover:after {
    transform: scaleX(1);
  }
`;

const TextLogo = styled.h3`
font-family: Raleway;
font-size: 20px;
font-weight: 500;
color: #A3B1A9;
margin-left: 5px;

`;



const ContainerLogin = styled.div`
width: 130px;
height: 35px;
background-color: #D9D9D9;
border-radius: 30px ;
color: rgb(30, 30, 30);

`;





const Button = styled.button`
height: 40px;
width: 110px;
border-radius: 20px;
margin-left: 15px;
display: flex;
align-items: center;
background-color: #D9D9D9;
font-weight: bold;
color: #1E1E1E;
margin-left: 20px;
text-decoration: none;
&:hover {
    background-color: #b0b0b0; 
  }

`;

const ClienteImg = styled.div`
background-color:#1E1E1E;
height: 30px;
width: 30px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
margin-left: 3px;
margin-right: 12px;

`;

const BoxLogo= styled.div`
display: flex;
align-items: center;

`;

const BoxButtons = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const Header = () =>{
return(
<>
<ContainerHeader>
  <BoxLogo>
<LogoImg src={Logo_lume} alt="Logo Lume"/>
<TextLogo>Lume</TextLogo>
</BoxLogo>


<BoxButtons>
<Text>Home</Text>
<Text>Books</Text>
<Text>Nossa história</Text>
<Button as={Link} to="/Login">
  
<ClienteImg>
<GoPerson size={25} color='#fff'/>
</ClienteImg>
Log in
</Button>
</BoxButtons>
</ContainerHeader>
</>)
}


export default Header;