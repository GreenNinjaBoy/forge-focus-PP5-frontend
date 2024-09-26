import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";
import styles from '../../styles/GoalsAndTasks.module.css';

/**
 * GoalsEdit component for editing an existing goal.
 * Fetches goal details, manages form state, handles form submission, and displays validation errors.
 * Shows a global success message upon successful edit and redirects to the goals area.
 */

const GoalsEdit = ({ setGoalData, setGoalState }) => {
  // Get the goal ID from the URL parameters
  const { id } = useParams();
  
  // State to manage the goal form data
  const [goalData, setGoalDataState] = useState({
    name: '',
    reason: '',
    image: null,
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState({});
  
  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(true);

  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();
  
  // Get the function to show the global success message from the custom hook
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  
  // Get the function to set the global success message from the custom hook
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  useEffect(() => {
    // Function to fetch goal details from the API
    const fetchGoal = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        // Make a GET request to fetch the goal details
        const { data } = await axiosReq.get(`/goals/${id}`);
        // Set the goal details in the state
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

    // Call the fetchGoal function on component mount
    fetchGoal();
  }, [id, navigate]);

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setGoalDataState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', goalData.name);
    formData.append('reason', goalData.reason);

    try {
      // Make a PUT request to update the goal with the form data
      const { data } = await axiosReq.put(`/goals/${id}`, formData);
      // Set and show the global success message
      setGlobalSuccessMessage("You have edited your Goal");
      setShowGlobalSuccess(true);
      if (typeof setGoalData === 'function') {
        setGoalData(data);
      }
      if (typeof setGoalState === 'function') {
        setGoalState('view');
      }
      // Navigate to the goals area
      navigate('/goalsarea');
    } catch (err) {
      console.error("Failed to save goal", err);
      setErrors(err.response?.data || {});
    }
  };

  // Function to handle cancellation of the edit process
  const handleCancel = () => {
    navigate(`/goaldetails/${id}`);
  };

  if (isLoading) {
    return <p className={styles.message}>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Edit Goal</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="goal-name" className={styles.formLabel}>Name</label>
          <input
            id="goal-name"
            className={styles.formControl}
            type="text"
            placeholder="Enter goal name"
            name="name"
            value={goalData.name || ''}
            onChange={handleChange}
          />
          {errors.name?.map((message, idx) => (
            <p key={idx} className={styles.errorMessage}>{message}</p>
          ))}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="goal-reason" className={styles.formLabel}>Reason</label>
          <textarea
            id="goal-reason"
            className={styles.formControl}
            placeholder="Why is this goal important to you?"
            name="reason"
            value={goalData.reason || ''}
            onChange={handleChange}
          />
          {errors.reason?.map((message, idx) => (
            <p key={idx} className={styles.errorMessage}>{message}</p>
          ))}
        </div>

        {goalData.image && (
          <div className={styles.formGroup}>
            <h5 className={styles.formLabel}>Current Image:</h5>
            <img src={goalData.image} alt="Goal" className={styles.imagePreview} />
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            onClick={handleCancel}
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
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