import Header from "../../components/header";
import styled from 'styled-components';


const Background = styled.div`
background-color: #1C1D20;
height: 100vh;

`;
const Button = styled.button``;

const H1 = styled.h1``;

const H3 = styled.h3``;


const Errorpage = ()=>{
    return(
        <>
        <Background>
        <Header/>
        </Background>
        </>
    )
}

export default Errorpage;