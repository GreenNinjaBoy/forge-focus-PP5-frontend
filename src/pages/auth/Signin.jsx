import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../utils/Utils";

function SignIn() {

  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = signInData;

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted'); // Log form submission
    try {
      const { data } = await axios.post('/dj-rest-auth/login/', signInData);
      console.log('Login successful', data); // Log successful login
      setCurrentUser(data.user);
      setTokenTimestamp(data); // Ensure the correct token is passed
      console.log('Navigating to /home');
      navigate('/home'); // Corrected navigation method
    } catch (err) {
      console.log('Login error', err); // Log any errors
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      <h1>Sign into your account</h1>
      <Form onSubmit={handleSubmit} >
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
          <Button type="submit" onSubmit={handleSubmit}>
          SignIn
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;