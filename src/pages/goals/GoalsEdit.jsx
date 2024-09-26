import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";
import styles from '../../styles/GoalsAndTasks.module.css';

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