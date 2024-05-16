import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PiBooksLight } from "react-icons/pi";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { CiBookmark } from "react-icons/ci";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import IDActionTypes from "../redux/idbook/action-types";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiStar } from "react-icons/ci";



const ButtonList = styled.button`
margin-top: 50px;

`;

const ContainerButtons = styled.div`
display: block;

`;

const ButtonSvg = styled.button`
width: 18px;
height: 18px;
background-color: transparent;
border: none;
cursor: pointer;
`;

const Line = styled.span`
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 8px ;
    position: relative;
    height: 1; 
    background-color: #A3B1A9; 
    width: 1200px; 
    &::after {
        content: '';
        flex: 0.8;
        border-top: 1px solid #A3B1A9;
        margin: 0 7px;
    }
`;

const ImgBook = styled.img`
width: 120px;
height: 175px;


`;

const Boxlist = styled.div`
 width: 1200px; 
 display: flex;
 align-items: center;
 justify-content: space-between;
margin-top: 50px;
`;


const VerMais = styled.a`
font-family: Raleway;
font-size: 13px;
font-weight: 100;
color: #A3B1A9;
cursor: pointer;
`;

const ContainerCenter = styled.div`
display: flex;
align-items: center;
flex-direction: row;

`;

const TitleList = styled.h3`
font-family: Raleway;
font-size: 18px;
font-weight: 200;
color: #A3B1A9;
`;


const Center = styled.div`
    position: relative;
    top: 35%;
    left: 50%;
    transform: translate(-40%, -50%);
  
`;

const ContainerBook = styled.div`
display: flex;
flex-direction: column;
margin-right: 30px;
`;



const ContainerList = ()=>{
  const [booksbest, setBooksbest] = useState([]);
  const [bookpopular, setBookPopular ]= useState([])
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('http://localhost:5000/bestsellers');
        setBooksbest(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    async function fetchBooksPopular() {
      try {
        const response = await axios.get('http://localhost:5000/popular-books');
        setBookPopular(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    }
    fetchBooksPopular();
  }, []);

  
  const handleShowAll = () => {
    setShowAll(true);
  };


const handleBookClick = (bookId) => {
  dispatch({
    type: IDActionTypes.ATUALIZAR_ID,
    payload: {ID: bookId}
  }) 

  Navigate('/Detailbook');
  console.log('ID do livro:', bookId);
};



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
      email: currentUser.email,
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

    return(
    <>
    <Center>
    {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '75vw'}}>
            <CircularProgress  style={{ color: '#C084FC' }}/>
          </Box>
        ) : (
        <>
   <Boxlist>
    <TitleList>Bestsellers</TitleList>
    <VerMais onClick={handleShowAll}>Ver mais</VerMais>
    </Boxlist>
    <Line/>
    <ContainerCenter>
    {booksbest && booksbest.map((book) => (
  <ContainerBook key={book.id}>
   {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? (
  <ImgBook src={book.volumeInfo.imageLinks.thumbnail} 
  alt="capa livro" 
  onClick={() => handleBookClick(book.id)}
  />
) : (
  <ImgBook src="https://i.ibb.co/3z2whnm/image.png" alt="imagem não disponível" />
)}
    <ContainerButtons>
      <ButtonSvg>
        <HiOutlineBookOpen size={18} color="#A3B1A9" />
      </ButtonSvg>
      <ButtonSvg>
        <PiBooksLight size={18} color="#A3B1A9" />
      </ButtonSvg>
      <ButtonSvg>
        <CiBookmark size={18} color="#A3B1A9" />
      </ButtonSvg>
      <ButtonSvg>
        <IoIosCloseCircleOutline size={18} color="#A3B1A9" />
      </ButtonSvg>
      <ButtonSvg>
        <CiStar size={20} color="#A3B1A9" />
      </ButtonSvg>
    </ContainerButtons>
  </ContainerBook>
))}
        </ContainerCenter>
  
 
 <Boxlist>
    <TitleList>Mais lidos</TitleList>
    <VerMais>Ver mais</VerMais></Boxlist>
    <Line/>
    <ContainerCenter>
    {bookpopular && bookpopular.map((bookP) => (
  <ContainerBook key={bookP.id}>
   {bookP.volumeInfo.imageLinks && bookP.volumeInfo.imageLinks.thumbnail ? (
  <ImgBook src={bookP.volumeInfo.imageLinks.thumbnail} 
  alt={bookP.title} 
  onClick={() => handleBookClick(bookP.id)}
  />
) : (
  <ImgBook src="https://i.ibb.co/3z2whnm/image.png" alt="imagem não disponível" />
)}
    <ContainerButtons>
      <ButtonSvg>
        <HiOutlineBookOpen size={18} color="#A3B1A9" />
      </ButtonSvg>
      <ButtonSvg>
        <PiBooksLight size={18} color="#A3B1A9" />
      </ButtonSvg>
      <ButtonSvg>
        <CiBookmark size={18} color="#A3B1A9" />
      </ButtonSvg>
      <ButtonSvg>
        <IoIosCloseCircleOutline size={18} color="#A3B1A9" />
      </ButtonSvg>
      <ButtonSvg>
        <CiStar size={20} color="#A3B1A9" />
      </ButtonSvg>
    </ContainerButtons>
  </ContainerBook>
  
))}
        </ContainerCenter>

</>
    )}
 </Center>
    </>
    
)
}


export default ContainerList;