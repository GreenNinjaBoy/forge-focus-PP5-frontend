import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>WELCOME TO FORGE FOCUS</h1>
            <Button onClick={() => navigate('/Signin')}>Sign In</Button>
            <Button onClick={() => navigate('/Signup')}>Sign Up</Button>
        </div>
    );
}

export default About;