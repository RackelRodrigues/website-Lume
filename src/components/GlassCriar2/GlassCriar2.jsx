import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import UserActionTypes from "../../redux/user/action-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Titulo,
  BoxHead,
  Label,
  StyledLink,
  DivEmail,
  Input,
  ContainerInput,
  Boxinputs,
  BoxCenter,
  Button,
  BoxFinal,
  Erro,
  ToggleButton,
  Text,
  Span,
  Form,
} from "./styles";

const Glasscriar2 = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirme, setConfirme] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [errosenha, setErroSenha] = useState("");
  const [erroconfirme, setErroConfirme] = useState("");
  const [redirect, setRedirect] = useState(false);

  const validarCampos = () => {
    let valido = true;
    if (senha.trim() === "") {
      setErroSenha("Por favor, preencha o senha.");
      valido = false;
    } else {
      setErroSenha("");
    }

    if (senha.trim() !== confirme.trim()) {
      setErroSenha("As senhas não coincidem. Por favor, verifique.");
      setErroConfirme("As senhas não coincidem. Por favor, verifique.");
      valido = false;
    }
    if (email.trim() === "") {
      setErroEmail("Por favor, preencha o email.");
      valido = false;
    } else {
      setErroEmail("");
    }

    return valido;
  };

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirme, setShowConfirme] = useState(false);

  const PasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const ConfirmeVisibility = (e) => {
    e.preventDefault();
    setShowConfirme((prev) => !prev);
  };

  let navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (validarCampos()) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/cadastro",
          {
            email: email,
            password: senha,
            confirm_password: confirme,
            is_admin: false,
            is_active: true,
          },
          {
            headers: {
              withCredentials: true,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
            },
          }
        );
        dispatch({
          type: UserActionTypes.ATUALIZAR_EMAIL,
          payload: { email: email },
        });
        if (response.status === 201 || 200) {
          navigate("/CriarConta");
          toast.success(response.data.message);

          setEmail("");
          setSenha("");
          setConfirme("");
        } else {
          const errorData = response.data;
          toast.error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao cadastrar. Por favor, tente novamente.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </ContainerInput>
              {erroEmail && <Erro>{erroEmail}</Erro>}
            </Boxinputs>
            <Boxinputs>
              <Label>Senha</Label>
              <ContainerInput>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />

                <ToggleButton onClick={(e) => PasswordVisibility(e)}>
                  {showPassword ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
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
                <ToggleButton onClick={(e) => ConfirmeVisibility(e)}>
                  {showConfirme ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </ToggleButton>
              </ContainerInput>
              {erroconfirme && <Erro>{erroconfirme}</Erro>}
            </Boxinputs>
          </BoxCenter>
          <BoxFinal>
            <DivEmail>
              <GoogleOAuthProvider clientId="638778227780-jkrvm6jp7af25cdbsm0udlgqirch88qv.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    console.log(decoded);
                    setEmail(decoded.email);
                  }}
                  onError={() => {
                    console.log("Falha no login");
                  }}
                />
              </GoogleOAuthProvider>
            </DivEmail>
            <Button onClick={handleCadastro} type="submit">
              Avançar
            </Button>

            <Text>
              Já tem uma conta?{" "}
              <Span color="#D0A460" href="/Login">
                Faça Login
              </Span>
            </Text>
          </BoxFinal>
        </Form>
      </Box>
    </>
  );
};

export default Glasscriar2;
