import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";
import styles from '../../styles/GoalsAndTasks.module.css';

/**
 * GoalsDelete component for deleting a specific goal.
 * Fetches goal details, confirms deletion, and handles the deletion process.
 * Shows a global success message upon successful deletion and redirects to the goals area.
 */

const GoalsDelete = () => {
  // Get the goal ID from the URL parameters
  const { id } = useParams();
  
  // State to store the goal name
  const [goalName, setGoalName] = useState("");
  
  // State to store the count of tasks associated with the goal
  const [tasksCount, setTasksCount] = useState(0);
  
  // Get the function to show the global success message from the custom hook
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  
  // Get the function to set the global success message from the custom hook
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
  
  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch goal details from the API
    const fetchGoalDetails = async () => {
      try {
        // Make a GET request to fetch the goal details
        const { data } = await axiosReq.get(`/goals/${id}/`);
        // Set the goal name and tasks count in the state
        setGoalName(data.name);
        setTasksCount(data.tasks_for_goals.length);
      } catch (err) {
        console.error("Failed to fetch goal details", err);
      }
    };

    // Call the fetchGoalDetails function on component mount
    fetchGoalDetails();
  }, [id]);

  // Function to handle goal deletion
  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the goal
      const response = await axiosReq.delete(`/goals/${id}/delete/`);
      // Set and show the global success message
      setGlobalSuccessMessage(response.data.message);
      setShowGlobalSuccess(true);
      // Navigate to the goals area
      navigate('/goalsarea'); 
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  // Function to handle cancellation of the deletion process
  const handleCancel = () => {
    navigate(`/goaldetails/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Delete Goal</h1>
      <p className={styles.message}>Are you sure you wish to delete {goalName}?</p>
      <p className={`${styles.message} ${styles.warningMessage}`}>
        Warning! {tasksCount} associated task(s) will also be deleted.
      </p>
      <div className={styles.buttonGroup}>
        <button 
          onClick={handleCancel}
          className={`${styles.button} ${styles.secondaryButton}`}
        >
          Cancel
        </button>
        <button 
          onClick={handleDelete}
          className={`${styles.button} ${styles.dangerButton}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GoalsDelete;