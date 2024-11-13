import Header from "./components/Header/header";
import MainHome1 from "./components/mainhomes/mainhome1";
import MainHome2 from "./components/mainhomes/mainhome2";
import MainHome3 from "./components/mainhomes/mainhome3";
import Footer from "./components/Footer/Footer";
import { GlobalStyle, Background, Background2, ContentWrapper } from "./App";

function App() {
  return (
    <>
      <GlobalStyle>
        <Background>
          <Header />
          <ContentWrapper>
            <MainHome1 />
          </ContentWrapper>
        </Background>
        <MainHome2 />
        <Background2>
          <MainHome3 />
        </Background2>
        <Footer />
      </GlobalStyle>
    </>
  );
}

export default App;
