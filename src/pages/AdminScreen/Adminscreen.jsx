import { FaArrowLeft } from "react-icons/fa6";
import { PiHouse } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";


const Background = styled.div`
background-color: #1C1D20;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;

`;

const HeaderAdmin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
 width: 100%;
 height: 50px;
  background-color: #1C1D20;
  color: white;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  
 
`;

const ButtonSvg = styled.div`
background-color: transparent;
cursor: pointer;
border: 0;
width: 25px;
height: 25px;

`;

const Conteiner = styled.div`
width: 1178px;
height: 90px;
border-radius: 10px;
background-color: #362F31;
margin-top: 30px;

`;



const Titulo = styled.h2`
font-family: Raleway;
font-size: 35px;
font-weight: 400;
color: #A3B1A9;

display: flex;
justify-content: center;
margin-top: 90px;

`;

const NameEmail = styled.p`
font-family: Raleway;
font-size: 20px;
font-weight: 200;
margin-left: 15px;
display: flex;
align-items: center;


color: ${(props) => props.color};
`;

const ButtonAdmin = styled.button`
width: 120px;
height: 40px;
border-radius: 10px;
background-color: #C084FC;
color: #000;
border: 0;
cursor: pointer;
margin: 0 25px 0 30px;
background-color: #C084FC;
transition: background-color 0.3s ease;

&:hover {
background-color: #A080FF;
cursor: pointer;
}
`;

const ConteinerButtons = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;

`;

const ButtonDelete = styled.button`
width: 120px;
height: 40px;
border-radius: 10px;
background-color:#D0A460;
color: #000;
border: 0;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;

&:hover {
background-color: #E0C080;
cursor: pointer;
}
`;

const AdminScreen = () =>{

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin', {
                   
                    headers: {
                        withCredentials: true,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:5000/admin',
                    }
                });
                document.cookie = `access_token=${access_token}; Secure; SameSite=None`;
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Handle error
            }
        };
        fetchUsers();
    }, []);

    const navegate = useNavigate();
    const handletoBack = () => {
        navegate('/login')
    };
    const handletohome = () => {
        navegate('/')
        
    };
    
    return(
        <>
         <HeaderAdmin>
            <ButtonSvg onClick={handletoBack}>
            <FaArrowLeft size={30} color="#fff"/></ButtonSvg>
            <ButtonSvg onClick={handletohome}>
            <PiHouse size={30} color="#fff"/></ButtonSvg>

        </HeaderAdmin>
        <Background>
       
            <Titulo>Gerenciamento de Admin</Titulo>
            <Conteiner>
                    {users.map(user => (
                        <div key={user.email}>
                            <NameEmail color="#C084FC">{user.email}</NameEmail>
                            <ConteinerButtons>
                                <ButtonDelete onClick={() => handleDeleteUser(user.email)}>
                                    <FaRegTrashCan size={20} color="#000" />
                                    Excluir
                                </ButtonDelete>
                                <ButtonAdmin onClick={() => handleToggleAdmin(user.email, user.is_admin)}>
                                    {user.is_admin ? 'Remover Admin' : 'Tornar Admin'}
                                </ButtonAdmin>
                            </ConteinerButtons>
                        </div>
                    ))}
                    </Conteiner>
        </Background>
        </>
    )
}


export default AdminScreen;