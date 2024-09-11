import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Button } from "react-bootstrap";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";

const TasksDelete = ({ id, taskTitle, setTasksState }) => {
    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
    
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            console.log(`Deleting task with ID: ${id}`);
            const response = await axiosReq.delete(`/tasks/${id}/`);
            console.log("Delete response:", response); 
            setGlobalSuccessMessage("You have deleted your task");
            setShowGlobalSuccess(true);
            navigate('/tasksarea');
        } catch (err) {
            console.error("Error Deleting Task", err);
            if (err.response) {
                console.error("Response data:", err.response.data);
                console.error("Response status:", err.response.status);
                console.error("Response headers:", err.response.headers);
            }
        }
    };

    const handleCancel = () => {
        setTasksState('view');
    };

    return (
        <div>
            <h2>Delete Task</h2>
            <p>Are you sure you want to delete this task: {taskTitle}?</p>
            <div>
                <Button onClick={handleDelete}>Delete</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    );
};

TasksDelete.propTypes = {
    id: PropTypes.number.isRequired,
    taskTitle: PropTypes.string.isRequired,
    setTasksState: PropTypes.func.isRequired,
};

export default TasksDelete;