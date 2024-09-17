import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const GoalsDetails = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/goals/${id}/`);
        setGoal(data);
        setTasks(data.tasks);
        setHasLoaded(true);
      } catch (err) {
        console.error("Failed to fetch goal details", err);
      }
    };

    fetchGoalDetails();
  }, [id]);

  if (!hasLoaded) {
    return <p>Loading Goal Details...</p>;
  }

  return (
    <div>
      <h1>{goal.name}</h1>
      <img src={goal.image} alt={goal.name}/>
      <p>{goal.reason}</p>
      <h2>Tasks</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id}>{task.task_title}</li>
          ))
        ) : (
          <p>No tasks associated with this goal.</p>
        )}
      </ul>
      <button onClick={() => navigate(`/goalsedit/${id}`)}>Edit Goal</button>
      <button onClick={() => navigate(`/goalsdelete/${id}`)}>Delete Goal</button>
    </div>
  );
};

GoalsDetails.propTypes = {
  id: PropTypes.number.isRequired,
};

export default GoalsDetails;