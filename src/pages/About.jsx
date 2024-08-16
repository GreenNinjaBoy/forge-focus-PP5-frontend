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
                    <h1>Welcome to Forge Focus</h1>
                </div>
                <Carousel activeIndex={index} onSelect={handleSelect} >
                    <Carousel.Item>
                        <img src={ExampleCarouselImage} alt="First slide" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={ExampleCarouselImage} alt="Second slide" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={ExampleCarouselImage} alt="Third slide" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div>
                    <h3>If you wish to be a member and start forging a path to achieve your goals please click the "Signup" button below</h3>
                    <Button onClick={() => navigate('/Signup')}>Sign Up</Button>
                </div>
            </div>
        );
    }

export default About;