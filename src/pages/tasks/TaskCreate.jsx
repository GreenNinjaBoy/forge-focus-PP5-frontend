import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

const TaskCreate = ({ goalsId = "" }) => {
    const [taskData, setTaskData] = useState({
        task_title: "",
        task_details: "",
        deadline: "",
        goals: goalsId,
        completed: false,
    });
    const [goals, setGoals] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoals = async () => {
            try {
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

        fetchGoals();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosReq.post("/tasks/", taskData);
            console.log("Task created successfully:", data);
            navigate(taskData.goals ? "/goalsarea" : "/tasksarea");
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
                                value={taskData.goals}
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

export default TaskCreate;