import { useState, useEffect, useRef } from "react";
import { Button, Form, Image, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";

const GoalsEdit = ({ id, setGoalData, setGoalState }) => {

  const [goalData, setGoalDataState] = useState({
    name: '',
    reason: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  const imageInput = useRef(null);

  const navigate = useNavigate();

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const { data } = await axiosReq.get(`/goals/${id}`);
        setGoalDataState({
          name: data.name,
          reason: data.reason,
          image: data.image,
        });
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/signin');
        } else if (err.response?.status === 403 || err.response?.status === 404) {
          navigate('/home');
        }
        console.error("Failed to fetch goal", err);
      }
    };

    fetchGoal();
  }, [id, navigate]);

  const handleChange = (event) => {
    setGoalDataState({
      ...goalData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length > 0) {
      URL.revokeObjectURL(goalData.image);
      setGoalDataState({
        ...goalData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', goalData.name);
    formData.append('reason', goalData.reason);
    if (imageInput.current.files.length > 0) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/goals/${id}`, formData);
      setGlobalSuccessMessage("You have edited your Goal");
      setShowGlobalSuccess(true);
      setGoalData(data);
      setGoalState('view');
      navigate('/goalsarea');
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleCancel = () => {
    setGoalState('view');
  };

  return (
    <Form onSubmit={handleSubmit}>

      {errors.name?.map((message, idx) => (
        <Alert key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="goal-name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter goal name"
          name="name"
          value={goalData.name}
          onChange={handleChange}
        />
      </Form.Group>

      {errors.reason?.map((message, idx) => (
        <Alert key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="goal-reason">
        <Form.Label>Reason</Form.Label>
        <Form.Control
          type="text"
          placeholder="Why is this goal important to you?"
          name="reason"
          value={goalData.reason}
          onChange={handleChange}
        />
      </Form.Group>

      {errors.image?.map((message, idx) => (
        <Alert key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="goal-image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          name="image"
          ref={imageInput}
          onChange={handleChangeImage}
        />
      </Form.Group>
      <div>
        <Image src={goalData.image} alt="Goal" style={{ width: '100px', height: '100px' }} />
      </div>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button type="submit">
        Save changes
      </Button>
    </Form>
  );
};

GoalsEdit.propTypes = {
  id: PropTypes.number,
  setGoalData: PropTypes.func.isRequired,
  setGoalState: PropTypes.func.isRequired,
};

export default GoalsEdit;