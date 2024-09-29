import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../hooks/useGlobalSuccess';
import styles from '../../styles/GoalsAndTasks.module.css';

/**
 * GoalsCreate component for creating a new goal.
 * Manages form state, handles form submission, and displays a preview of the selected image.
 * Shows a global success message upon successful creation and redirects to the goals area.
 */

const GoalsCreate = () => {
  // Get the function to show the global success message from the custom hook
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  
  // Get the function to set the global success message from the custom hook
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  // Default image to display if no image is selected
  // const defaultImage = 'path/to/default/image.jpg';
  
  // State to manage the goal form data
  const [goalData, setGoalData] = useState({
    name: '',
    reason: '',
    image: null
  });

  const { name, reason, image } = goalData;
  
  // Reference to the image input element
  const imageInput = useRef(null);
  
  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleChange = (event) => {
    setGoalData({
      ...goalData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle image input changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      setGoalData({
        ...goalData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('reason', reason);
    if (imageInput.current.files.length > 0) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      // Make a POST request to create a new goal with the form data
      const { data } = await axiosReq.post('/goals/', formData);
      console.log(data);
      // Set and show the global success message
      setGlobalSuccessMessage("You have created a new goal!");
      setShowGlobalSuccess(true);
      // Navigate to the goals area
      navigate(`/goalsarea`);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error(err.response?.data);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create a New Goal</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>Name</label>
          <input
            id="name"
            className={styles.formControl}
            type="text"
            placeholder="Enter goal name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="reason" className={styles.formLabel}>Reason</label>
          <textarea
            id="reason"
            className={styles.formControl}
            placeholder="Why is this goal important to you?"
            name="reason"
            value={reason}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.formLabel}>Image</label>
          <input
            id="image"
            className={styles.formControl}
            type="file"
            name="image"
            ref={imageInput}
            onChange={handleChangeImage}
          />
        </div>
        <div>
          <img
            src={image}
            alt="Goal"
            className={styles.imagePreview}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => navigate('/home')}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalsCreate;