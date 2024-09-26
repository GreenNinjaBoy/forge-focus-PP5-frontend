import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/GoalsDetails.module.css";

/**
 * GoalsDetails component for displaying the details of a specific goal.
 * Fetches goal details and associated tasks from the API.
 * Manages the state of the goal, active tasks, completed tasks, and loading status.
 * Provides navigation options to go back, edit, or delete the goal.
 */
const GoalsDetails = () => {
  // Get the goal ID from the URL parameters
  const { id } = useParams();
  
  // State to store the goal details
  const [goal, setGoal] = useState(null);
  
  // State to store the active tasks associated with the goal
  const [activeTasks, setActiveTasks] = useState([]);
  
  // State to store the completed tasks associated with the goal
  const [completedTasks, setCompletedTasks] = useState([]);
  
  // State to manage the loading status
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch goal details from the API
    const fetchGoalDetails = async () => {
      try {
        // Make a GET request to fetch the goal details
        const { data } = await axiosReq.get(`/goals/${id}/`);
        // Set the goal details in the state
        setGoal(data);
        // Filter and set the active tasks
        setActiveTasks(data.tasks.filter(task => !task.is_completed));
        // Filter and set the completed tasks
        setCompletedTasks(data.tasks.filter(task => task.is_completed));
        // Set the loading status to true
        setHasLoaded(true);
      } catch (err) {
        console.error("Failed to fetch goal details", err);
      }
    };

    // Call the fetchGoalDetails function on component mount
    fetchGoalDetails();
  }, [id]);

  // Function to handle navigation to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Display a loading message if the goal details are still being fetched
  if (!hasLoaded) {
    return <p>Loading Goal Details...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <img src={goal.image} alt={goal.name} className={styles.image} />
          <h1 className={styles.title}>{goal.name}</h1>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.description}>
          <h2>Description</h2>
          <p>{goal.reason}</p>
        </div>
        <div className={styles.tasksContainer}>
          <div className={styles.taskColumn}>
            <h2>Active Tasks</h2>
            {activeTasks.length > 0 ? (
              <ul className={styles.taskList}>
                {activeTasks.map(task => (
                  <li key={task.id} className={styles.taskItem}>{task.task_title}</li>
                ))}
              </ul>
            ) : (
              <p>No active tasks for this goal.</p>
            )}
          </div>
          <div className={styles.taskColumn}>
            <h2>Completed Tasks</h2>
            {completedTasks.length > 0 ? (
              <ul className={styles.taskList}>
                {completedTasks.map(task => (
                  <li key={task.id} className={styles.taskItem}>{task.task_title}</li>
                ))}
              </ul>
            ) : (
              <p>No completed tasks for this goal yet.</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleGoBack} className={styles.button}>Previous Page</button>
        <div className={styles.rightButtons}>
          <button onClick={() => navigate(`/goalsedit/${id}`)} className={styles.button}>Edit Goal</button>
          <button onClick={() => navigate(`/goalsdelete/${id}`)} className={styles.button}>Delete Goal</button>
        </div>
      </div>
    </div>
  );
};

export default GoalsDetails;