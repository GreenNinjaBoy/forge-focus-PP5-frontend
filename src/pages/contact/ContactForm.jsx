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
  
  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };
  
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center px-2 my-4 my-md-0">
            {/* Heading */}
            <div className="d-flex justify-content-center align-items-center my-4" >
                <h1>Contact</h1>
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label className="sr-only">name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </Form.Group>
                {errors.name?.map((message, idx) => (
                    <Alert key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group controlId="email">
                    <Form.Label className="sr-only">Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </Form.Group>
                {errors.email?.map((message, idx) => (
                    <Alert key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group controlId="message">
                    <Form.Label className="sr-only">Message</Form.Label>
                    <Form.Control
                        className={`text-center`}
                        as="textarea"
                        rows={4}
                        placeholder="Message"
                        name="message"
                        value={message}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.message?.map((message, idx) => (
                    <Alert key={idx}>
                        {message}
                    </Alert>
                ))}

                <Button
                    className={`d-block mx-auto my-3`}
                    type="submit"
                >
                    Submit
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} className={`mt-3`}>
                        {message}
                    </Alert>
                ))}
            </Form>
        </Container>
  )
}

export default ContactForm