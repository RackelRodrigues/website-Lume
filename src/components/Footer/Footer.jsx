import { FaArrowRight, FaFacebook } from "react-icons/fa6";
import Logo_lume from '../../../public/images/logo-lume.svg';
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
  ConteinerButtons,
  ButtonSvg
} from "./styles";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
const Footer = () => {
  return (
    <>
      <Background>
        <Box>
          <Conteinergrid>
            <Conteinerleft>
              <ConteinerLogo>
                <LogoImg
                  src={Logo_lume}
                  alt="logo lume"
                />
                <TextLogo>Lume</TextLogo>
              </ConteinerLogo>
<ConteinerButtons>
  <ButtonSvg>
    <CiFacebook size={30}/>
  </ButtonSvg>
  <ButtonSvg>
    <FaInstagram size={25}/>
  </ButtonSvg>
  <ButtonSvg>
    <FaXTwitter size={25}/>
  </ButtonSvg>
</ConteinerButtons>
              <Text>
                Explore novos mundos com <Purple>Lume</Purple>: Sua jornada
                literária começa aqui.
              </Text>
              <Conteiner>
                <Input placeholder="Insira seu email" />
                <Button>
                  <MdOutlineMail size={15} color="#000" />
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
