
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import UserActionTypes from "../../redux/user/action-types";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Titulo,
  Label,
  BoxHead,
  Input,
  ContainerInput,
  Boxinputs,
  BoxCenter,
  Button,
  ButtonPurple,
  BoxLinks,
  StyledLink,
  Span,
  Text,
  StyledIcon,
  FotoDiv,
  ImgFoto,
  InputFoto,
  PreviaFoto,
  Erro,
  Form,
} from './styles';
 // Substitua 'nomeDoArquivo' pelo nome do arquivo onde você definiu esses estilos

const GlassCriarConta = () => {
  const [fotoPreview, setFotoPreview] = useState("");
  const [foto, setFoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirme, setShowConfirme] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmeVisibility = () => {
    setShowConfirme((prev) => !prev);
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
    const parts = fullName.split(" ");
    return parts.length > 1
      ? parts[0].charAt(0) + parts[1].charAt(0)
      : parts[0].charAt(0);
  };

  const dispatch = useDispatch();

  const [nome, setNome] = useState("");
  const [inicial, setInicial] = useState("");
  const [nomeusuario, setNomeusuario] = useState("");
  const [erroNome, setErroNome] = useState("");
  const [errousuario, setErroUsuario] = useState("");

  const validarCampos = () => {
    let valido = true;
    if (nome.trim() === "") {
      setErroNome("Por favor, preencha o nome.");
      valido = false;
    } else {
      setErroNome("");
    }

    if (nomeusuario.trim() === "") {
      setErroUsuario("Por favor, preencha o Nome de usuario.");
      valido = false;
    } else {
      setErroUsuario("");
    }

    return valido;
  };

  const [email, setEmail] = useState("");
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  const navigate = useNavigate();

  const handleCriarPerfil = async (e) => {
    e.preventDefault();
    setEmail(currentUser.currentUser);
    console.log(currentUser.email);

    if (validarCampos()) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/criar_perfil",
          {
            name: nome,
            username: nomeusuario,
            email: currentUser.email,
            inicial: getInitials(nome),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
            },
          }
        );

        console.log("Dados a serem enviados:", {
          name: nome,
          username: nomeusuario,
          inicial: inicial,
        });

        dispatch({
          type: UserActionTypes.ATUALIZAR_NOME,
          payload: { nome: getInitials(nome) },
        });
        if (response.status === 201 || 200) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          const errorData = response.data;
          toast.error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao criar perfil. Por favor, tente novamente.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
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
                  onChange={(e) => setNomeusuario(e.target.value)}
                />
                {errousuario && <Erro>{errousuario}</Erro>}
              </ContainerInput>
            </Boxinputs>
          </BoxCenter>

          <BoxLinks>
            <Button> Retornar</Button>

            <ButtonPurple onClick={handleCriarPerfil}>Finalizar</ButtonPurple>
          </BoxLinks>
        </Form>
      </Box>
    </>
  );
};

export default GlassCriarConta;
