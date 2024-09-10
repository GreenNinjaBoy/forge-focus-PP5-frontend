import { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/TasksArea.module.css";
import PropTypes from "prop-types";

const TasksArea = () => {
    const [tasksData, setTasksData] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axiosReq.get(`/tasks/?goals__isnull=true`);
                setTasksData(data.results);
                setActiveTasks(data.results.filter(task => !task.completed));
                setCompletedTasks(data.results.filter(task => task.completed));
                setHasLoaded(true);
            } catch (err) {
                console.log("Failed to fetch tasks", err);
            }
        };

        fetchTasks();
    }, [navigate]);

    useEffect(() => {
        const results = tasksData.filter(task =>
            task.task_title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setActiveTasks(results.filter(task => !task.completed));
        setCompletedTasks(results.filter(task => task.completed));
    }, [searchTerm, tasksData]);

    const handleCompleteTask = (taskId) => {
        const updatedTasks = activeTasks.map(task =>
            task.id === taskId ? { ...task, completed: true } : task
        );
        setActiveTasks(updatedTasks.filter(task => !task.completed));
        setCompletedTasks([...completedTasks, ...updatedTasks.filter(task => task.completed)]);
    };

    const handleResetTask = (taskId) => {
        const updatedTasks = completedTasks.map(task =>
            task.id === taskId ? { ...task, completed: false } : task
        );
        setCompletedTasks(updatedTasks.filter(task => task.completed));
        setActiveTasks([...activeTasks, ...updatedTasks.filter(task => !task.completed)]);
    };

    const handleDeleteTask = (taskId) => {
        navigate(`/tasksdelete/${taskId}`);
    };

    const handleCreateTask = () => {
        navigate('/taskcreate');
    };

    return (
        <div className={styles.Container}>
            <div className={styles.SearchContainer}>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.SearchInput}
                />
                <button onClick={handleCreateTask} className={styles.CreateButton}>
                    Create New Task
                </button>
            </div>
            <div className={styles.TasksContainer}>
                {hasLoaded ? (
                    <>
                        <div className={styles.ActiveTasks}>
                            <h2>Active Tasks</h2>
                            {activeTasks.length > 0 ? (
                                activeTasks.map(task => (
                                    <div key={task.id} className={styles.TaskCard}>
                                        <p>{task.task_title}</p>
                                        <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                        <button onClick={() => navigate(`/tasksedit/${task.id}`)}>Edit</button>
                                    </div>
                                ))
                            ) : (
                                <p>No active tasks.</p>
                            )}
                        </div>
                        <div className={styles.CompletedTasks}>
                            <h2>Completed Tasks</h2>
                            {completedTasks.length > 0 ? (
                                completedTasks.map(task => (
                                    <div key={task.id} className={styles.TaskCard}>
                                        <p>{task.task_title}</p>
                                        <button onClick={() => handleResetTask(task.id)}>Reset</button>
                                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p>No completed tasks.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Loading Tasks Data....</p>
                )}
            </div>
        </div>
    );
};

TasksArea.propTypes = {
    id: PropTypes.number,
};

export default TasksArea;