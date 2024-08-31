import { Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";

const GoalsDelete = ({ id, name, setGoalsState }) => {

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/goals/${id}/`);
      setGlobalSuccessMessage("You have deleted your goal");
      setShowGlobalSuccess(true);
      navigate('/home'); 
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
