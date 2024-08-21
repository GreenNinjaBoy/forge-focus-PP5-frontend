import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../pages/contexts/CurrentUserContext';
import { axiosReq } from "../api/axiosDefaults";
import { removeTokenTimestamp } from "../pages/utils/Utils";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from '../styles/MainNavBar.module.css';

const MainNavbar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (currentUser) {
      navigate("/home");
    } else {
      navigate("about");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosReq.get(`/dj-rest-auth/user/`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (!currentUser) {
      fetchUserData();
    }
  },);

  const handleSignout = async () => {
    try {
      await axiosReq.post(`/dj-rest-auth/logout/`);
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate("/about");
    } catch (err) {
      console.log(err);
    }
  };

  const loggedOutLinks = (
    <div className="d-flex justify-content-between w-100">
      <NavLink className={styles.Link} to="/signup">Sign Up</NavLink>
      <NavLink className={styles.Link} to="/signin">Sign In</NavLink>
    </div>
  );

  const loggedInLinks = (
    <div className="d-flex justify-content-between w-100">
      <Nav.Link className={styles.Link} href="/goalsarea">{currentUser ? `Welcome, ${currentUser.username}` : 'goalsarea'}</Nav.Link>
      <Nav.Link className={styles.Link} href="/goalsarea">Goals</Nav.Link>
      <Nav.Link className={styles.Link} onClick={handleSignout} to="/">Sign Out</Nav.Link>
    </div>
  );

  return (
    <Navbar expand="lg" fixed="top" className={styles.Header}>
      <Container fluid>
        <Navbar.Brand onClick={handleLogoClick} className={styles.LogoName}>Forge Focus</Navbar.Brand>
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