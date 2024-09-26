import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/TasksArea.module.css';
import TasksView from './TasksView';  // Import the TasksView component

const TaskItem = ({ task, className }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`${styles.task} ${className}`}>
      <div className={styles.taskHeader} onClick={toggleExpansion}>
        <h3>{task.task_title}</h3>
        <span>{expanded ? '▲' : '▼'}</span>
      </div>
      <div className={`${styles.taskContent} ${expanded ? styles.expanded : ''}`}>
        <TasksView
          id={task.id}
          task_title={task.task_title}
          task_details={task.task_details}
          deadline={task.deadline}
          completed={task.completed}
          setTasksState={() => {}} // Implement this if needed
          setTaskId={() => {}} // Implement this if needed
        />
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task_title: PropTypes.string.isRequired,
    task_details: PropTypes.string,
    deadline: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

const TaskList = ({ tasks, className }) => (
  <div className={styles.taskList}>
    {tasks.map(task => (
      <TaskItem 
        key={task.id} 
        task={task} 
        className={className}
      />
    ))}
  </div>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    task_title: PropTypes.string.isRequired,
    task_details: PropTypes.string,
    deadline: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  className: PropTypes.string,
};

const TasksArea = () => {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  const isExpired = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const filteredTasks = tasks.filter(task => 
    task.task_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ActiveTasks = () => (
    <TaskList
      tasks={filteredTasks.filter(task => !task.completed && !isExpired(task.deadline))}
      className={styles.activeTask}
    />
  );

  const CompletedTasks = () => (
    <TaskList
      tasks={filteredTasks.filter(task => task.completed)}
      className={styles.completedTask}
    />
  );

  const ExpiredTasks = () => (
    <TaskList
      tasks={filteredTasks.filter(task => !task.completed && isExpired(task.deadline))}
      className={styles.expiredTask}
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate('/home')} className={styles.navButton}>Home</button>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button onClick={() => navigate('/taskcreate')} className={styles.navButton}>Create Task</button>
      </div>
      {hasLoaded ? (
        <div className={styles.tasksArea}>
          <div className={styles.column}>
            <h2>Active Tasks</h2>
            <ActiveTasks />
          </div>
          <div className={styles.column}>
            <h2>Completed Tasks</h2>
            <CompletedTasks />
          </div>
          <div className={styles.column}>
            <h2>Expired Tasks</h2>
            <ExpiredTasks />
          </div>
        </div>
      ) : (
        <p>Loading Tasks...</p>
      )}
    </div>
  );
};

export default TasksArea;