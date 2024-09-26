import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../hooks/useGlobalSuccess';
import styles from '../../styles/Form.module.css';

/**
 * ContactForm component for handling user contact submissions.
 * Manages form state, handles form submission, and displays validation errors.
 * Shows a global success message upon successful submission and redirects to the home page.
 */

const ContactForm = () => {
    // Get the function to show the global success message from the custom hook
    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    
    // Get the function to set the global success message from the custom hook
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
    
    // State to manage the contact form data
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const { name, email, message } = contactData;

    // State to manage form validation errors
    const [errors, setErrors] = useState({});

    // Get the navigate function from react-router-dom to programmatically navigate
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Make a POST request to the contact endpoint with the form data
            await axios.post("/contact/", contactData);
            // Set and show the global success message
            setGlobalSuccessMessage("Thank you for contacting Forge Focus");
            setShowGlobalSuccess(true);
            // Navigate to the home page
            navigate("/");
        } catch (err) {
            // Set validation errors if the request fails
            setErrors(err.response?.data);
        }
    };
    
    // Function to handle form input changes
    const handleChange = (event) => {
        setContactData({
            ...contactData,
            [event.target.name]: event.target.value,
        });
    };
    
    return (
        <div className={styles.authContainer}>
            <h1 className={styles.heading}>Contact Us</h1>
            <div className={styles.formCard}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <div className={styles.formColumn}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.formLabel}>Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    className={styles.formControl}
                                />
                            </div>
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
                        </div>
                        <div className={styles.formColumn}>
                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.formLabel}>Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={message}
                                    onChange={handleChange}
                                    className={`${styles.formControl} ${styles.textareaFull}`}
                                ></textarea>
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
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;