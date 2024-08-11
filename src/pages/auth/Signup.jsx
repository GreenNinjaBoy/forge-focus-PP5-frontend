import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [signupData, setSignUpData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });

    const { username, email, password1, password2 } = signupData;

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setSignUpData({
            ...signupData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signupData);
            navigate('/signin');
        } catch (err) {
            setErrors(err.response ? err.response.data || {} : {});
        }
    };

    return (
        <div>
            <div>
                <h1>Get signed up!</h1>
            </div>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password1">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password1"
                            value={password1}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password2">
                        <Form.Label>Confirm password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            name="password2"
                            value={password2}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button type="submit">
                        Sign up
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;