import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/GoalsAndTasks.module.css';

const TasksDelete = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!id) {
          setError('No task ID provided');
          return;
        }
        const { data } = await axiosReq.get(`/tasks/${id}/`);
        setTask(data);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch task details');
      }
    };
    fetchTask();
  }, [id]);

  const handleConfirmDelete = async () => {
    try {
      if (!id) {
        setError('No task ID provided');
        return;
      }
      await axiosReq.delete(`/tasks/${id}/`);
      navigate('/tasksarea');
    } catch (err) {
      console.log(err);
      setError('Failed to delete task');
    }
  };

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