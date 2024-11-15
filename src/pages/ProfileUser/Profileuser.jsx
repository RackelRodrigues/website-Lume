import styled from "styled-components";
import Header from "../../components/Header/header";
import { IoIosLogOut } from "react-icons/io";
import { PiBooksLight } from "react-icons/pi";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { CiBookmark } from "react-icons/ci";
import { FaStar } from "react-icons/fa";



const Background = styled.div`
background-color: #fff;
height: 100%;

`;

const Books = styled.img`
width: 100px;
height: 150px;
margin-right: 25px;


`;

const Books2 = styled.img`
width: 85px;
height: 120px;
margin-right: 10px;


`;


const VerMais = styled.a`
font-family: Raleway;
font-size: 13px;
font-weight: 100;
color: #A3B1A9;
cursor: pointer;
`;
 

const TitleList = styled.h3`
font-family: Raleway;
font-size: 18px;
font-weight: 200;
color: #A3B1A9;
display: flex;
align-items: center;
`;



const Line = styled.span`
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 8px ;
    position: relative;
    height: 1; 
    background-color: #000; 
    width: 700px; 
    &::after {
        content: '';
        flex: 0.8;
        border-top: 1px solid #000;
        margin: 0 7px;
    }
`;


const Line2 = styled.span`
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 8px ;
    position: relative;
    height: 1; 
    background-color: #000; 
    width: 500px; 
    &::after {
        content: '';
        flex: 0.8;
        border-top: 1px solid #000;
        margin: 0 7px;
    }
`;


const PhotoUser = styled.div`
width: 134px;
height: 134px;
border-radius: 50%;
font-family: Raleway;
font-size: 60px;
font-weight: 400;
color: #fff;
display: flex;
align-items: center;
justify-content: center;
background-color: red;



`;


const Usersaid = styled.button`
width: 100px;
height: 40px;
border-radius: 10px;
color: #000;
background-color: #C084FC;
font-family: Raleway;
font-size: 23px;
font-weight: 300;
display: flex;
align-items: center;
justify-content: center;
outline: none;
border: none;
cursor: pointer;
`;


const Boxlist = styled.div`
 width: 700px; 
 display: flex;
 align-items: center;
 justify-content: space-between;
margin-top: 50px;
`;


const Boxlist2 = styled.div`
 width: 500px; 
 display: flex;
 align-items: center;
 justify-content: space-between;
margin-top: 50px;
`;

const UserEdit = styled.button`
width: 100px;
height: 40px;
border-radius: 10px;
color: #000;
background-color: #D0A460;
font-family: Raleway;
font-size: 23px;
font-weight: 300;
display: flex;
align-items: center;
justify-content: center;
outline: none;
border: none;
cursor: pointer;
margin-top: 20px;
`;



const Leiturometro = styled.h3`
font-family: Raleway;
font-size: 13.17px;
font-weight: 400;
color: #000;


`;


const Bio = styled.p`
font-family: Inter;
font-size: 13.6px;
font-weight: 200;
color: #000;






`;

const Box = styled.div`

display: block;
margin: 0 30px 0 30px;
`
    
const BoxImg= styled.div`
display: flex;
flex-direction: row;
align-items: center;

`;

const ContainerButton = styled.div``;

const Username = styled.h2`
font-family: Raleway;
font-size: 28.45px;
font-weight: 400;
color: #000;


`;


const ContainerBooks = styled.div`
display: flex;
flex-direction: row;
max-width: 900px;

`;

const ContainerBooks2 = styled.div`
display: flex;
flex-direction: row;
max-width: 500px;

`;

const ContainerGrid = styled.div`
 display: grid;
 grid-template-columns: 2fr 1fr; 


`;


const User =()=>{
    return(
    
    <>
    <Header/>
    <Background> 
<ContainerGrid>
        <BoxImg>
        <PhotoUser>
            RR
        </PhotoUser>
       <Box>
        <Username>Rockeru</Username>
        <Leiturometro>Leiturômetro: 23445</Leiturometro>
<Bio>As pessoas não compreendem como toda a vida de um homem pode ser mudada por um único livro.</Bio>
  </Box>    
  </BoxImg>
  <ContainerButton>
        <Usersaid>
        <IoIosLogOut size={30}
        color="#000"/>

      sair
        </Usersaid>
        <UserEdit>Editar</UserEdit>
        </ContainerButton>
        </ContainerGrid>

        <ContainerGrid>
        <Box>
<Boxlist>
<TitleList>
    <CiBookmark size={20}color="#000"/>
    já li
    
    </TitleList>
<VerMais>Todos</VerMais>
</Boxlist>
        <Line/>
        <ContainerBooks>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        </ContainerBooks>
</Box>

<Box>
        <Boxlist2>
        
<TitleList>
    <FaStar size={20}color="#000"/>
    Favoritos

</TitleList>
<VerMais>Todos</VerMais>
</Boxlist2>
        <Line2/>
        <ContainerBooks2>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        </ContainerBooks2>
        </Box>
        </ContainerGrid><ContainerGrid>
        <Box>
<Boxlist>
<TitleList>
    <HiOutlineBookOpen size={20}color="#000"/>
    Lendo
    
    </TitleList>
<VerMais>Todos</VerMais>
</Boxlist>
        <Line/>
        <ContainerBooks>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        </ContainerBooks>
</Box>




<Box>
        <Boxlist2>
        
<TitleList>
    <FaStar size={20}color="#000"/>
    Abandonei

</TitleList>
<VerMais>Todos</VerMais>
</Boxlist2>
        <Line2/>
        <ContainerBooks2>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books2 src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        </ContainerBooks2>
        </Box>
        </ContainerGrid>
        <Box>
<Boxlist>
<TitleList>
    <PiBooksLight size={20}color="#000"/>
    Quero ler
    
    </TitleList>
<VerMais>Todos</VerMais>
</Boxlist>
        <Line/>
        <ContainerBooks>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        <Books src="https://i.ibb.co/zSx1DfP/image.png" alt="capa livro"/>
        </ContainerBooks>
</Box>
    </Background>

    </>
    
)
}


export default User;