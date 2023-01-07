import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Link } from "react-router-dom";
import UserDropdown from './user_dropdown';
import logo from '../images/logo-pww-transparente.png';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUpload, faRankingStar } from '@fortawesome/free-solid-svg-icons';



function Navigationbar(props) {
  const [numNotifications, setNumNotifications] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    function getNotifs() {
      fetch(`/getUserRequestIn/${user.id}`).then(res => res.json()).then(res => {
        let notif = res.filter((request) => {
          if (request.req_status === "progress") {
            return request
          }
        })
        if (notif[0] == undefined) {
          setNumNotifications(null)
        } else {
          setNumNotifications(notif.length)
        }
      })
    }
    getNotifs();
    setTimeout(() => {
      getNotifs()
    }, 5000);
  })


  return (

    <Navbar bg="dark" variant="dark" id='navBar'>
      <Container>
        <Navbar.Brand as={Link} to={"/"}><img src={logo} alt="Logo" className='logoNav' /></Navbar.Brand>
        <Nav className="me-auto">
        
          <Nav.Link as={Link} to={"/uploadimage"}><FontAwesomeIcon icon={faUpload} className='iconNav'/></Nav.Link>
          <Nav.Link as={Link} to={"/clan"}><FontAwesomeIcon icon={faRankingStar} className='iconNav'/></Nav.Link>
          <Nav.Link as={Link} to={"/search"}><FontAwesomeIcon icon={faSearch} className='iconNav'/></Nav.Link>
       
        </Nav>
          <UserDropdown numNotifications={numNotifications} setLoad={props.setLoad} className="ml-auto">
          </UserDropdown>
      </Container>
    </Navbar>

  );
}

export default Navigationbar;