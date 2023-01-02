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
    const { user, setUser } = useContext(UserContext)

    //Logout
    const logout = () => {
        removeCookie("session", { path: '/' })
        navigate("/")
        setUser("")
    }
    useEffect(() => {
        setUser(user)
    })

    return (

        <Dropdown alignRight>
            <DropdownButton id="dropdown-basic" title="Menu">
                    {user && <Dropdown.ItemText className='itemText dropdown-item-right'>{user.user_name}</Dropdown.ItemText>}

                    <Dropdown.Item as="button" className='dropdown-item-right'>Mi perfil</Dropdown.Item>
                    <Dropdown.Item as="button" className='dropdown-item-right'><ModalReq numNotifications={props.numNotifications} setLoad={props.setLoad}></ModalReq></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => logout()} className='dropdown-item-right'>Cerrar sesión</Dropdown.Item>
            </DropdownButton>
        </Dropdown>
    );
}

export default UserDropdown;