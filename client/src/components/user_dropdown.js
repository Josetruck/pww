import UserContext from '../context/UserContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ModalReq from './ModalReq';



function UserDropdown(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    //Logout
    const logout = () => {
        removeCookie("session",{ path: '/' })
        navigate("/")
        setUser(null)
    }
    useEffect(()=>{
        setUser(user)
    })
    
    return (
        <DropdownButton id="dropdown-item-button" title="User">

            {user &&<Dropdown.ItemText>{user.user_name}</Dropdown.ItemText> }
            
            <Dropdown.Item as="button">Mi perfil</Dropdown.Item>
            <Dropdown.Item as="button"><ModalReq numNotifications={props.numNotifications} setLoad={props.setLoad}></ModalReq></Dropdown.Item>
           
            <Dropdown.Item as="button" onClick={() => logout()}>Cerrar sesión</Dropdown.Item>
            
        </DropdownButton>
    );
}

export default UserDropdown;