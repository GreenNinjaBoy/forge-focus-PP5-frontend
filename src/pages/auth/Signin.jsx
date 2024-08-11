import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../utils/Utils";

function SignIn() {
    const navigate = useNavigate();
    const setCurrentUser = useSetCurrentUser();
    const [signInData, setSignInData] = useState({ username: '', password: '' });
    const [error, setErrors] = useState({});

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(`/dj-rest-auth/login/`, signInData);
            setCurrentUser(data.user);
            const accessToken = data.access_token; // Extract access token
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                setTokenTimestamp(accessToken); // Pass the token to setTokenTimestamp
            } else {
                console.error('Access token is missing in the response');
            }
            navigate('/goals'); // Corrected navigation
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data || {});
        }
    };

    return (
        <div>
            <h1>Sign into your account</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        value={signInData.username}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={signInData.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit">
                    SignIn
                </Button>
            </Form>
        </div>
    );
}

export default SignIn;