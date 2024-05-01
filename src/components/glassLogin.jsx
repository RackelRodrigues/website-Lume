import styled from "styled-components";
import Logo_lume from '../images/logo_lume.png';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import  {  GoogleOAuthProvider, GoogleLogin   }from '@react-oauth/google' ;
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from 'axios';


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


const DivLogin = styled.div`
margin-top: 20px;
width: 400px;
display: flex;
align-items: center;
justify-content: center;
 
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

const Form = styled.form`
   
`;


const GlassLogin = () => {

        const [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [rememberMe, setRememberMe] = useState(false);
        const togglePasswordVisibility = () => {
                setShowPassword(prev => !prev);
        };

        const [showInputs, setShowInputs] = useState(false);

        const handleSubmit = async (e) => {
          e.preventDefault();
        
          try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
              email: email,
              senha: senha,
            }, {
              headers: {
                withCredentials: true,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/login'
              }
            });
        
            if (response.status === 200) {
              window.location.href = '/';
            } else {
              alert('Erro ao fazer login. Por favor, tente novamente.');
            }
          } catch (error) {
            if (error.response.status === 302) {
              const redirectUrl = error.response.headers.location;
              if (redirectUrl) {
                window.location.href = redirectUrl; 
              }
            } else {
              console.error(error);
              alert('Erro ao fazer login. Por favor, tente novamente.');
            }
          }
        };
        
    return (
        <>
        <Box>
        <Form onSubmit={handleSubmit}>
        <ContainerTitulo>
        <LogoImg src={Logo_lume} alt="Logo lume"/>
        <Titulo>Lume</Titulo>
        </ContainerTitulo>

        <BoxCenter>
<Boxinputs>
        <Label>Email</Label>
        <ContainerInput>
        <Input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        </ContainerInput>
</Boxinputs>

<Boxinputs>
        <Label>Senha</Label>
        <ContainerInput>
        <Input  
          type={showPassword ? "text" : "password"}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <ToggleButton onClick={togglePasswordVisibility}>
                {showPassword ? <FaRegEye size={20}/> : <FaRegEyeSlash  size={20}/>}
              </ToggleButton>
              
        </ContainerInput>
        </Boxinputs>
</BoxCenter>
<ContainerEsqueceu>
<Boxcheckbox>
<Checkbox  
type="checkbox"
checked={rememberMe}
 onChange={(e) => setRememberMe(e.target.checked)}/>
Lembre de mim
</Boxcheckbox>

<Forget>Esqueceu a senha</Forget>
</ContainerEsqueceu>
<BoxInformation>
        <Button type="submit" onClick={() => setShowInputs(true)}>Increver-se</Button>

      <DivLogin>
        
        <GoogleOAuthProvider 
        clientId ="638778227780-jkrvm6jp7af25cdbsm0udlgqirch88qv.apps.googleusercontent.com">
        <GoogleLogin
         onSuccess={credentialResponse => { 
          const decoded = jwtDecode(credentialResponse.credential);
          console.log(decoded);
          setEmail(decoded.email);
        }} 
        onError={() => { 
          console.log('Falha no login');
        }} />
  </GoogleOAuthProvider>
 </DivLogin>

        <Text>Ainda não tem uma conta? <Span color="#ec8020" href="/ContaCont">Criar conta</Span></Text>
</BoxInformation>
</Form>
        </Box>
          
        </>
    );
};

export default GlassLogin;