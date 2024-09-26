import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";

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

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axiosReq.get(`/tasks/${id}/`);
                setTaskData({
                    task_title: data.task_title,
                    task_details: data.task_details,
                    deadline: data.deadline.split('T')[0], 
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
            deadline: taskData.deadline ? `${taskData.deadline}T00:00:00Z` : null,
            goals: taskData.goals === "" ? null : taskData.goals,
        };
        try {
            await axiosReq.put(`/tasks/${id}/`, formattedData);
            setGlobalSuccessMessage("You have successfully edited your task");
            setShowGlobalSuccess(true);
            navigate('/tasksarea');
        } catch (err) {
            if (err.response?.status !== 401) {
                setError(err.response?.data?.detail || "An error occurred while updating the task.");
                console.error("Error response data:", err.response?.data);
            }
        }
    };

    const handleCancel = () => {
        navigate('/tasksarea');
    };

    return (
        <div>
            <h2>Edit Task</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="task-title">
                    <Form.Label>Task Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="task_title"
                        value={taskData.task_title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="task-details">
                    <Form.Label>Task Details:</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="task_details"
                        value={taskData.task_details}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="task-deadline">
                    <Form.Label>Task Deadline:</Form.Label>
                    <Form.Control
                        type="date"
                        name="deadline"
                        value={taskData.deadline}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="task-goals">
                    <Form.Label>Assign to Goal:</Form.Label>
                    <Form.Control
                        as="select"
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
                    </Form.Control>
                </Form.Group>
                <div>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>
            </Form>
        </div>
    );
};

export default TasksEdit;