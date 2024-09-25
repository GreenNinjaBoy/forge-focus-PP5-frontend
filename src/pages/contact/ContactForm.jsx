import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../hooks/useGlobalSuccess';
import styles from '../../styles/Form.module.css';

const ContactForm = () => {
    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
    
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const { name, email, message } = contactData;

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/contact/", contactData);
            setGlobalSuccessMessage("Thank you for contacting Forge Focus");
            setShowGlobalSuccess(true);
            navigate("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };
    
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