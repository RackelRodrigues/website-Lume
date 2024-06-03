import styled from "styled-components";
import axios from "axios";
import Header from "../../components/header";
import { PiBooksLight } from "react-icons/pi";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { HiOutlineBookOpen } from "react-icons/hi2";
import { CiBookmark } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import UserActionTypes from "../../redux/user/action-types";
import { useState, useEffect } from 'react';
import { FaSwatchbook } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";


const Background = styled.div`
background-color: #1C1D20;
height: 100vh;

`;

const Book = styled.img`
width: 300px;
height: 430px;



`;

const TitleBook = styled.h2`
font-family: Raleway;
font-size: 40px;
font-weight: 300;
color: #A3B1A9;
margin: 20px 0 20px 15px;
`;


const NameAutor = styled.h3`
font-family: Raleway;
font-size: 20px;
font-weight: 300;
color: #C084FC;
margin: 20px 0 20px 15px;

`;


const Classification = styled.p`
font-family: Inria Serif;
font-size: 23px;
font-weight: 400;
color: #fff;
margin-left: 8px;
width: 550px;
`;


const ContainerSvg= styled.div`


`;


const Boxtext = styled.div`
display: flex;
flex-direction: column;


`;

const BoxStar = styled.div`
display: flex;
flex-direction: row;
margin: 20px 0 20px 15px;

`;

const AboutBook = styled.p`
font-family: Raleway;
font-size: 20px;
font-weight: 300;
width: 700px;
color: #A3B1A9;
margin: 20px 0 20px 15px;


`;

const TitlePage = styled.h2`
font-family: Raleway;
font-size: 45px;
font-weight: 200;
width: 700px;
color: #A3B1A9;
text-align: center;
margin: 0 auto;
`;

const ButtonSvg = styled.a`
width: 25px;
height: 25px;
background-color: transparent;
border: none;
cursor: pointer;
margin-left: 20px;
`;


const ContainerGrid = styled.div`
display: flex;
flex-direction: row;
justify-content: center;

`;

const DetailBook = ()=>{
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState(null);
  const [idbook, setIDbook] = useState('');
  
  const { currentID} = useSelector((rootReducer) => rootReducer.IDReducer);
  
  const getBookDetails = async () => {
    console.log(currentID.ID)
    try {
      const response = await axios.get(`http://localhost:5000/book-details/${currentID.ID}`);
       setBookDetails(response.data);
       setLoading(false);
    } catch (error) {
      console.error('Erro ao obter detalhes do livro:', error);
      return null;
    }
  };
  useEffect(() => {
    if (currentID.ID) {
      getBookDetails();
    }
  }, []);

const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer); 
 
const adicionarQueroLer = async () => {
  try {
    const response = await axios.post('http://localhost:5000/adicionar_quero_ler', {
      email: "RAkdepr@gmail.com", 
      livro_id: currentID.ID 
    });
    toast.success('adicionado ao Quero Ler');
  } catch (error) {
    toast.error('Erro ao Adicionar. Por favor, tente novamente.');
  }
};



const adicionarLendo = async () => {
  try {
    const response = await axios.post('http://localhost:5000/adicionar_lendo', {
      email: "higooli@gmail.com",
      livro_id: currentID.ID
    });
    toast.success('Adicionado ao Lendo');
  } catch (error) {
    toast.error('Erro ao Adicionar. Por favor, tente novamente.');
  }
};


const adicionarAbandonei = async () => {
  try {
    const response = await axios.post('http://localhost:5000/adicionar_abandonei', {
      email: currentUser.email, 
      livro_id: currentID.ID
    });
    toast.success('Adicionado ao Abandonei');
  } catch (error) {
    toast.error('Erro ao Adicionar. Por favor, tente novamente.');
  }
};


const adicionarjaLi = async () => {
  try {
    const response = await axios.post('http://localhost:5000/adicionar_ja_li', {
      email: currentUser.email,
      livro_id: currentID.ID
    });
    toast.success('Adicionado ao Já li');
  } catch (error) {
    toast.error('Erro ao Adicionar. Por favor, tente novamente.');
  }
};
return (
  <>
    <Header />
    <Background>
      <TitlePage>Detalhes do Livro</TitlePage>
      <ButtonSvg href="/Books">
        <IoArrowBackOutline size={40} color="#fff" />
      </ButtonSvg>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress style={{ color: '#C084FC' }} />
        </Box>
      ) : (
        <ContainerGrid>
          <Boxtext>
            <Book src={bookDetails?.volumeInfo?.imageLinks?.thumbnail} alt={bookDetails?.volumeInfo?.title} />
            <ContainerSvg>
              <ButtonSvg onClick={adicionarQueroLer}>
                <HiOutlineBookOpen size={30} color="#A3B1A9" />
              </ButtonSvg>
              <ButtonSvg onClick={adicionarLendo}>
                <PiBooksLight size={30} color="#A3B1A9" />
              </ButtonSvg>
              <ButtonSvg>
                <CiBookmark size={30} color="#A3B1A9" />
              </ButtonSvg>
              <ButtonSvg>
                <IoIosCloseCircleOutline size={30} color="#A3B1A9" />
              </ButtonSvg>
              <ButtonSvg>
                <CiStar size={30} color="#A3B1A9" />
              </ButtonSvg>
            </ContainerSvg>
          </Boxtext>
          <Boxtext>
            <TitleBook>{bookDetails?.volumeInfo?.title}</TitleBook>
            <NameAutor>{bookDetails?.volumeInfo?.authors?.join(', ')}</NameAutor>
            <BoxStar>
              <FaSwatchbook size={23} color="#fbbf24" />
              <Classification>{bookDetails?.volumeInfo?.categories}</Classification>
            </BoxStar>
            <AboutBook>
              {bookDetails?.volumeInfo?.description && bookDetails.volumeInfo.description.length > 200
                ? `${bookDetails.volumeInfo.description.substring(0, 200)}...`
                : bookDetails?.volumeInfo?.description}
            </AboutBook>
          </Boxtext>
        </ContainerGrid>
      )}
    </Background>
  </>
);
}

export default DetailBook;