import UserContext from '../context/UserContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Cookies from 'universal-cookie';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function UserDropdown() {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const userData = useContext(UserContext)
    //Logout
    const logout = () => {
        cookies.remove("session")
        navigate("/")
        window.location.reload()
        console.log("la borro")
    }
    const [user_name, setUser_name] = useState("")
    useEffect(() => {
        if (userData.user != null) {
            setUser_name(userData.user.user_name)
        }
    }, [userData])
    return (
        <DropdownButton id="dropdown-item-button" title="User">
            {userData ? <Dropdown.ItemText>{user_name}</Dropdown.ItemText> : ""}
            <Dropdown.Item as="button">Mi perfil</Dropdown.Item>
            <Dropdown.Item as="button">Configuración</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => logout()}>Cerrar sesión</Dropdown.Item>
        </DropdownButton>
    );
}

export default UserDropdown;