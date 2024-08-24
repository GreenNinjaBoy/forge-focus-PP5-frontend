import { Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const GoalsDelete = ({ id, name, setGoalsState }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/goals/${id}/`);
      navigate('/home'); // Redirect after successful deletion
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  const handleCancel = () => {
    setGoalsState("view");
  };

  return (
    <div>
      <p>Are you sure you wish to delete your {name} goal?</p>
      <p>Warning! all associated tasks will also be deleted</p>
      <div>
        <Button onClick={handleCancel}>
          <div>Cancel</div>
        </Button>
        <Button onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

GoalsDelete.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  setGoalsState: PropTypes.func.isRequired,
};

export default GoalsDelete;
