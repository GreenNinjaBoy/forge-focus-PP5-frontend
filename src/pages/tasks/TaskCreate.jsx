import { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Button, Alert } from "react-bootstrap";

const TaskCreate = ({ keyParameters = {} }) => {
    const { goals_id } = keyParameters;
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDetails, setTaskDetails] = useState("");
    const [deadline, setDeadline] = useState("");
    const [goals, setGoals] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState(goals_id || "");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data } = await axiosReq.get("/goals/");
                setGoals(data.results);
            } catch (err) {
                console.error("Failed to fetch goals", err);
            }
        };

        fetchGoals();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "taskTitle") setTaskTitle(value);
        if (name === "taskDetails") setTaskDetails(value);
        if (name === "deadline") setDeadline(value);
        if (name === "goal") setSelectedGoal(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosReq.post("/tasks/", {
                task_title: taskTitle,
                task_details: taskDetails,
                deadline: deadline,
                goals: selectedGoal || null,
                completed: false,
            });
            console.log("Task created successfully:", data);
            navigate(selectedGoal ? "/goalsarea" : "/tasksarea");
        } catch (err) {
            setError("Failed to create task");
            console.error("Failed to create task", err);
        }
    };

    const handleCancel = () => {
        navigate("/tasksarea");
    };

    return (
        <div>
            <h2>Create New Task</h2>
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
                <Form.Group controlId="goal">
                    <Form.Label>Link to Goal:</Form.Label>
                    <Form.Control
                        as="select"
                        name="goal"
                        value={selectedGoal}
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
                    <Button onClick={handleCancel}>Cancel Task Creation</Button>
                    <Button type="submit">Save Task Creation</Button>
                </div>
            </Form>
        </div>
    );
};

TaskCreate.propTypes = {
    keyParameters: PropTypes.object,
};

export default TaskCreate;