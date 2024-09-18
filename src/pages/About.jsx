import { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExampleCarouselImage from "../assets/ExampleCarouselImage.jpg"

const About = () => {

    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
        };

        return (
            <div>
                <div>
                    <h1>Forge Focus</h1>
                </div>
                <Carousel activeIndex={index} onSelect={handleSelect} >
                    <Carousel.Item>
                        <img src={ExampleCarouselImage} alt="First slide" />
                        <Carousel.Caption>
                            <h3>Welcome</h3>
                            <p>When you strive to achieve your goals in life but find it difficult to keep things in order then Forge Focus is the place for you!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={ExampleCarouselImage} alt="Second slide" />
                        <Carousel.Caption>
                            <h3>About Forge Focus</h3>
                            <p>Forge Focus provides an area where you can take action and plan.</p>
                            <p>We aim to provide you the user an easy place to which you can create and refine on areas you either wish to achieve or improve on in your day to day life</p>
                            <p>From here you can create new goal, add tasks and view goals that you have already been aiming to achieve</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={ExampleCarouselImage} alt="Third slide" />
                        <Carousel.Caption>
                            <h3>Creating Goals</h3>
                            <p>By creating areas of refinement, you the user can define and seperate all the different areas of your life that you wish to focus on and refine.</p>
                            <p>With each goal, you can then set tasks within that goal to help you achieve</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div>
                    <h3>If you wish to be a member and start forging a path to achieve your goals please click the Signup button below</h3>
                    <Button onClick={() => navigate('/Signup')}>Sign Up</Button>
                </div>
                <div>
                    <h3>If you are already a member head to the Signin Area</h3>
                    <Button onClick={() => navigate('/Signin')}>Sign Up</Button>
                </div>
            </div>
        );
    }

export default About;