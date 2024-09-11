import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import TasksView from "./TasksView";
import TasksEdit from "./TasksEdit";
import TasksDelete from "./TasksDelete";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/TasksArea.module.css";

const TasksArea = ({ id }) => {
    const [tasksData, setTasksData] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [tasksState, setTasksState] = useState("view");
    const [hasLoaded, setHasLoaded] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axiosReq.get(`/tasks/?goals__isnull=true`);
                console.log("Fetched data successfully:", data);
                if (data.results && Array.isArray(data.results)) {
                    setTasksData(data.results);
                    setFilteredTasks(data.results);
                } else {
                    setTasksData([]);
                    setFilteredTasks([]);
                }
                setHasLoaded(true);
            } catch (err) {
                if (err.response?.status === 401) {
                    navigate('/signin');
                } else if (err.response?.status === 403 || err.response?.status === 404) {
                    navigate('/home');
                }
                console.log("Failed to fetch tasks", err);
            }
        };

        fetchTasks();
    }, [navigate, id]);

    useEffect(() => {
        const results = tasksData.filter(task =>
            task.task_title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTasks(results);
    }, [searchTerm, tasksData]);

    function TasksContext() {
        if (tasksState === 'view') {
            return Array.isArray(filteredTasks) && filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                    <TasksView
                        key={task.id}
                        id={task.id}
                        task_title={task.task_title}
                        task_details={task.task_details}
                        deadline={task.deadline}
                        completed={task.completed}
                        setTasksState={setTasksState}
                        setTaskId={setTaskId}
                        setTaskTitle={setTaskTitle}
                    />
                ))
            ) : (
                <p>No tasks match your search criteria.</p>
            );
        } else if (tasksState === 'edit') {
            return <TasksEdit id={taskId} setTasksData={setTasksData} setTasksState={setTasksState} />;
        } else if (tasksState === 'delete') {
            return <TasksDelete id={taskId} taskTitle={taskTitle} setTasksState={setTasksState} />;
        }
    }

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
                    Create Task
                </button>
            </div>
            <div className={styles.TasksContainer}>
                {hasLoaded ? (
                    <TasksContext />
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