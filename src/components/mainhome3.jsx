import styled from'styled-components';
import { PiQuotes } from "react-icons/pi";


const IconWrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
`;

const StyledPiQuotes = styled(PiQuotes)`
  position: absolute;
  top: 80%;
  right: 21px; 
  color: #D0A460; 
`;

const Box = styled.div`
width: 100%;
max-width: 350px;
height: 150px;
border-radius: 60px;
background-color: rgba(255, 255, 255, 0.15);
backdrop-filter:blur(8.5px);
`;

const Imgperson= styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
margin-left: 20px;
`;


const Titulo = styled.h2`
font-family: Raleway;
font-size: 27px;
font-weight: 600;
color: #D0A460;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 0px 20px 0px;
padding-top: 20px;
`;

const Name= styled.h2`
font-family: Raleway;
font-size: 14px;
font-weight: 800;
color: #1C1D20;
margin-right: 5px;

`;

const Text = styled.h2`
font-family: Raleway;
font-size: 14px;
font-weight: 5800;
color: #1C1D20;
margin-right: 5px;

`;

const Coment = styled.h2`
font-family: Raleway;
font-size: 15px;
font-weight: 500;
color: #D0A460;
white-space: pre-wrap;


`;

const Comentario = styled.p`
color:  #1C1D20;
font-family: Raleway;
font-size: 12px;
font-weight: 400;
margin-left: 10px; 

`;

const Conteinerheader = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 10px;

white-space: pre-wrap;
`;


const Conteiners = styled.div`
display: flex;
align-items: center;
justify-content: space-around;

`;


const MainHome3 =()=>{
    return(
        <>
        <Titulo>Cometarios</Titulo>
        
    <Conteiners>
        <Box>
            
        <Conteinerheader>
       <Imgperson src='https://i.ibb.co/pR871HG/nega.jpg' alt='pessoas fotos'/>
       <Name>Dandara</Name>
       <Text>comentou</Text>
       <Coment>Anne de Green Gables</Coment>
        </Conteinerheader>
         <PiQuotes size={25} color='#D0A460' style={{ transform: 'rotate(180deg)' }}/> 
        <IconWrapper>
         <Comentario>Este livro é um clássico atemporal que encanta 
leitores de todas as idades. A história de Anne Shirley é comovente e inspiradora, e nos lembra da importância de sonhar e acreditar em nós mesmos</Comentario>
       </IconWrapper>
       <StyledPiQuotes size={25} />
        </Box>

        <Box>
            
            <Conteinerheader>
           <Imgperson src='https://i.ibb.co/XzVkcXF/men.jpg' alt='pessoas fotos'/>
           <Name>Gabriel</Name>
           <Text>comentou</Text>
           <Coment>1984</Coment>
            </Conteinerheader>
             <PiQuotes size={25} color='#D0A460' style={{ transform: 'rotate(180deg)' }}/> 
            <IconWrapper>
             <Comentario>Este livro é um clássico atemporal que encanta 
    leitores de todas as idades. A história de Anne Shirley é comovente e inspiradora, e nos lembra da importância de sonhar e acreditar em nós mesmos</Comentario>
           </IconWrapper>
           <StyledPiQuotes size={25} />
           </Box>

           <Box>
            
            <Conteinerheader>
           <Imgperson src='https://i.ibb.co/1fY0xCY/japones.jpg' alt='pessoas fotos'/>
           <Name>Luciano</Name>
           <Text>comentou</Text>
           <Coment>Habitos Atomicos</Coment>
            </Conteinerheader>
             <PiQuotes size={25} color='#D0A460' style={{ transform: 'rotate(180deg)' }}/> 
            <IconWrapper>
             <Comentario>Este livro é um clássico atemporal que encanta 
    leitores de todas as idades. A história de Anne Shirley é comovente e inspiradora, e nos lembra da importância de sonhar e acreditar em nós mesmos</Comentario>
           </IconWrapper>
           <StyledPiQuotes size={25} />
           </Box>
           </Conteiners>
        </>
    )
}

export default MainHome3;