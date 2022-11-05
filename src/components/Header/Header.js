import "./Header.css";
import { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Fragment>
      <Navbar className="custom-navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid className="header-container">
          <Link to="/" className="btn btn-outline-primary main-page-link">Fridge</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="custom-navbar" id="responsive-navbar-nav">
            <Nav className="me-auto">
              
            </Nav>
            <Nav>            
            <Link to="/SignIn" className="nav-link">Sign In</Link>
            <Link to="/SignUp" className="nav-link">Sign Up</Link>              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>      
    </Fragment>
  );
}
