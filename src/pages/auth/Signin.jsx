import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../utils/Utils";
import { useRedirect } from "../../hooks/useRedirect";

function SignIn() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = logInData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", logInData);
      setCurrentUser(data.user);
      console.log("user data recieved",data.user);
      if (data && data.access_token) {
        setTokenTimestamp(data);
        console.log("Token timestamp set with data:", data);
      } else {
        console.warn("Data does not contain access_token:", data);
      }
      navigate('/home');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setLogInData({
      ...logInData,
      [event.target.name]: event.target.value,
    });
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
          <Button type="submit">
          SignIn
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;