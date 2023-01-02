import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Link} from "react-router-dom";
import UserDropdown from './user_dropdown';
import logo from '../images/logo-pww-transparente.png';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';


function Navigationbar() {
  const [numNotifications, setNumNotifications] = useState(null)
  const {user} = useContext(UserContext)
  const [load, setLoad] = useState(false)

useEffect(()=>{
  function getNotifs(){
    fetch(`/getUserRequestIn/${user.id}`).then(res=>res.json()).then(res=>{
      console.log(res)
      let notif = res.map((request)=>{
        if(request.req_status == null){
          return request
        }
      })
      if(notif[0] == undefined){
      setNumNotifications(null)
      } else {
        setNumNotifications(notif.length)
      }
    })
  }
  setTimeout(() => {
    getNotifs()
  }, 2000);
},[load])

  return (
   
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}><img src={logo} alt="Logo" className='logoNav'/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/clan"}>Clan</Nav.Link>
            <Nav.Link as={Link} to={"/search"}>Buscar</Nav.Link>
            <Nav.Link as={Link} to={"/uploadimage"}>Subir</Nav.Link>
            <div className='navSpace'></div>
            <UserDropdown numNotifications={numNotifications} setLoad={setLoad}></UserDropdown>{numNotifications > 0 && (
        <span className="badge badge-pill badge-danger">{numNotifications}</span>
      )}
          </Nav>
        </Container>
      </Navbar>
    
  );
}

export default Navigationbar;