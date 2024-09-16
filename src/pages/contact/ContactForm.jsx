import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../hooks/useGlobalSuccess';

const ContactForm = () => {

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
  
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message:"",
  });

  const { name, email, message } = contactData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/contact/", contactData);
      setGlobalSuccessMessage("Thank you for contacting Forge Focus")
      setShowGlobalSuccess(true);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>Contact</div>
  )
}

export default Contact