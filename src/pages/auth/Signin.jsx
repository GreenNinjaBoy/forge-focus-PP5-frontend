import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import { useSetCurrentUser } from "../../hooks/useCurrentUser";
import { setTokenTimestamp } from "../../utils/Utils";

function SignIn() {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Attempting to sign in with:', signInData);
      const response = await axiosRes.post("/dj-rest-auth/login/", signInData);
      console.log('Full sign-in response:', response);
      console.log('Sign-in response data:', response.data);
      setCurrentUser(response.data.user);
      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
      }
      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      } else {
        console.warn('Refresh token not received in the response');
      }
      navigate("/");
    } catch (err) {
      console.error("Sign-in error:", err);
      console.error("Error response:", err.response);
      setErrors(err.response?.data || {});
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </Form.Group>

      {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </Form>
  );
}

export default SignIn;