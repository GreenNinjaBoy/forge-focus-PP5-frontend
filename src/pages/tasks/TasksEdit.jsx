import { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";
import styles from '../../styles/GoalsAndTasks.module.css';

/**
 * TasksEdit component for editing an existing task.
 * Fetches task and goal details, manages form state, handles form submission, and displays validation errors.
 * Shows a global success message upon successful edit and redirects to the appropriate page.
 */
const TasksEdit = () => {
    // State to manage the task form data
    const [taskData, setTaskData] = useState({
        task_title: "",
        task_details: "",
        deadline: "",
        goals: null,
    });
    
    // State to store the list of goals
    const [goals, setGoals] = useState([]);
    
    // State to manage error messages
    const [error, setError] = useState(null);
    
    // Get the navigate function from react-router-dom to programmatically navigate
    const navigate = useNavigate();
    
    // Get the task ID from the URL parameters
    const { id } = useParams();
    
    // Get the function to show the global success message from the custom hook
    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    
    // Get the function to set the global success message from the custom hook
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

    // Function to format date for input fields
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Function to format date for API requests
    const formatDateForAPI = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString().split('.')[0] + "Z";
    };

    useEffect(() => {
        // Function to fetch task details from the API
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

        // Function to fetch goals from the API
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

    // Function to handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle form submission
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

    // Function to handle cancellation of the edit process
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