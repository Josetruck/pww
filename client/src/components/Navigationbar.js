import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Link} from "react-router-dom";
import UserDropdown from './user_dropdown';

function Navigationbar() {
  return (
   
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>Pictures World Wide</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/clan"}>Clan</Nav.Link>
            <Nav.Link as={Link} to={"/search"}>Buscar</Nav.Link>
            <UserDropdown/>
          </Nav>
        </Container>
      </Navbar>
    
  );
}

export default Navigationbar;