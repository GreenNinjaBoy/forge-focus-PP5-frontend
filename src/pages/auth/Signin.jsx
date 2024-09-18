import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser, useCurrentUser } from "../../hooks/useCurrentUser";
import { setTokenTimestamp } from "../../utils/Utils";
import { useRedirect } from "../../hooks/useRedirect";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";

function SignIn() {
  const setCurrentUser = useSetCurrentUser();
  const currentUser = useCurrentUser();
  useRedirect("loggedIn", currentUser);

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

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
      setTokenTimestamp(data);
      setGlobalSuccessMessage("You are now signed in.");
      setShowGlobalSuccess(true);
      navigate("/home");
    } catch (err) {
      setErrors(err.response?.data || {});
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
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>

        {errors.password && errors.password.map((message, idx) => (
          <Alert key={idx}>
            {message}
          </Alert>
        ))}

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
          Sign In
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;