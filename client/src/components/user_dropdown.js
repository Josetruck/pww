import UserContext from '../context/UserContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ModalReq from './ModalReq';
import Badge from 'react-bootstrap/esm/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ModalFriends from './ModalFriends';



function UserDropdown(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const setLoad = props.setLoad

    //Logout
    const logout = () => {
        removeCookie("session", { path: '/' })
        navigate("/")
        setUser(null)
        setLoad(false)
    }
    useEffect(() => {
        setUser(user)
    })

    return (

        <Dropdown>
            <Badge pill bg="danger" className='badgeNotif'>{props.numNotifications}</Badge>
            <DropdownButton
                title={<FontAwesomeIcon icon={faBars}/>}
                align="end"
                id="dropdown-menu-align-end"> 
                <div className='dropdown-menu-right'>
                    {user && <Dropdown.ItemText className='itemText dropdown-menu-right'>{user.user_name}</Dropdown.ItemText>}

                    <Dropdown.Item as="button" className='dropdown-menu-right'><ModalFriends/></Dropdown.Item>
                    <Dropdown.Item as="button" className='dropdown-menu-right'><ModalReq numNotifications={props.numNotifications} setLoad={props.setLoad}></ModalReq></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => logout()} className='dropdown-menu-right'>Cerrar sesión</Dropdown.Item>
                </div>
            </DropdownButton>
        </Dropdown>
    );
}

export default UserDropdown;