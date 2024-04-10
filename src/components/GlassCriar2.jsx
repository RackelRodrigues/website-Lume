import styled from "styled-components";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
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

const Titulo = styled.h2`
font-family: Raleway;
font-size: 30px;
font-weight: 300;
color: #fff;
margin: 40px 0 40px 0;

`;


const BoxHead = styled.div`
display: flex;
align-items: center;
justify-content: center;
;
`;

const Label = styled.p`
color: #fff;
font-family: Raleway;
font-size: 18px;
font-weight: 100;
margin: 2px 0 8px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
 
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
margin: 20px 0 30px 0;
`;

const Button = styled.button`
width: 400px;
height: 45px;
color: #000;
background-color: #D0A460;
border-radius: 30px;
border: 0;
outline: none;
margin-top:  5px;
font-family: Raleway;
font-size: 20px;
font-weight: 100;


&:hover {
 background-color:  #9b7537;
 border: 0;
outline: none;
}
`;


const ButtonPurple = styled.button`
width: 400px;
height: 45px;
color: #000;
background-color: #C084FC;
border-radius: 30px;
border: 0;
outline: none;
margin-top:  30px;
font-family: Raleway;
font-size: 20px;
font-weight: 100;


&:hover {
 background-color:  #9333ea;
 border: 0;
outline: none;
}
`;

const BoxFinal = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin: 20px 0 20px 0;
`;

const Erro = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;





const ToggleButton = styled.button`
  margin-right: 15px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Text = styled.p`
font-family: Raleway;
font-size: 15px;
font-weight: 50;
color: ${(props) => props.color || "#fff"};
display: flex;
margin-top:  30px;
`;

const Span = styled.a`
font-family: Raleway;
font-size: 15px;
font-weight: 50;
color: ${(props) => props.color || "#fff"};
margin-left: 8px;
cursor: pointer;

`;

const Form = styled.form`
   
`;

const Glasscriar2 =()=>{


    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirme, setConfirme] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [errosenha, setErroSenha] = useState('');
    const [erroconfirme, setErroConfirme] = useState('');

    const validarCampos = () => {
        let valido = true;
        if (senha.trim() === '') {
          setErroSenha('Por favor, preencha o senha.');
          valido = false;
        } else {
          setErroSenha('');
        }
      
        if (senha.trim() !== confirme.trim()) {
          setErroSenha('As senhas não coincidem. Por favor, verifique.');
          setErroConfirme('As senhas não coincidem. Por favor, verifique.');
          valido = false;
        }
        if (email.trim() === '') {
          setErroEmail('Por favor, preencha o email.');
          valido = false;
        } else {
          setErroEmail('');
        }
      
       
        return valido;
      };
      
      
      const handleAvancarClick = () => {
        if (validarCampos()) {
         
            
        }
      };

      const [showPassword, setShowPassword] = useState(false);
      const [showConfirme, setShowConfirme] = useState(false);

      const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
      };

      const toggleConfirmeVisibility = () => {
        setShowConfirme(prev => !prev);
      };

      const handleCadastro = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        if (validarCampos()) {
          try {
            console.log(email);
            console.log(senha);
            const response = await axios.post(
              'http://127.0.0.1:5000/cadastro',
              {
                email: email,
                senha: senha,
                confirm_password: confirme,
              },
              {
                headers: {
                  withCredentials: true,
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
                },
              }
            );
      
            if (response.status === 200) {
             
              history.push('/login');
            } else {
              const errorData = response.data;
              alert(errorData.message);
            }
          } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar. Por favor, tente novamente.');
          }
        }
      };
      
    return(
        <>
        <Box>
     
        <Form onSubmit={handleCadastro}>

            <BoxHead>
        <Titulo>Criar Conta</Titulo>
        </BoxHead>
<BoxCenter>
<Boxinputs>
        <Label>Email</Label>
        <ContainerInput>
     <Input   
       type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}/>
        </ContainerInput>
        {erroEmail && <Erro>{erroEmail}</Erro>}
       
    </Boxinputs>
    <Boxinputs>
        <Label>Senha</Label>
        <ContainerInput>
     <Input   
       type={showPassword ? "text" : "password"}
      value={senha}
      onChange={(e) => setSenha(e.target.value)}/>

       <ToggleButton onClick={togglePasswordVisibility}>
                {showPassword ? <FaRegEye size={20}/> : <FaRegEyeSlash  size={20}/>}
              </ToggleButton>
        </ContainerInput>
        {errosenha && <Erro>{errosenha}</Erro>}
    </Boxinputs>
    <Boxinputs>
        <Label>Confirme sua senha</Label>
    <ContainerInput>
            <Input 
            type={showConfirme ? "text" : "password"}
            value={confirme}
            onChange={(e) => setConfirme(e.target.value)}
            />
              <ToggleButton onClick={toggleConfirmeVisibility}>
                {showConfirme ? <FaRegEye size={20}/> : <FaRegEyeSlash  size={20}/>}
              </ToggleButton>
       
        </ContainerInput>
        {erroconfirme && <Erro>{erroconfirme}</Erro>}
    </Boxinputs>
</BoxCenter>
<BoxFinal>



<Button onClick={handleAvancarClick} type="submit">Avançar</Button>


<Text>Já tem uma conta? <Span color="#D0A460" href="/Login">Faça Login</Span></Text>
</BoxFinal>

</Form>
        </Box>
        </>
    )
}

export default Glasscriar2;