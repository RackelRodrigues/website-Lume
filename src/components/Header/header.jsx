import Logo_lume from '../../../public/images/logo-lume.svg';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { CiLogin } from "react-icons/ci";
import UserActionTypes from "../../redux/user/action-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  width: 100%;
  max-width: 1480px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff;
`;

const LogoImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const Text = styled.a`
  font-family: Raleway;
  font-size: 15px;
  font-weight: 400;
  color: #000;
  position: relative;
  display: inline-block;
  text-decoration: none;
  margin-left: 25px;
  &:hover {
    color: #64748b;
    
  }
`;

const TextLogo = styled.h3`
  font-family: Raleway;
  font-size: 20px;
  font-weight: 200;
  color: #222;
  margin-left: 5px;
`;


const Button = styled.button`
  height: 40px;
  width: 110px;
  border-radius: 8px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  background-color: #fff;
  font-weight: bold;
  color: #1e1e1e;
  margin-left: 20px;
  border: 2px solid #222;
  text-decoration: none;
  &:hover {
    background-color: #b0b0b0;
  }
`;

const ClienteImg = styled.div`
  background-color: transparent;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
  margin-right: 12px;
`;

const BoxLogo = styled.div`
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
  background-color: #d9d9d9;
  font-weight: bold;
  color: #1e1e1e;

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
  gap: 15px;
`;

const Header = () => {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  const [initial, setInitial] = useState("");
  const [primeiro_nome, setprimeiro_nome] = useState("");
  const [showDivNamed, setShowDivNamed] = useState(() => {
    const storedShowDivNamed = localStorage.getItem("showDivNamed");
    return storedShowDivNamed ? JSON.parse(storedShowDivNamed) : false;
  });

  useEffect(() => {
    const fetchInitial = async () => {
      console.log("currentUser.email:", currentUser.email);
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/perfil/inicial/${currentUser.email}`
        );
        setInitial(response.data.inicial);
        setprimeiro_nome(response.data.primeiro_nome);
        console.log(response.data);

        localStorage.setItem("showDivNamed", JSON.stringify(true));
      } catch (error) {
        console.error("Erro ao buscar perfil inicial:", error);
      }
    };
    if (currentUser.email) {
      fetchInitial();
    } else {
      setShowDivNamed(false);
      localStorage.setItem("showDivNamed", "false");
    }
  }, [currentUser.email]);

  const [color, setColor] = useState(
    () => localStorage.getItem("color") || "#0E1218"
  );
  useEffect(() => {
    if (currentUser.email) {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      setColor(randomColor);
      localStorage.setItem("color", randomColor);
    }
  }, [currentUser.email]);
  return (
    <>
      <ContainerHeader>
        <BoxLogo>
          <LogoImg src={Logo_lume} alt="Logo Lume" />
          <TextLogo>Lume</TextLogo>
        </BoxLogo>
        

        <BoxButtons>
          <Text href="/Books">Explore Livros</Text>
          <Text href="/">quem somos</Text>
          <Text
            onClick={() => {
              const historiaSection = document.getElementById("nossa-historia");
              if (historiaSection) {
                historiaSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Comece a Ler
          </Text>
          <Text href="/">Junte-se á comunidade</Text>

          {currentUser.email && showDivNamed ? (
            <ButtonLogin>
              <DivNamed as={Link} to="/pageuser" bgColor={color}>
                {initial}
              </DivNamed>
              Ola,{primeiro_nome}
            </ButtonLogin>
          ) : (
            <Button as={Link} to="/Login">
              <ClienteImg>
                <CiLogin size={25} color="#000" />
              </ClienteImg>
              Login
            </Button>
          )}
        </BoxButtons>
      </ContainerHeader>
    </>
  );
};

export default Header;
