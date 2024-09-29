import { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GoalDetails from "../assets/documentation/README-images/goal-details.png";
import styles from "../styles/About.module.css";

/**
 * About component for displaying information about the Forge Focus application.
 * Includes a carousel with informational slides and buttons for navigation to sign up or sign in.
 */

const About = () => {
  // State to manage the active index of the carousel
  const [index, setIndex] = useState(0);
  
  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  // Function to handle carousel slide selection
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.aboutContainer}>
      <header className={styles.aboutHeader}>
        <h1 className={styles.headerTitle}>Forge Focus</h1>
      </header>
      
      <main className={styles.aboutMain}>
        <div className={styles.aboutCarouselContainer}>
          <Carousel activeIndex={index} onSelect={handleSelect} className={styles.carousel}>
            {[
              {
                title: "Welcome",
                content: "When you strive to achieve your goals in life but find it difficult to keep things in order then Forge Focus is the place for you!"
              },
              {
                title: "About Forge Focus",
                content: "Forge Focus provides an area where you can take action and plan. We aim to provide you the user an easy place to which you can create and refine on areas you either wish to achieve or improve on in your day to day life. From here you can create new goal, add tasks and view goals that you have already been aiming to achieve."
              },
              {
                title: "Creating Goals",
                content: "By creating areas of refinement, you the user can define and separate all the different areas of your life that you wish to focus on and refine. With each goal, you can then set tasks within that goal to help you achieve."
              }
            ].map((item, idx) => (
              <Carousel.Item key={idx} className={styles.carouselItem}>
                <img
                  src={GoalDetails}
                  alt={`Slide ${idx + 1}`}
                  className={styles.carouselImage}
                />
                <Carousel.Caption className={styles.carouselCaption}>
                  <h3 className={styles.carouselTitle}>{item.title}</h3>
                  <p className={styles.carouselContent}>{item.content}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        
        <div className={styles.aboutSignupContainer}>
          <div className={styles.signupSection}>
            <h3 className={styles.signupTitle}>If you wish to be a member and start forging a path to achieve your goals please click the Signup button below</h3>
            <Button onClick={() => navigate('/Signup')} className={styles.signupButton}>Sign Up</Button>
          </div>
          <div className={styles.signinSection}>
            <h3 className={styles.signinTitle}>If you are already a member?</h3>
            <Button onClick={() => navigate('/Signin')} className={styles.signinButton}>Sign In</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;