import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MocoBonito from "../../../public/images/img1.png";
import styled from "styled-components";

const Conteiner = styled.div`
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  position: relative;
  height: 50vh;
`;

const Conteinercoment = styled.div`
  width: 400px;
  height: 150px;
  border-radius: 20px;

  background-color: #fff;
  border: none;
`;

const Imgfoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Title = styled.h2`
  font-family: Raleway;
  font-size: 40px;
  font-weight: 300;

  color: #000;
`;

const Ball = styled.div`
  background-color: rgba(208, 164, 96, 0.6);
  border-radius: 50%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const LargeBall = styled(Ball)`
  width: 150px;
  height: 150px;
  position: absolute;
  top: 20px;
  left: -90px;
`;

const MediumBall = styled(Ball)`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 70px;
  right: 10px;
`;

const SmallBall = styled(Ball)`
  width: 50px;
  height: 50px;
  position: absolute;
 
  left: 30%;
  transform: translateX(-50%);
`;

const BabyBall = styled(Ball)`
  width: 50px;
  height: 50px;
  position: absolute;
 bottom: 30%;
  left: 30%;
  transform: translateX(-50%);
`;


const Divname = styled.div`
  margin-left: 10px;
`;

const Divphoto = styled.div`
  display: flex;
  justify-content: space-around;
padding-top: 15px;
`;

const NamePerson = styled.h2`
  font-family: Raleway;
  font-size: 15px;
  font-weight: 400;
  color: #000;
`;

const Coment = styled.h3`
  width: 300px;
  font-family: Raleway;
  font-size: 13px;
  font-weight: 200;
`;

const Namebook = styled.h2`
  color: #d0a460;
  font-family: Raleway;
  font-size: 15px;
  font-weight: 200;
`;

const Center = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
 margin-bottom: 10px;
`;


const Divstar = styled.div`
  display: flex;
  flex-direction: row;
`;

const DivPhotoName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Star = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffff00;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  border-radius: 50%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Button = styled.button`
   background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }

  &.left {
    left: 80px;
  }

  &.right {
    right: 80px;
  }
`;

const Line = styled.span`
  display: block;
  width: 80%;
  height: 1px;
  background-color: black;
`;

const MainHome4 = () => {
  return (
    <>
      <Conteiner>
        <Title>Comentarios</Title>
        <LargeBall />
        <MediumBall />
        <BabyBall/>
        <SmallBall />
        <Button className="left">
          <IoIosArrowBack color="#000" size={30} />
        </Button>
        <Conteinercoment>
          <Divphoto>
            <DivPhotoName>
              <Imgfoto src={MocoBonito} alt="foto de perfil" />
              <Divname>
                <NamePerson>Rita lee</NamePerson>
                <Namebook>Habitos Atomicos</Namebook>
              </Divname>
            </DivPhotoName>
            <Divstar>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Divstar>
          </Divphoto>
          <Center>
          <Line />
          <Coment>
            Este livro é um clássico atemporal que encanta leitores de todas as
            idades. A história de Anne Shirley é comovente e inspiradora, e nos
            lembra da importância de sonhar e acreditar em nós mesmos
          </Coment></Center>
        </Conteinercoment>
        <Button className="right">
          <IoIosArrowForward color="#000" size={30} />
        </Button>
      </Conteiner>
    </>
  );
};

export default MainHome4;
