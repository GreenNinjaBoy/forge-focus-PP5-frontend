import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";
import styles from '../../styles/Form.module.css';

const SignUp = () => {
    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

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
            setGlobalSuccessMessage("You have Signed up Successfully, you can now sign in!");
            setShowGlobalSuccess(true);
            navigate('/signin');
        } catch (err) {
            console.error("Error response:", err.response);
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            } else {
                setErrors({ non_field_errors: ["An unexpected error occurred. Please try again."] });
            }
        }
    };

    return (
        <div className={styles.authContainer}>
          <div className={styles.contentWrapper}>
            <h1 className={styles.heading}>Sign Up</h1>
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
                            <div className={styles.formGroup}>
                                <label htmlFor="password1" className={styles.formLabel}>Password:</label>
                                <input
                                    type="password"
                                    id="password1"
                                    name="password1"
                                    value={password1}
                                    onChange={handleChange}
                                    className={styles.formControl}
                                />
                            </div>
                        </div>
                        <div className={styles.formColumn}>
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.formLabel}>Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    className={styles.formControl}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password2" className={styles.formLabel}>Confirm Password:</label>
                                <input
                                    type="password"
                                    id="password2"
                                    name="password2"
                                    value={password2}
                                    onChange={handleChange}
                                    className={styles.formControl}
                                />
                            </div>
                        </div>
                    </div>
                    {Object.keys(errors).map((key) => (
                        errors[key].map((message, idx) => (
                            <div key={`${key}-${idx}`} className={styles.alert}>
                                {message}
                            </div>
                        ))
                    ))}
                    <button type="submit" className={styles.submitButton}>
                        Sign Up
                    </button>
                </form>
            </div>
          </div>
        </div>
    );
};

export default SignUp;