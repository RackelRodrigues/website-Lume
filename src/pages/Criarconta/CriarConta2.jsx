import Glasscriar2 from "../../components/GlassCriar2";
import styled from "styled-components";
import BackgroundBluee from "../../images/background_blue.png";

const Background = styled.div`
background-image: url(${BackgroundBluee});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
overflow: hidden;
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`;

const CriarConta2 = ()=>{
    return(
        <>
        <Background>
        <Glasscriar2/>
        </Background>
       
        </>
    )
}

export default CriarConta2;