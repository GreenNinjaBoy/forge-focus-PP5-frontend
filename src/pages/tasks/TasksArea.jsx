import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/TasksArea.module.css';

/**
 * TaskItem component for displaying a single task.
 * Shows the task's title, details, and deadline.
 * Provides buttons for various actions on the task.
 */
const TaskItem = ({ task, actions, className }) => {
  const [expanded, setExpanded] = useState(false);

  // Function to toggle the expansion of the task details
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
        <p>{task.task_details}</p>
        <p>Expires: {new Date(task.deadline).toLocaleDateString()}</p>
        {actions.map((action, index) => (
          <button 
            key={index} 
            onClick={(e) => {
              e.stopPropagation();
              action.handler();
            }}
            className={styles.taskButton}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task_title: PropTypes.string.isRequired,
    task_details: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
  }).isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
  })).isRequired,
  className: PropTypes.string,
};

/**
 * TaskList component for displaying a list of tasks.
 * Maps over the tasks and renders a TaskItem for each task.
 */
const TaskList = ({ tasks, className, actions }) => (
  <div className={styles.taskList}>
    {tasks.map(task => (
      <TaskItem 
        key={task.id} 
        task={task} 
        className={className}
        actions={actions(task)}
      />
    ))}
  </div>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    task_title: PropTypes.string.isRequired,
    task_details: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string,
  actions: PropTypes.func.isRequired,
};

/**
 * TasksArea component for displaying and managing tasks.
 * Fetches tasks from the API, manages search and task actions, and displays tasks in different categories.
 */

const TasksArea = () => {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to fetch tasks from the API
  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await axiosReq.get('/tasks/');
      const tasksWithoutGoals = data.results.filter(task => task.goals === null);
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

  // Function to handle task editing
  const handleEditTask = (taskId) => {
    navigate(`/tasksedit/${taskId}`);
  };

  // Function to handle task completion
  const handleCompleteTask = async (taskId) => {
    try {
      await axiosReq.patch(`/tasks/${taskId}/toggle-complete/`);
      await fetchTasks();
    } catch (err) {
      console.log("Failed to complete task", err);
    }
  };

  // Function to handle task reset
  const handleResetTask = async (taskId) => {
    try {
      await axiosReq.patch(`/tasks/${taskId}/reset/`);
      await fetchTasks();
    } catch (err) {
      console.log("Failed to reset task", err);
    }
  };

  // Function to handle task deletion
  const handleDeleteTask = (taskId) => {
    navigate(`/tasksdelete/${taskId}`);
  };

  // Function to handle task reuse
  const handleReuseTask = async (taskId) => {
    try {
      await axiosReq.post(`/tasks/${taskId}/reuse/`);
      await fetchTasks();
    } catch (err) {
      console.log("Failed to reuse task", err);
    }
  };

  // Function to check if a task is expired
  const isExpired = (deadline) => {
    return new Date(deadline) < new Date();
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter(task => 
    task.task_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Component to display active tasks
  const ActiveTasks = () => (
    <TaskList
      tasks={filteredTasks.filter(task => !task.completed && !isExpired(task.deadline))}
      className={styles.activeTask}
      actions={(task) => [
        { label: 'Edit', handler: () => handleEditTask(task.id) },
        { label: 'Complete', handler: () => handleCompleteTask(task.id) },
        { label: 'Delete', handler: () => handleDeleteTask(task.id) }
      ]}
    />
  );

  // Component to display completed tasks
  const CompletedTasks = () => (
    <TaskList
      tasks={filteredTasks.filter(task => task.completed)}
      className={styles.completedTask}
      actions={(task) => [
        { label: 'Reuse', handler: () => handleReuseTask(task.id) },
        { label: 'Delete', handler: () => handleDeleteTask(task.id) }
      ]}
    />
  );

  // Component to display expired tasks
  const ExpiredTasks = () => (
    <TaskList
      tasks={filteredTasks.filter(task => !task.completed && isExpired(task.deadline))}
      className={styles.expiredTask}
      actions={(task) => [
        { label: 'Reset', handler: () => handleResetTask(task.id) },
        { label: 'Delete', handler: () => handleDeleteTask(task.id) }
      ]}
    />
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Tasks Area</h1>
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