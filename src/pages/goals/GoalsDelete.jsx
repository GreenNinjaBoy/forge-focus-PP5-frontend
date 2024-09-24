import { Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../hooks/useGlobalSuccess";

const GoalsDelete = () => {
  const { id } = useParams();
  const [goalName, setGoalName] = useState("");
  const [tasksCount, setTasksCount] = useState(0);
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/goals/${id}/`);
        setGoalName(data.name);
        setTasksCount(data.tasks_for_goals.length);
      } catch (err) {
        console.error("Failed to fetch goal details", err);
      }
    };

    fetchGoalDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axiosReq.delete(`/goals/${id}/delete/`);
      setGlobalSuccessMessage(response.data.message);
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
      <p>Are you sure you wish to delete {goalName}?</p>
      <p>Warning! {tasksCount} associated task(s) will also be deleted.</p>
      <div>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default GoalsDelete;