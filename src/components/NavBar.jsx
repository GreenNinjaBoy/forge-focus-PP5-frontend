import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../hooks/useCurrentUser';
import axios from 'axios';
import styles from '../styles/MainNavBar.module.css';
import { Flame, Menu } from 'lucide-react';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const MainNavbar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignout = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      localStorage.removeItem('refreshTokenTimestamp');
      setCurrentUser(null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogoClick = () => {
    navigate(currentUser ? '/dashboard' : '/');
  };

  const closeNavbar = () => setExpanded(false);

  const loggedInLinks = (
    <>
      <Nav.Link as={NavLink} to="/goalsarea" className={styles.navLink} onClick={closeNavbar}>Goals</Nav.Link>
      <Nav.Link as={NavLink} to="/tasksarea" className={styles.navLink} onClick={closeNavbar}>Tasks</Nav.Link>
      <Nav.Link as={NavLink} to="/contact" className={styles.navLink} onClick={closeNavbar}>Contact Us</Nav.Link>
      {currentUser && currentUser.is_superuser && (
        <Nav.Link as={NavLink} to="/contact-list" className={styles.navLink} onClick={closeNavbar}>Contact List</Nav.Link>
      )}
      <Nav.Link onClick={() => { handleSignout(); closeNavbar(); }} className={styles.navLink}>Sign Out</Nav.Link>
    </>
  );

  const loggedOutLinks = (
    <>
      <Nav.Link as={NavLink} to="/signin" className={styles.navLink} onClick={closeNavbar}>Login</Nav.Link>
      <Nav.Link as={NavLink} to="/signup" className={styles.navLink} onClick={closeNavbar}>Signup</Nav.Link>
      <Nav.Link as={NavLink} to="/contact" className={styles.navLink} onClick={closeNavbar}>Contact Us</Nav.Link>
    </>
  );

  return (
    <Navbar expand="lg" fixed="top" className={styles.Header} expanded={expanded} ref={ref}>
      <Container fluid className={styles.navContainer}>
        <Nav.Link onClick={handleLogoClick} className={styles.LogoName}>
          <span>Forge Focus</span>
          <div className={styles.iconGroup}>
            <Flame size={58} className={`${styles.icon} ${styles.backgroundIcon}`} strokeWidth={2.5} />
          </div>
        </Nav.Link>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        >
          <Menu size={24} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${styles.NavLinks} ms-auto`}>
            {currentUser ? loggedInLinks : loggedOutLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;