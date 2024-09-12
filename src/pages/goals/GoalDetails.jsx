import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const GoalsDetails = () => { 
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/goals/${id}/`);
        setGoal(data);
        setHasLoaded(true);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/signin');
        } else if (err.response?.status === 403 || err.response?.status === 404) {
          navigate('/home');
        }
        console.log("Failed to fetch goal details", err);
      }
    };

    fetchGoalDetails();
  }, [id, navigate]);

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
        {goal.tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
      <button onClick={() => navigate(`/goalsedit/${id}`)}>Edit Goal</button>
      <button onClick={() => navigate(`/goalsdelete/${id}`)}>Delete Goal</button>
    </div>
  );
};

export default GoalsDetails; 