import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";


const TasksDelete = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axiosReq.delete(`/tasks/${id}/`);
            navigate("/tasksarea");
        } catch (err) {
            setError("Failed to delete task");
            console.error("Failed to delete task", err);
        }
    };

    const handleCancel = () => {
        navigate("/tasksarea");
    };

    return (
        <div>
            <h2>Delete Task</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <p>Are you sure you want to delete this task?</p>
            <div>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    );
};

TasksDelete.propTypes = {
    id: PropTypes.number,
};

export default TasksDelete;