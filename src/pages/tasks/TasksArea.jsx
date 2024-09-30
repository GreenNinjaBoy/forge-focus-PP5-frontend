import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/TasksArea.module.css';

const TaskItem = ({ task, actions, className }) => {
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

const TasksArea = () => {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleEditTask = (taskId) => {
    navigate(`/tasksedit/${taskId}`);
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

  const filteredTasks = tasks.filter(task => 
    task.task_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TaskSection = ({ title, tasks, actions, sectionKey }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
      <div className={`${styles.column} ${isExpanded ? styles.expanded : ''}`}>
        <h2 onClick={toggleExpand}>
          {title} ({tasks.length})
          <span className={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</span>
        </h2>
        <TaskList
          tasks={tasks}
          className={styles[`${sectionKey}Task`]}
          actions={actions}
        />
      </div>
    );
  };

  TaskSection.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    actions: PropTypes.func.isRequired,
    sectionKey: PropTypes.string.isRequired,
  };

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
          <TaskSection
            title="Active Tasks"
            tasks={filteredTasks.filter(task => !task.completed && !isExpired(task.deadline))}
            actions={(task) => [
              { label: 'Edit', handler: () => handleEditTask(task.id) },
              { label: 'Complete', handler: () => handleCompleteTask(task.id) },
              { label: 'Delete', handler: () => handleDeleteTask(task.id) }
            ]}
            sectionKey="active"
          />
          <TaskSection
            title="Completed Tasks"
            tasks={filteredTasks.filter(task => task.completed)}
            actions={(task) => [
              { label: 'Reuse', handler: () => handleReuseTask(task.id) },
              { label: 'Delete', handler: () => handleDeleteTask(task.id) }
            ]}
            sectionKey="completed"
          />
          <TaskSection
            title="Expired Tasks"
            tasks={filteredTasks.filter(task => !task.completed && isExpired(task.deadline))}
            actions={(task) => [
              { label: 'Reset', handler: () => handleResetTask(task.id) },
              { label: 'Delete', handler: () => handleDeleteTask(task.id) }
            ]}
            sectionKey="expired"
          />
        </div>
      ) : (
        <p>Loading Tasks...</p>
      )}
    </div>
  );
};

export default TasksArea;