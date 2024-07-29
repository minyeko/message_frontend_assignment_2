import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function TopBar() {
    const { auth, logout } = useContext(AuthContext);
    debugger;

    const userName = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Maungawhau Institute of Studies</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/chatroom">Privacy</Nav.Link>
                        <NavDropdown title="Programs" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="d-flex">
                        {(token !== "") ? (
                            <NavDropdown title={userName || 'User'} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                    <Nav.Link href="/register">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopBar;
