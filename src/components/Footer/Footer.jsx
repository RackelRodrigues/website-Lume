import { FaArrowRight } from "react-icons/fa6";
import {
  Background,
  LogoImg,
  Box,
  TextLogo,
  ConteinerLogo,
  Input,
  Conteiner,
  Button,
  Linha,
  Titulos,
  BoxNames,
  BoxAllnames,
  Subnames,
  Text,
  Purple,
  Boxline,
  Nameline,
  Conteinernames,
  Conteinergrid,
  Conteinerleft,
} from "./styles";

const Footer = () => {
  return (
    <>
      <Background>
        <Box>
          <Conteinergrid>
            <Conteinerleft>
              <ConteinerLogo>
                <LogoImg
                  src="https://i.ibb.co/23CypmW/logo-lume-para-7d58bfb5-3159-4e27-bba5-c88fc931f16e.png"
                  alt="logo lume"
                />
                <TextLogo>Lume</TextLogo>
              </ConteinerLogo>

              <Text>
                Explore novos mundos com <Purple>Lume</Purple>: Sua jornada
                literária começa aqui.
              </Text>
              <Conteiner>
                <Input placeholder="Insira seu email" />
                <Button>
                  <FaArrowRight size={15} color="#000" />
                </Button>
              </Conteiner>
            </Conteinerleft>
            <BoxAllnames>
              <BoxNames>
                <Titulos>Explorar</Titulos>
                <Subnames>Inicio</Subnames>
                <Subnames>Livros</Subnames>
                <Subnames>Planos</Subnames>
                <Subnames>Blog</Subnames>
              </BoxNames>
              <BoxNames>
                <Titulos>Documentação</Titulos>
                <Subnames>Central de Ajuda</Subnames>
                <Subnames>Contato</Subnames>
                <Subnames>FAQ</Subnames>
                <Subnames>Política de Privacidade</Subnames>
              </BoxNames>
              <BoxNames>
                <Titulos>Social</Titulos>
                <Subnames>Facebook</Subnames>
                <Subnames>Instagram</Subnames>
                <Subnames>Youtube</Subnames>
                <Subnames>Twitter</Subnames>
              </BoxNames>
            </BoxAllnames>
          </Conteinergrid>
          <Boxline>
            <Linha />
            <Conteinernames>
              <Nameline>© Lume. All right Reserved 2024</Nameline>
              <Nameline>Terms & Conditions</Nameline>
            </Conteinernames>
          </Boxline>
        </Box>
      </Background>
    </>
  );
};

export default Footer;
