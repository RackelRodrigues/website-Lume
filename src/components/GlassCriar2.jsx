import styled from "styled-components";
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
margin-top:  30px;
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

const Glasscriar2 =()=>{



    const [senha, setSenha] = useState('');
    const [confirme, setConfirme] = useState('');
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
      
        if (confirme.trim() === '') {
          setErroConfirme('Por favor, preencha o Confirme sua senha.');
          valido = false;
        } else {
          setErroConfirme('');
        }
      
       
        return valido;
      };
      
      
      const handleAvancarClick = () => {
        if (validarCampos()) {
         
            window.location.href = '/';
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

    return(
        <>
        <Box>
            <BoxHead>
        <Titulo>Criar um Perfil</Titulo>
        </BoxHead>
<BoxCenter>
    <Boxinputs>
        <Label>Senha</Label>
        <ContainerInput>
     <Input   
       type={showPassword ? "text" : "password"}
      value={senha}
      onChange={(e) => setSenha(e.target.value)}/>

       <ToggleButton onClick={togglePasswordVisibility}>
                {showPassword ? <FaRegEyeSlash size={20}/> : <FaRegEye  size={20}/>}
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
                {showConfirme ? <FaRegEyeSlash size={20}/> : <FaRegEye  size={20}/>}
              </ToggleButton>
       
        </ContainerInput>
        {erroconfirme && <Erro>{erroconfirme}</Erro>}
    </Boxinputs>
</BoxCenter>
<BoxFinal>

<StyledLink to="/CriarConta">
<Button>Retornar</Button>
</StyledLink>


<ButtonPurple onClick={handleAvancarClick }>Finalizar</ButtonPurple>
</BoxFinal>
        </Box>
        </>
    )
}

export default Glasscriar2;