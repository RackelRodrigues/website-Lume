import styled from "styled-components";
import GlassCriar from '../../components/GlassCriar1/glassCriar';
import BackgroundBlue from "../../../public/images/background_blue.png";

const Background = styled.div`
background-image: url(${BackgroundBlue});
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


const CriarConta =()=>{
    return(
        <>
        <Background>
         <GlassCriar/>
        </Background>
        </>
    )
}

export default CriarConta;