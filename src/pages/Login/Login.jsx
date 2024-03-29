import BackgroundBlack from '../../images/background_black.png';
import styled from 'styled-components';
import GlassLogin from '../../components/glassLogin';

const Background = styled.div`
background-image: url(${BackgroundBlack});
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

const Login = () => {
    return (
        <>
        <Background>
        <GlassLogin/>
      </Background>
        </>
    );
};

export default Login;
