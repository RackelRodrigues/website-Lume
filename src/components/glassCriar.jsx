import styled from "styled-components";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { BsPersonBoundingBox } from "react-icons/bs";
import { useSelector } from 'react-redux';
import axios from 'axios';
import UserActionTypes from "../redux/user/action-types";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Box = styled.div`
width: 100%;
max-width: 550px;
height: 500px;
border-radius: 15px;
background-color: rgba(255, 255, 255, 0.15);
backdrop-filter:blur(8.5px);
`;


const Titulo = styled.h2`
font-family: Raleway;
font-size: 30px;
font-weight: 300;
color: #fff;
margin: 25px 0 15px 0;

`;


const Label = styled.p`
color: #fff;
font-family: Raleway;
font-size: 18px;
font-weight: 100;
margin: 2px 0 8px 0;
`;

const BoxHead = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

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
    outline: 3px solid #C084FC;
  
  }
`;

const ContainerInput = styled.div`
background-color: #D9D9D9;
width: 400px;
height: 45px;
border-radius: 10px;


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
margin-top: 20px;
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
cursor: pointer;

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

const BoxLinks = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`;

const StyledLink = styled(Link)`
  text-decoration: none;
 
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
color: ${(props) => props.color || "#fff"};
display: flex;
margin-top:  30px;
`;

const StyledIcon = styled(BsPersonBoundingBox)`
  color: #000; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color:  #333; 
  }
`;

const FotoDiv = styled.label`
width: 200px;
aspect-ratio: 1 / 1;
border-radius: 50%;
background-color: #D9D9D9;
display: flex;
align-items: center;
justify-content: center;
border: 3px solid #000;
cursor: pointer;
&:hover{
    color:  #333;
    border: 3px solid  #333;
}
&:active{
    background-color: #333;
}

`;

const ImgFoto = styled.img`
max-width: 100%;
object-fit: cover;
border-radius: 50%;
`;

const InputFoto = styled.input`
display: none;

`;


const PreviaFoto = styled.div`
  width: 200px;
  height: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Erro = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;



const Form = styled.form`
   
`;

const GlassCriarConta = () =>{

    const [fotoPreview, setFotoPreview] = useState('');
    const [foto, setFoto] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirme, setShowConfirme] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(prev => !prev);
    };

    const toggleConfirmeVisibility = () => {
      setShowConfirme(prev => !prev);
    };

    const handleFotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setFoto(file);
      }
    };

    const getInitials = (fullName) => {
      const parts = fullName.split(' ');
      return parts.length > 1
        ? parts[0].charAt(0) + parts[1].charAt(0)
        : parts[0].charAt(0);
    };

    const dispatch = useDispatch();
    

    const [nome, setNome] = useState('');
    const [inicial, setInicial] = useState('');
    const [nomeusuario, setNomeusuario] = useState('');
    const [erroNome, setErroNome] = useState('');
    const [errousuario, setErroUsuario] = useState('');
    


    const validarCampos = () => {
        let valido = true;
        if (nome.trim() === '') {
          setErroNome('Por favor, preencha o nome.');
          valido = false;
        } else {
          setErroNome('');
        }
      
        if (nomeusuario.trim() === '') {
          setErroUsuario('Por favor, preencha o Nome de usuario.');
          valido = false;
        } else {
          setErroUsuario('');
        }
      
       
        return valido;
      };

      const [email, setEmail ]= useState('')
      const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
      const navigate = useNavigate()
     
      const handleCriarPerfil = async (e) => {
        e.preventDefault(); 
        setEmail(currentUser.currentUser);
        console.log(currentUser.email)
       

        if (validarCampos()) {
       
          try {
            const response = await axios.post(
                'http://127.0.0.1:5000/criar_perfil',
                {
                    name: nome,
                    username: nomeusuario,
                    email: currentUser.email,
                    inicial: getInitials(nome),
                    
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
                    },
                }
            );  

     

        
            console.log("Dados a serem enviados:", {
              name: nome,
              username: nomeusuario,
              inicial: inicial
          });
      
      dispatch({
        type: UserActionTypes.ATUALIZAR_NOME,
        payload: { nome: getInitials(nome) }
      });
            if (response.status === 201 || 200) {
              
                toast.success(response.data.message);
                navigate("/");
                
            } else {
                
                const errorData = response.data;
                toast.error(errorData.message);
               
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar perfil. Por favor, tente novamente.");
        }
   
      };
    }
    

     
      
    return(
        <>
         <ToastContainer/>
<Box>
 <Form onSubmit={handleCriarPerfil}>
    <BoxHead>
      <Titulo>Criar um perfil</Titulo>

    
 </BoxHead>
 <BoxCenter>
<Boxinputs>
<Label>Nome</Label>
<ContainerInput>
    <Input
     type="text"
     value={nome}
     onChange={(e) => setNome(e.target.value)}
    />
     {erroNome && <Erro>{erroNome}</Erro>}
    </ContainerInput>
</Boxinputs>

<Boxinputs>
<Label>Nome do usuario</Label>
<ContainerInput>
    <Input 
     type="nomeusuario"
      value={nomeusuario}
      onChange={(e) => setNomeusuario(e.target.value)}/>
      {errousuario && <Erro>{errousuario}</Erro>}
</ContainerInput>
</Boxinputs>


</BoxCenter>

<BoxLinks>

    <Button > Retornar</Button>
    
    <ButtonPurple onClick={handleCriarPerfil}>Finalizar</ButtonPurple>
</BoxLinks>
</Form>
</Box>
        </>
    )
}

export default GlassCriarConta;