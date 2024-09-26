import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser, useCurrentUser } from "../../hooks/useCurrentUser";
import { setTokenTimestamp } from "../../utils/Utils";
import { useRedirect } from "../../hooks/useRedirect";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";
import styles from '../../styles/Form.module.css';

/**
 * SignIn component for handling user sign-in.
 */
function SignIn() {
  // Get the function to set the current user from the custom hook
  const setCurrentUser = useSetCurrentUser();
  
  // Get the current user from the custom hook
  const currentUser = useCurrentUser();
  
  // Redirect authenticated users to the home page
  useRedirect("loggedIn", currentUser);

  // Get the function to show the global success message from the custom hook
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  
  // Get the function to set the global success message from the custom hook
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  // State to manage the login form data
  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = logInData;

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to the login endpoint with the form data
      const { data } = await axios.post("/dj-rest-auth/login/", logInData);
      // Set the current user with the response data
      setCurrentUser(data.user);
      // Set the token timestamp for authentication
      setTokenTimestamp(data);
      // Set and show the global success message
      setGlobalSuccessMessage("You are now signed in.");
      setShowGlobalSuccess(true);
      // Navigate to the home page
      navigate("/home");
    } catch (err) {
      // Set validation errors if the request fails
      setErrors(err.response?.data || {});
    }
  };

  // Function to handle form input changes
  const handleChange = (event) => {
    setLogInData({
      ...logInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.heading}>Sign In</h1>
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.formLabel}>Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  className={styles.formControl}
                />
              </div>
            </div>
            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className={styles.formControl}
                />
              </div>
            </div>
          </div>
          {errors.username?.map((message, idx) => (
            <div key={idx} className={styles.alert}>
              {message}
            </div>
          ))}
          {errors.password?.map((message, idx) => (
            <div key={idx} className={styles.alert}>
              {message}
            </div>
          ))}
          {errors.non_field_errors?.map((message, idx) => (
            <div key={idx} className={styles.alert}>
              {message}
            </div>
          ))}
          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;