import styled from "styled-components";
import Logo_lume from '../images/logo_lume.png';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from "react";

const Box = styled.div`
width: 100%;
max-width: 650px;
height: 650px;
border-radius: 15px;
background-color: rgba(255, 255, 255, 0.15);
backdrop-filter:blur(8.5px);
`;


const LogoImg = styled.img`
width: 50px;
height: 50px;
border-radius: 10px;
`;

const Titulo = styled.h3`
width: 108px;
font-family: Raleway;
font-size: 25px;
font-weight: 600;
color: #1E1E1E;
margin-left: 8px;
`;

const ContainerTitulo = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 20px;
`;



const BoxInformation = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 10px;
`;

const Button = styled.button`
width: 400px;
height: 45px;
color: #000;
background-color: #C084FC;
border-radius: 30px;
border: 0;
outline: none;
margin-top:  30px;
&:hover {
 background-color: #9333ea;
 border: 0;
outline: none;
}
`;


const ButtonGoogle = styled.button`
width: 400px;
height: 45px;
color: #000;
background-color: #D9D9D9;
border-radius: 30px;
border: 0;
outline: none;
margin-top:  30px;
&:hover {
 background-color: #9333ea;
 border: 0;
outline: none;
}
`;

const Label = styled.p`
color: #fff;
font-family: Raleway;
font-size: 18px;
font-weight: 100;
margin: 2px 0 8px 0;
`;

const Input = styled.input`
background-color:transparent;
padding-left: 12px;
width: 100%;
height: 100%;
border: 0;
outline: none;

border-radius: 10px;
&:focus {
    border: 0; 
    outline: none;
  
  }
`;

const ContainerInput = styled.div`
background-color: #D9D9D9;
width: 400px;
height: 45px;
border-radius: 10px;
display: flex;
align-items: center;

`;

const Boxinputs = styled.div`
display: flex;
flex-direction: column ;
margin-top: 15px;
`;

const BoxCenter = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 50px;
`;

const Span = styled.a`
font-family: Raleway;
font-size: 15px;
font-weight: 50;
color: ${(props) => props.color || "#fff"};
margin-left: 8px;
cursor: pointer;

`;

const Text = styled.p`
font-family: Raleway;
font-size: 15px;
font-weight: 50;
color: #fff;
display: flex;
margin-top:  30px;
`;


const Forget = styled.p`
font-family: Raleway;
font-size: 13px;
font-weight: 100;
color: #fff;
cursor: pointer;
margin-right: 15px;

&:hover {
color: #D0A460;
cursor: pointer;
}

`;

const Checkbox = styled.input`
  background-color: aliceblue;
  color: aliceblue;
  width: 12px;
  height: 12px;
  cursor: pointer;
  margin-right: 5px;

`;

const Boxcheckbox = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-family: Raleway;
  font-size: 13px;
  font-weight: 100;
  margin-left: 15px;
`;

const ContainerEsqueceu = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
margin-top: 25px;

`;


const ToggleButton = styled.button`
  margin-right: 15px;
  background: none;
  border: none;
  cursor: pointer;
`;


const GlassLogin = () => {

        const [showPassword, setShowPassword] = useState(false);
        const togglePasswordVisibility = () => {
                setShowPassword(prev => !prev);
        };
        
    return (
        <>
        <Box>
             
        <ContainerTitulo>
        <LogoImg src={Logo_lume} alt="Logo lume"/>
        <Titulo>Lume</Titulo>
        </ContainerTitulo>

        <BoxCenter>
<Boxinputs>
        <Label>Email</Label>
        <ContainerInput>
        <Input type="text"/>
        </ContainerInput>
</Boxinputs>

<Boxinputs>
        <Label>Senha</Label>
        <ContainerInput>
        <Input  
          type={showPassword ? "text" : "password"}
        />
        <ToggleButton onClick={togglePasswordVisibility}>
                {showPassword ? <FaRegEyeSlash size={20}/> : <FaRegEye  size={20}/>}
              </ToggleButton>
     
        </ContainerInput>
        </Boxinputs>
</BoxCenter>
<ContainerEsqueceu>
<Boxcheckbox>
<Checkbox type="checkbox" name="Lembre de mim"  value="Lmembrar"/>
Lembre de mim
</Boxcheckbox>
<Forget>Esqueceu a senha</Forget>
</ContainerEsqueceu>
<BoxInformation>
        <Button>Increver-se</Button>
        <ButtonGoogle>Conecte with Google</ButtonGoogle>

        <Text>Ainda não tem uma conta? <Span color="#D0A460" href="/CriarConta">Criar conta</Span></Text>
</BoxInformation>

        </Box>
          
        </>
    );
};

export default GlassLogin;