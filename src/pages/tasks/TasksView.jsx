import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const TasksView = ({ id, task_title, task_details, deadline, completed, setTasksState, setTaskId }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        setTaskId(id);
        setTasksState('edit');
    };

    const handleDelete = () => {
        setTaskId(id);
        setTasksState('delete');
    };

    return (
        <div>
            <h3>{task_title}</h3>
            <p>{task_details}</p>
            <p>Achieve by: {deadline}</p>
            <p>Status: {completed ? "Completed" : "Active"}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

TasksView.propTypes = {
    id: PropTypes.number.isRequired,
    task_title: PropTypes.string.isRequired,
    task_details: PropTypes.string,
    deadline: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    setTasksState: PropTypes.func.isRequired,
    setTaskId: PropTypes.func.isRequired,
};

export default TasksView;