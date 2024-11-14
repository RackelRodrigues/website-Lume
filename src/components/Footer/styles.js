import styled from'styled-components';

export const Background = styled.div`
background-color: #1C1D20;
margin-top: 50px;

`;

export const LogoImg = styled.img`
width: 50px;
height: 50px;
border-radius: 10px;
`;

export const Box = styled.div`
width: 100%;
height: 400px;
background-color:#D9D9D9;


`;

export const TextLogo = styled.h3`
font-family: Raleway;
font-size: 20px;
font-weight: 200;
color: #000;
margin-left: 10px;

`;

export const ConteinerLogo = styled.div`
display: flex;
align-items: center;
margin-bottom: 30px;
`;

export const ConteinerButtons = styled.div`
display: flex;
align-items: center;
flex-direction: row;
margin-bottom: 10px;
`;

export const ButtonSvg = styled.button`
background-color: #C084FC;
border-radius: 50%;
width: 40px;
height: 40px;
border: 0;
display: flex;
align-items: center;
justify-content: center;
margin-right: 10px;
&:hover {
    background-color: #A166D6; 
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
  }
`;
export const Input = styled.input`
background-color:transparent;
padding-left: 12px;
width: 100%;
height: 100%;
border: 0;
outline: none;
font-family: Raleway;
font-size: 15px;
font-weight: 200;


`;

export const Conteiner = styled.div`
width: 390px;
height: 40px;
background-color: #fff;
border-radius: 18px;
display: flex;
align-items: center;
justify-content: flex-end;
`;

export const Button = styled.button`
width: 30px;
height: 30px;
border-radius: 50%;
color: #000;
background-color: #C084FC;
border: none;
display: flex;
align-items: center;
justify-content: center;
margin-right: 5px;
margin-left: 10px;
cursor: pointer;
`;

export const Linha = styled.div`
  border-bottom: 1px solid #4b5563; 
  margin: 10px 0; 
  width: 1430px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Titulos = styled.h2`
font-family: Raleway;
font-size: 18px;
font-weight: 600;
cursor: pointer;
color: #000;

`;

export const BoxNames = styled.div`
display: block;
margin-right: 30px;
`;

export const BoxAllnames=styled.div`
display: flex;
flex-direction: row;
grid-column: 2; 
justify-self: end;
margin-right: 20px;
`;

export const Subnames = styled.p`
font-family: Raleway;
font-size: 14px;
font-weight: 300;
color: #000;
margin-top: 20px;
cursor: pointer;

`;

export const Text = styled.p`
font-family: Raleway;
font-size: 18px;
font-weight: 300;
font-family: Raleway;
width: 320px;
margin-bottom: 40px;

`;

export const Purple = styled.span`
color: #C084FC;
font-family: Raleway;
font-size: 18px;
font-weight: 300;

`;

export const Nameline = styled.p`
font-family: Inter;
font-size: 15px;
font-weight: 100;
color: #4b5563;
line-height: 18px;


`;

export const Conteinernames = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 1400px;

`;

export const Boxline = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

`;

export const Conteinergrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
padding-top: 30px;
margin: 0 0 60px 25px;
`;

export const Conteinerleft= styled.div`
grid-column: 1;

`;