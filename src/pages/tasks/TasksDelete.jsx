import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

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

  if (error) return <p>{error}</p>;
  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete the task: {task.task_title}?</p>
      <button onClick={handleConfirmDelete}>Yes, Delete</button>
      <button onClick={handleCancelDelete}>No, Cancel</button>
    </div>
  );
};

export default TasksDelete;