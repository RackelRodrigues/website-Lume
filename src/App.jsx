import './App.css'
import Header from './components/header';
import MainHome1 from './components/mainhome1';
import MainHome2 from './components/mainhome2';
import MainHome3 from './components/mainhome3';
import Footer from './components/Footer';
import styled from 'styled-components'


const Background = styled.div`
background-color: #1C1D20;
height: 100vh;

`;


const Background2 = styled.div`
background-color: #1C1D20;
height: 45vh;
display: flex;

flex-direction: column;
justify-content: center;
`;

const ContentWrapper = styled.div`
  padding-top: 150px; 
`;


function App() {
 
  return (
    <>
    <Background>
    <Header/>
    <ContentWrapper>
    <MainHome1/>
    </ContentWrapper>
    </Background>
    <MainHome2/>
    <Background2>
    <MainHome3/>
    </Background2>
    <Footer/>
    </>
  )
}

export default App
