import { Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";

const GoalsDelete = () => {
  const { id } = useParams();
  const [goalName, setGoalName] = useState("");
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/goals/${id}/`);
        setGoalName(data.name);
      } catch (err) {
        console.error("Failed to fetch goal details", err);
      }
    };

    fetchGoalDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      console.log(`Attempting to delete goal with id: ${id}`);
      await axiosReq.delete(`/goals/${id}/`);
      setGlobalSuccessMessage("You have deleted your goal");
      setShowGlobalSuccess(true);
      navigate('/goalsarea'); 
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  const handleCancel = () => {
    navigate(`/goaldetails/${id}`);
  };

  return (
    <div>
      <p>Are you sure you wish to delete your goal {goalName}?</p>
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
};

export default GoalsDelete;