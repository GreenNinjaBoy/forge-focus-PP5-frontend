import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";

/**
 * TaskCreate component for creating a new task.
 * Manages form state, handles form submission, and displays validation errors.
 * Shows a global success message upon successful creation and redirects to the appropriate page.
 */

const TaskCreate = ({ goalsId = "" }) => {
    // State to manage the task form data
    const [taskData, setTaskData] = useState({
        task_title: "",
        task_details: "",
        deadline: "",
        goals: goalsId,
        completed: false,
    });
    
    // State to store the list of goals
    const [goals, setGoals] = useState([]);
    
    // State to manage form validation errors
    const [errors, setErrors] = useState({});
    
    // Get the navigate function from react-router-dom to programmatically navigate
    const navigate = useNavigate();
    
    // Get the function to show the global success message from the custom hook
    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    
    // Get the function to set the global success message from the custom hook
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

    useEffect(() => {
        // Function to fetch goals from the API
        const fetchGoals = async () => {
            try {
                // Make a GET request to fetch the goals data
                const { data } = await axiosReq.get("/goals/");
                setGoals(data.results);
            } catch (err) {
                console.error("Failed to fetch goals", err);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    goals: "Failed to load goals. Please try again.",
                }));
            }
        };

        // Call the fetchGoals function on component mount
        fetchGoals();
    }, []);

    // Function to handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: name === "goals" ? (value === "" ? null : value) : value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            ...taskData,
            deadline: taskData.deadline ? `${taskData.deadline}T00:00:00Z` : null,
        };

        try {
            // Make a POST request to create a new task with the form data
            const { data } = await axiosReq.post("/tasks/", formData);
            // Set and show the global success message
            setGlobalSuccessMessage("Task created successfully");
            setShowGlobalSuccess(true);
            
            // Navigate to the appropriate page based on the goal assignment
            if (data.goals) {
                console.log("Navigating to goal details:", data.goals);
                navigate(`/goaldetails/${data.goals}`);
            } else {
                console.log("No goal assigned, navigating to tasks area");
                navigate("/tasksarea");
            }
        } catch (err) {
            console.error("Failed to create task", err);
            setErrors(err.response?.data || {});
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center mb-4">Create New Task</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="task_title">
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="task_title"
                                value={taskData.task_title}
                                onChange={handleChange}
                                required
                            />
                            {errors.task_title && <Alert variant="danger">{errors.task_title}</Alert>}
                        </Form.Group>

                        <Form.Group controlId="task_details">
                            <Form.Label>Task Details</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="task_details"
                                value={taskData.task_details}
                                onChange={handleChange}
                            />
                            {errors.task_details && <Alert variant="danger">{errors.task_details}</Alert>}
                        </Form.Group>

                        <Form.Group controlId="deadline">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control
                                type="date"
                                name="deadline"
                                value={taskData.deadline}
                                onChange={handleChange}
                            />
                            {errors.deadline && <Alert variant="danger">{errors.deadline}</Alert>}
                        </Form.Group>

                        <Form.Group controlId="goals">
                            <Form.Label>Link to Goal</Form.Label>
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
                            {errors.goals && <Alert variant="danger">{errors.goals}</Alert>}
                        </Form.Group>

                        {errors.non_field_errors && (
                            <Alert variant="danger">{errors.non_field_errors}</Alert>
                        )}

                        <div className="text-center mt-4">
                            <Button variant="secondary" onClick={() => navigate(-1)} className="mr-2">
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Create Task
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

TaskCreate.propTypes = {
    goalsId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

TaskCreate.defaultProps = {
    goalsId: ""
};

export default TaskCreate;