import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from "../api/axiosDefaults";
import { removeTokenTimestamp } from "../pages/utils/Utils";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import styles from '../styles/MainNavBar.module.css';

const MainNavbar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (currentUser) {
      navigate("/home");
    } else {
      navigate("/about");
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
  }, [currentUser, setCurrentUser]);

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
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.Link}>
        {currentUser ? `${currentUser.username}` : 'User'}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.Link}>
        <Dropdown.Item as={NavLink} to="/home">Home</Dropdown.Item>
        <Dropdown.Item as={NavLink} to="/goalsarea">Goals</Dropdown.Item>
        <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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