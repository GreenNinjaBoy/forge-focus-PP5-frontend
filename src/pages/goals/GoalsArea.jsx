import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import GoalsView from "./GoalsView";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/GoalsView.module.css";
import { Button } from "react-bootstrap";

const GoalsArea = ({ id }) => {
  const [goalsData, setGoalsData] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const { data } = await axiosReq.get(`/goals/`);
        console.log("Fetched data successfully:", data);
        if (data.results && Array.isArray(data.results)) {
          setGoalsData(data.results);
          setFilteredGoals(data.results);
        } else {
          setGoalsData([]);
          setFilteredGoals([]);
        }
        setHasLoaded(true);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/signin');
        } else if (err.response?.status === 403 || err.response?.status === 404) {
          navigate('/home');
        }
        console.log("Failed to fetch goals", err);
      }
    };

    fetchGoals();
  }, [navigate, id]);

  useEffect(() => {
    const results = goalsData.filter(goal =>
      goal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGoals(results);
  }, [searchTerm, goalsData]);

  const handleCreateGoal = () => {
    navigate('/goalscreate'); 
  };

  const handleBack = () => {
    navigate(-1);
}

  return (
    <div className={styles.Container}>
      <div className={styles.SearchContainer}>
        <input
          type="text"
          placeholder="Search goals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.SearchInput}
        />
        <button onClick={handleCreateGoal} className={styles.CreateButton}>
          Create Goal
        </button>
      </div>
      <div className={styles.GoalsContainer}>
        {hasLoaded ? (
          filteredGoals.length > 0 ? (
            filteredGoals.map(goal => (
              <GoalsView
                key={goal.id}
                id={goal.id}
                name={goal.name}
                image={goal.image}
                tasksCount={goal.tasks.length}
              />
            ))
          ) : (
            <p>No goals match your search criteria.</p>
          )
        ) : (
          <p>Loading Goals Data....</p>
        )}
      </div>
      <div><Button onClick={handleBack}>Previous Page</Button></div>
    </div>
  );
};

GoalsArea.propTypes = {
  id: PropTypes.number, 
};

export default GoalsArea;