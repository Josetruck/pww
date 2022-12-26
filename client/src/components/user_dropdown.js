import { UserContext } from '../App';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function UserDropdown() {
    return (
        <DropdownButton id="dropdown-item-button" title="User">
            <Dropdown.ItemText>
                <UserContext.Consumer>
                {(userData) => {
                    console.log(userData)
                return <div>{userData.user_name}</div>
                }}
                </UserContext.Consumer>
            </Dropdown.ItemText>
            <Dropdown.Item as="button">Mi perfil</Dropdown.Item>
            <Dropdown.Item as="button">Configuración</Dropdown.Item>
            <Dropdown.Item as="button">Cerrar sesión</Dropdown.Item>
        </DropdownButton>
    );
}

export default UserDropdown;