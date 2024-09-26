import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/GoalsAndTasks.module.css';

/**
 * TasksDelete component for deleting a specific task.
 * Fetches task details, confirms deletion, and handles the deletion process.
 */

const TasksDelete = () => {
  // Get the task ID from the URL parameters
  const { id } = useParams();
  
  // State to store the task details
  const [task, setTask] = useState(null);
  
  // State to manage error messages
  const [error, setError] = useState('');
  
  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch task details from the API
    const fetchTask = async () => {
      try {
        if (!id) {
          setError('No task ID provided');
          return;
        }
        // Make a GET request to fetch the task details
        const { data } = await axiosReq.get(`/tasks/${id}/`);
        setTask(data);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch task details');
      }
    };
    // Call the fetchTask function on component mount
    fetchTask();
  }, [id]);

  // Function to handle task deletion
  const handleConfirmDelete = async () => {
    try {
      if (!id) {
        setError('No task ID provided');
        return;
      }
      // Make a DELETE request to delete the task
      await axiosReq.delete(`/tasks/${id}/`);
      // Navigate to the tasks area
      navigate('/tasksarea');
    } catch (err) {
      console.log(err);
      setError('Failed to delete task');
    }
  };

  // Function to handle cancellation of the deletion process
  const handleCancelDelete = () => {
    navigate('/tasksarea'); 
  };

  if (error) return <p className={styles.message}>{error}</p>;
  if (!task) return <p className={styles.message}>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Confirm Deletion</h1>
      <p className={styles.message}>Are you sure you want to delete the task: {task.task_title}?</p>
      <div className={styles.buttonGroup}>
        <button 
          onClick={handleCancelDelete}
          className={`${styles.button} ${styles.secondaryButton}`}
        >
          No, Cancel
        </button>
        <button 
          onClick={handleConfirmDelete}
          className={`${styles.button} ${styles.dangerButton}`}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default TasksDelete;