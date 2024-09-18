import { useState, useEffect } from "react";
import { Button, Form, Image, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";

const GoalsEdit = ({ setGoalData, setGoalState }) => {
  const { id } = useParams();
  const [goalData, setGoalDataState] = useState({
    name: '',
    reason: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  useEffect(() => {
    const fetchGoal = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axiosReq.get(`/goals/${id}`);
        setGoalDataState({
          name: data.name || '',
          reason: data.reason || '',
          image: data.image || null,
        });
      } catch (err) {
        console.error("Failed to fetch goal", err);
        if (err.response?.status === 401) {
          navigate('/signin');
        } else if (err.response?.status === 403 || err.response?.status === 404) {
          navigate('/home');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoal();
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGoalDataState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', goalData.name);
    formData.append('reason', goalData.reason);
    // We're not appending a new image here

    try {
      const { data } = await axiosReq.put(`/goals/${id}`, formData);
      setGlobalSuccessMessage("You have edited your Goal");
      setShowGlobalSuccess(true);
      if (typeof setGoalData === 'function') {
        setGoalData(data);
      }
      if (typeof setGoalState === 'function') {
        setGoalState('view');
      }
      navigate('/goalsarea');
    } catch (err) {
      console.error("Failed to save goal", err);
      setErrors(err.response?.data || {});
    }
  };

  const handleCancel = () => {
    setGoalState('view');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {errors.name?.map((message, idx) => (
        <Alert variant="danger" key={idx}>{message}</Alert>
      ))}

      <Form.Group controlId="goal-name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter goal name"
          name="name"
          value={goalData.name || ''}
          onChange={handleChange}
        />
      </Form.Group>

      {errors.reason?.map((message, idx) => (
        <Alert variant="danger" key={idx}>{message}</Alert>
      ))}
      <Form.Group controlId="goal-reason">
        <Form.Label>Reason</Form.Label>
        <Form.Control
          type="text"
          placeholder="Why is this goal important to you?"
          name="reason"
          value={goalData.reason || ''}
          onChange={handleChange}
        />
      </Form.Group>

      {goalData.image && (
        <div>
          <h5>Current Image:</h5>
          <Image src={goalData.image} alt="Goal" style={{ width: '100px', height: '100px' }} />
        </div>
      )}

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
  setGoalData: PropTypes.func,
  setGoalState: PropTypes.func,
};

GoalsEdit.defaultProps = {
  setGoalData: () => {},
  setGoalState: () => {},
};

export default GoalsEdit;