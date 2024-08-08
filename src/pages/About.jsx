import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>WELCOME TO FORGE FOCUS</h1>
            <Button onClick={() => navigate('/auth/Signin')}>Sign In</Button>
            <Button onClick={() => navigate('/auth/Signup')}>Sign Up</Button>
        </div>
    );
}

export default About;