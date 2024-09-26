import { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";
import styles from '../../styles/GoalsAndTasks.module.css';

const TasksEdit = () => {
    const [taskData, setTaskData] = useState({
        task_title: "",
        task_details: "",
        deadline: "",
        goals: null,
    });
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const formatDateForAPI = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString().split('.')[0] + "Z";
    };

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axiosReq.get(`/tasks/${id}/`);
                setTaskData({
                    task_title: data.task_title,
                    task_details: data.task_details,
                    deadline: formatDateForInput(data.deadline),
                    goals: data.goals,
                });
            } catch (err) {
                if (err.response?.status === 401) {
                    navigate('/signin');
                } else if (err.response?.status === 403 || err.response?.status === 404) {
                    navigate('/tasksarea');
                }
                console.error("Failed to fetch task", err);
            }
        };

        const fetchGoals = async () => {
            try {
                const { data } = await axiosReq.get("/goals/");
                setGoals(data.results);
            } catch (err) {
                console.error("Failed to fetch goals", err);
            }
        };

        fetchTask();
        fetchGoals();
    }, [id, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedData = {
            ...taskData,
            deadline: formatDateForAPI(taskData.deadline),
            goals: taskData.goals === "" ? null : taskData.goals,
        };
        try {
            const { data } = await axiosReq.put(`/tasks/${id}/`, formattedData);
            setGlobalSuccessMessage("You have successfully edited your task");
            setShowGlobalSuccess(true);
            
            if (data.goals) {
                navigate(`/goaldetails/${data.goals}`);
            } else {
                navigate('/tasksarea');
            }
        } catch (err) {
            if (err.response?.status !== 401) {
                setError(err.response?.data || "An error occurred while updating the task.");
                console.error("Error response data:", err.response?.data);
            }
        }
    };

    const handleCancel = () => {
        navigate('/tasksarea');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Edit Task</h1>
            {error && <p className={styles.errorMessage}>
                {typeof error === 'string' ? error : JSON.stringify(error)}
            </p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="task-title" className={styles.formLabel}>Task Title:</label>
                    <input
                        id="task-title"
                        className={styles.formControl}
                        type="text"
                        name="task_title"
                        value={taskData.task_title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="task-details" className={styles.formLabel}>Task Details:</label>
                    <textarea
                        id="task-details"
                        className={styles.formControl}
                        name="task_details"
                        value={taskData.task_details}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="task-deadline" className={styles.formLabel}>Task Deadline:</label>
                    <input
                        id="task-deadline"
                        className={styles.formControl}
                        type="date"
                        name="deadline"
                        value={taskData.deadline}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="task-goals" className={styles.formLabel}>Assign to Goal:</label>
                    <select
                        id="task-goals"
                        className={styles.formControl}
                        name="goals"
                        value={taskData.goals || ""}
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        {goals.map((goal) => (
                            <option key={goal.id} value={goal.id}>
                                {goal.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.buttonGroup}>
                    <button 
                        type="button" 
                        onClick={handleCancel}
                        className={`${styles.button} ${styles.secondaryButton}`}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className={`${styles.button} ${styles.primaryButton}`}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TasksEdit;