import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/GoalsDetails.module.css";

const GoalsDetails = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/goals/${id}/`);
        setGoal(data);
        setActiveTasks(data.tasks.filter(task => !task.is_completed));
        setCompletedTasks(data.tasks.filter(task => task.is_completed));
        setHasLoaded(true);
      } catch (err) {
        console.error("Failed to fetch goal details", err);
      }
    };

    fetchGoalDetails();
  }, [id]);

  if (!hasLoaded) {
    return <p>Loading Goal Details...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={goal.image} alt={goal.name} className={styles.image} />
        <h1 className={styles.title}>{goal.name}</h1>
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
        <button onClick={() => navigate(`/goalsedit/${id}`)} className={styles.button}>Edit Goal</button>
        <button onClick={() => navigate(`/goalsdelete/${id}`)} className={styles.button}>Delete Goal</button>
      </div>
    </div>
  );
};

export default GoalsDetails;