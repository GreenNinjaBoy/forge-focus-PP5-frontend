import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../pages/contexts/CurrentUserContext';
import axios from "axios";
import { removeTokenTimestamp } from "../pages/utils/Utils";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";

const MainNavbar = () => {
        
        const [user, setUser] = useState(null);

        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`/user/`);
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error)
                }
            };
            fetchUserData();
        }, []);

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignout = async () => {
        try {
            await axios.post(`dj-rest-auth/logout/`);
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch(err) {
            console.log(err)
        }
    }

    const loggedOutLinks = (
        <>
        <NavLink to="/Signup">SignUp</NavLink>
        <NavLink to="/Signin">SignIn</NavLink>
        </>
    );

    const LoggedInLinks = (
        <>
        <Nav.Link href="#action1">{user ? `Welcome, ${user.name}` : 'Home'}</Nav.Link>
        <Nav.Link onClick={handleSignout} to="/">Sign Out</Nav.Link>
        <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search Goals"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
        </>
    )

    return (
        <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">Forge Focus</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                {currentUser ? (LoggedInLinks) : (loggedOutLinks)}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default MainNavbar