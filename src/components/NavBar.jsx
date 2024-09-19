import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../hooks/useCurrentUser';
import styles from '../styles/MainNavBar.module.css';

const MainNavbar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const handleSignout = () => {
    // Sign out logic here
    setCurrentUser(null);
    navigate('/');
  };

  const handleLogoClick = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const loggedInLinks = (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Menu
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to="/goalsarea">Goals</Dropdown.Item>
        <Dropdown.Item as={NavLink} to="/tasksarea">Tasks</Dropdown.Item>
        <Dropdown.Item as={NavLink} to="/contact">ContactUs</Dropdown.Item>
        <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const loggedOutLinks = (
    <Nav.Item>
    <Nav.Link as={NavLink} to="/signin">Login</Nav.Link>
    <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
    <Nav.Link as={NavLink} to="/contact">ContactUs</Nav.Link>
    </Nav.Item>

  );

  return (
    <Navbar expand="lg" fixed="top" className={styles.Header}>
      <Container fluid>
        <Nav.Link onClick={handleLogoClick} className={styles.LogoName}>Forge Focus</Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className={`${styles.NavLinks} me-auto my-2 my-lg-0`}
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {currentUser ? loggedInLinks : loggedOutLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;