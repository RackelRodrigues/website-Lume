import styled from "styled-components";
import Header from "../../components/header";
import { IoIosLogOut } from "react-icons/io";



const Background = styled.div`
background-color: #1C1D20;
height: 100vh;

`;

const Books = styled.img`
width: 100px;
height: 150px;



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


const Leiturometro = styled.h3`
font-family: Raleway;
font-size: 13.17px;
font-weight: 400;
color: #fff;


`;


const Username = styled.h2`
font-family: Raleway;
font-size: 28.45px;
font-weight: 400;
color: #fff;


`;

const User =()=>{
    return(
    
    <>
    <Header/>
    <Background>
        <PhotoUser>
            RR
        </PhotoUser>
        <Username>Rockeru</Username>
        <Leiturometro>leurotn: 23445</Leiturometro>

        <Usersaid>
        <IoIosLogOut size={30}
        color="#000"/>

      sair
        </Usersaid>
    </Background>

    </>
    
)
}


export default User;