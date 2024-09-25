import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/TasksArea.module.css';

const TasksArea = () => {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
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
  }, [navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleViewTask = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axiosReq.patch(`/tasks/${taskId}/toggle-complete/`);
      await fetchTasks();
    } catch (err) {
      console.log("Failed to complete task", err);
    }
  };

  const handleResetTask = async (taskId) => {
    try {
      await axiosReq.patch(`/tasks/${taskId}/reset/`);
      await fetchTasks();
    } catch (err) {
      console.log("Failed to reset task", err);
    }
  };

  const handleDeleteTask = (taskId) => {
    navigate(`/tasksdelete/${taskId}`);
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
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
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
        <div className={styles.tasksArea}>
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

export default TasksArea;