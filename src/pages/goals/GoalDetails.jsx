import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        console.log("Goal details:", data); // Log the goal details response
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

    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/`);
        const filteredTasks = data.results.filter(task => task.goals === parseInt(id));
        setTasks(filteredTasks);
      } catch (err) {
        console.log("Failed to fetch tasks", err);
      }
    };

    fetchGoalDetails();
    fetchTasks();
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

export default GoalsDetails;