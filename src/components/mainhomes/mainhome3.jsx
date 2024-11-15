import styled from "styled-components";
import group from "../../../public/images/Group-pessoal.svg";
import Present from "../../../public/images/PresenteHomem.svg";
import MeninaVoando from "../../../public/images/MeninaVoando.svg";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";

const ConteinerAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 50vh;
  margin-bottom: 20px;
`;

const Conteiner = styled.div`
  width: 300px;
  height: 300px;
  ${(props) =>
    props.Colors === "purple"
      ? "background-color: #C084FC;"
      : "background-color: #e1c28a;"}
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
 
`;

const ConteinerHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 280px;
  margin-top: 8px;
`;

const Divlink = styled.div`
  width: 110px;
  height: 25px;
  background-color: #fff;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`;

const Name = styled.a`
  font-family: Raleway;
  font-size: 15px;
  font-weight: 200;

  color: #000;
  margin-left: 8px;
`;

const Circlesvg = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

const ConteinerPoint = styled.div`
  width: 30px;
  height: 13px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const MainHome3 = () => {
  return (
    <>
      <ConteinerAll>
        <Conteiner Colors="purple">
          <ConteinerHeader>
            <Divlink>
              <Name>Serviços</Name>

              <Circlesvg>
                <GoArrowUpRight />
              </Circlesvg>
            </Divlink>
            <ConteinerPoint>
              <IoEllipsisHorizontalSharp size={20} />
            </ConteinerPoint>
          </ConteinerHeader>
          <Img src={MeninaVoando} alt="menina em cima de livro" />
        </Conteiner>

        <Conteiner>
          <ConteinerHeader>
            <Divlink>
              <Name>Produtos</Name>

              <Circlesvg>
                <GoArrowUpRight />
              </Circlesvg>
            </Divlink>

            <ConteinerPoint>
              <IoEllipsisHorizontalSharp size={20} />
            </ConteinerPoint>
          </ConteinerHeader>
          <Img src={Present} alt="presente com rapaz" />
        </Conteiner>
        <Conteiner Colors="purple">
          <ConteinerHeader>
            <Divlink>
              <Name>Sobre nos</Name>

              <Circlesvg>
                <GoArrowUpRight />
              </Circlesvg>
            </Divlink>
            <ConteinerPoint>
              <IoEllipsisHorizontalSharp size={20} />
            </ConteinerPoint>
          </ConteinerHeader>
          <Img src={group} alt="Uma pessoal ai" />
        </Conteiner>
      </ConteinerAll>{" "}
    </>
  );
};

export default MainHome3;
