import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser, useCurrentUser } from "../../hooks/useCurrentUser";
import { setTokenTimestamp } from "../../utils/Utils";
import { useRedirect } from "../../hooks/useRedirect";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";
import styles from '../../styles/Form.module.css';

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