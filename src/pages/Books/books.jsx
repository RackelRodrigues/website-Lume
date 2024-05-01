import styled from "styled-components";
import Header from "../../components/header";
import { IoSearchOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { CiBookmark } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "axios";
import ContainerList from "../../components/ContainerList";


const Background = styled.div`
background-color: #1C1D20;
height: 100vh;

overflow-x: hidden;
`;

const InputCenter = styled.div`
display: flex;
align-items: center;
justify-content: center;

`;

const Center = styled.div`
  position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -12%);
    margin-bottom: 70px;
 
`;

const Input = styled.input`
width: 100%;
margin-left: 10px;
color: #000;
font-family: Inter;
font-size: 20px;
background-color: transparent;
outline: none;
border: none;

&::placeholder {
    font-family: Raleway;
    font-size: 17.1px;
    font-weight: 200;
    font-size: 15px;
  }

`;

const Containerinput = styled.div`
width: 750px;
height: 52px;
background-color: #D9D9D9;
color: #000;
font-family: Inter;
font-size: 15px;
border-radius: 15px;
display: flex;
align-items: center;
justify-content: flex-end;

`;

const Button = styled.button`
width: 55px;
height: 52px;
background-color:#C084FC;
border-radius: 10px;
border: none;
`;

const Line = styled.span`
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
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
width: 150px;
height: 220px;

`;

const TitleBook = styled.h2`
font-family: Arial;
font-size: 20px;
font-weight: 500;
color: #A3B1A9;
margin-bottom: 25px;
`;

const Nameautor = styled.h3`
font-family: Raleway;
font-size: 15px;
font-weight: 100;
color: #C084FC;
margin-bottom: 25px;
`;


const Information = styled.p`
color: #A3B1A9;
font-family: Raleway;
font-size: 18px;
font-weight: 100;
margin-bottom: 25px;
`;

const Containerinformation = styled.div`

display: flex;
flex-direction: column;
margin-left: 20px;
`;

const Containergrid = styled.div`

display: flex;
flex-direction: row;
align-items: center;

`;

const ContainerMain = styled.div`

display: grid;
grid-template-columns: 2fr 1fr; 
gap: 20px;
`;

const ButtonSvg= styled.button`
width: 35px;
height: 35px;
background-color: transparent;
border: none;
cursor: pointer;

`;

const Books =()=>{
   const [query, setQuery] = useState('');
   const [results, setResults] = useState([]);
   const [showList, setShowList] = useState(true);

   const handleSearch = async () => {
    try {
        const response = await axios.post('http://localhost:5000/search-books', {
            query: query
        });
        setResults(response.data.items)
        setShowList(false);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
    }
};

    return(
    <>
    <Header/>
    <Background>
       < InputCenter>
    <Containerinput>
        <Input   
        type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Digite seu livro..."/> 
        <Button onClick={handleSearch}>
            <IoSearchOutline size={33}/>
        </Button>
    </Containerinput>
    </InputCenter>

    <Center>
    {results.map((book) => (
  <div key={book.id}>
    <Line />
    <ContainerMain>
      <Containergrid> 
        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
          <ImgBook src={book.volumeInfo.imageLinks.thumbnail} alt="Capa do Livro" />
        )}
        <Containerinformation>
          <TitleBook>{book.volumeInfo.title}</TitleBook>
          <Nameautor>{book.volumeInfo.authors.join(', ')}</Nameautor>
          <Information>Ano: {book.volumeInfo.publishedDate}</Information>
          <Information>Páginas: {book.volumeInfo.pageCount}</Information>
        </Containerinformation>
      </Containergrid>
      <Containergrid>
        <ButtonSvg>
          <HiOutlineBookOpen size={28} color="#A3B1A9" />
        </ButtonSvg>
        <ButtonSvg>
          <PiBooksLight size={28} color="#A3B1A9" />
        </ButtonSvg>
        <ButtonSvg>
          <CiBookmark size={28} color="#A3B1A9" />
        </ButtonSvg>
        <ButtonSvg>
          <IoIosCloseCircleOutline size={28} color="#A3B1A9" />
        </ButtonSvg>
        <ButtonSvg>
          <CiStar size={30} color="#A3B1A9" />
        </ButtonSvg>
      </Containergrid>
    </ContainerMain>
  </div>
))}
    </Center>
    {showList && <ContainerList />}
    </Background>
   
    </>)
}


export default Books;