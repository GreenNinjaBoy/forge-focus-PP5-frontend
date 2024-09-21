import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/TasksArea.module.css';

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await axiosReq.get('/tasks/');
      console.log("Fetched tasks:", data.results);
      
      const tasksWithoutGoals = data.results.filter(task => task.goals === null);
      console.log("Tasks without goals:", tasksWithoutGoals);
      
      setTasks(tasksWithoutGoals);
      setHasLoaded(true);
    } catch (err) {
      console.log("Failed to fetch tasks", err);
      if (err.response?.status === 401) {
        navigate('/signin');
      } else if (err.response?.status === 403 || err.response?.status === 404) {
        navigate('/home');
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [navigate]);

  const handleViewTask = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axiosReq.patch(`/tasks/${taskId}/`, { completed: true });
      await fetchTasks();
    } catch (err) {
      console.log("Failed to complete task", err);
    }
  };

  const handleResetTask = (taskId) => {
    navigate(`/task/edit/${taskId}`);
  };

  const handleDeleteTask = () => {
    navigate(`/tasksdelete/`);
  };

  const handleReuseTask = async (taskId) => {
    try {
      await axiosReq.post(`/tasks/${taskId}/reuse/`);
      await fetchTasks();
    } catch (err) {
      console.log("Failed to reuse task", err);
    }
  };

  const isExpired = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const ActiveTasks = () => (
    <div className={styles.column}>
      <h2>Active Tasks</h2>
      {tasks.filter(task => !task.completed && !isExpired(task.deadline)).map(task => (
        <div key={task.id} className={styles.task}>
          <h3>{task.task_title}</h3>
          <p>Expires: {new Date(task.deadline).toLocaleDateString()}</p>
          <button onClick={() => handleViewTask(task.id)}>View</button>
          <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
        </div>
      ))}
    </div>
  );

  const CompletedTasks = () => (
    <div className={styles.column}>
      <h2>Completed Tasks</h2>
      {tasks.filter(task => task.completed).map(task => (
        <div key={task.id} className={styles.task}>
          <h3>{task.task_title}</h3>
          <button onClick={() => handleReuseTask(task.id)}>Reuse</button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );

  const ExpiredTasks = () => (
    <div className={styles.column}>
      <h2>Expired Tasks</h2>
      {tasks.filter(task => !task.completed && isExpired(task.deadline)).map(task => (
        <div key={task.id} className={styles.task}>
          <h3>{task.task_title}</h3>
          <button onClick={() => handleResetTask(task.id)}>Reset</button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      {hasLoaded ? (
        <div className={styles.tasksTable}>
          <ActiveTasks />
          <CompletedTasks />
          <ExpiredTasks />
        </div>
      ) : (
        <p>Loading Tasks...</p>
      )}
    </div>
  );
};

export default TasksTable;