import Logo_lume from '../../../public/images/logo_lume.png'
import { GoPerson } from "react-icons/go";
import { useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserActionTypes from "../../redux/user/action-types";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContainerHeader = styled.div`
 
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #1C1D20;

`;

const LogoImg = styled.img`
width: 50px;
height: 50px;
border-radius: 10px;
`;

const Text = styled.a`
font-family: Raleway;
font-size: 20px;
font-weight: 200;
color: #A3B1A9;
position: relative; 
display: inline-block;
text-decoration: none;
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

const ButtonLogin = styled.button`
height: 40px;
width: 130px;
border-radius: 20px;
margin-left: 15px;
display: flex;
align-items: center;
background-color: #D9D9D9;
font-weight: bold;
color: #1E1E1E;

text-decoration: none;
&:hover {
    background-color: #b0b0b0; 
  }
`;


const DivNamed = styled.div`
width: 35px;
height: 35px;
border-radius: 50%;
background-color: ${(props) => props.bgColor};
font-family: Rock Salt;
color: #fff;
font-size: 20px;
font-weight: 400;
display: flex;
align-items: center;
justify-content: center;
margin-left: 2px;
`;

const BoxButtons = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const Header = () =>{
  
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  const [initial, setInitial] = useState('');
  const [primeiro_nome, setprimeiro_nome] = useState('');
  const [showDivNamed, setShowDivNamed] = useState(() => {
    const storedShowDivNamed = localStorage.getItem('showDivNamed');
    return storedShowDivNamed ? JSON.parse(storedShowDivNamed) : false;
  });

  useEffect(() => {
    const fetchInitial = async () => {
      console.log('currentUser.email:', currentUser.email);
      try {
        const response = await axios.get(`http://127.0.0.1:5000/perfil/inicial/${currentUser.email}`);
        setInitial(response.data.inicial);
        setprimeiro_nome(response.data.primeiro_nome);
        console.log(response.data)
        
        localStorage.setItem('showDivNamed', JSON.stringify(true));
      } catch (error) {
        console.error('Erro ao buscar perfil inicial:', error);
      }
    };
    if (currentUser.email) {
      fetchInitial();
    } else {
      setShowDivNamed(false);
      localStorage.setItem('showDivNamed', 'false');
    }
  }, [currentUser.email]);


  const [color, setColor] = useState(() => localStorage.getItem('color') || '#0E1218');
  useEffect(() => {
   
    if (currentUser.email) {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setColor(randomColor);
      localStorage.setItem('color', randomColor);
    }
 
  }, [currentUser.email]);
return(
<>
<ContainerHeader>
  <BoxLogo>
<LogoImg src={Logo_lume} alt="Logo Lume"/>
<TextLogo>Lume</TextLogo>
</BoxLogo>


<BoxButtons>
<Text href="/">Home</Text>
<Text href="/Books">Books</Text>
<Text onClick={() => {
    const historiaSection = document.getElementById('nossa-historia');
    if (historiaSection) {
        historiaSection.scrollIntoView({ behavior: 'smooth' });
    }
}}>Nossa história</Text>


  

  {currentUser.email && showDivNamed ? (
        <ButtonLogin>
  
        
        <DivNamed as={Link} to="/pageuser"
        bgColor={color}>{initial}</DivNamed>
        Ola,{primeiro_nome}
        </ButtonLogin>
      ) : (
        <Button as={Link} to="/Login">
        <ClienteImg> 
        <GoPerson size={25} color='#fff' />
        </ClienteImg>
Log in
</Button>
      )}

</BoxButtons>


</ContainerHeader>
</>)
}


export default Header;