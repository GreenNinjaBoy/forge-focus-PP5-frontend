import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

const TasksEdit = ({ id, setTasksData, setTasksState }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDetails, setTaskDetails] = useState("");
    const [deadline, setDeadline] = useState("");
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axiosReq.get(`/tasks/${id}/`);
                setTaskTitle(data.task_title);
                setTaskDetails(data.task_details);
                setDeadline(data.deadline);
                setCompleted(data.completed);
            } catch (err) {
                setError("Failed to fetch task");
                console.error("Failed to fetch task", err);
            }
        };

        fetchTask();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "taskTitle") setTaskTitle(value);
        if (name === "taskDetails") setTaskDetails(value);
        if (name === "deadline") setDeadline(value);
        if (name === "completed") setCompleted(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosReq.put(`/tasks/${id}/`, {
                task_title: taskTitle,
                task_details: taskDetails,
                achieve_by: deadline,
                completed: completed,
            });
            setTasksData(prevTasks => prevTasks.map(task => (task.id === id ? data : task)));
            setTasksState('view');
        } catch (err) {
            setError("Failed to update task");
            console.error("Failed to update task", err);
        }
    };

    const handleCancel = () => {
        setTasksState('view');
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
                        name="taskTitle"
                        value={taskTitle}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="task-details">
                    <Form.Label>Task Details:</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="taskDetails"
                        value={taskDetails}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="task-deadline">
                    <Form.Label>Task Deadline:</Form.Label>
                    <Form.Control
                        type="date"
                        name="deadline"
                        value={deadline}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="task-completed">
                    <Form.Check
                        type="checkbox"
                        name="completed"
                        label="Completed"
                        checked={completed}
                        onChange={handleChange}
                    />
                </Form.Group>
                <div>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>
            </Form>
        </div>
    );
};

TasksEdit.propTypes = {
    id: PropTypes.number.isRequired,
    setTasksData: PropTypes.func.isRequired,
    setTasksState: PropTypes.func.isRequired,
};

export default TasksEdit;