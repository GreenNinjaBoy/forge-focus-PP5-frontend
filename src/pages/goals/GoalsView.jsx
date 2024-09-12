import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/GoalsView.module.css";

const GoalsView = ({ id, name, image, tasksCount }) => {
  const navigate = useNavigate();

  const handleViewGoal = () => {
    navigate(`/goaldetails/${id}`); 
  };

  return (
    <div className={styles.GoalCard}>
      <img src={image} alt={name} className={styles.Image} />
      <h3>{name}</h3>
      <p>Tasks: {tasksCount}</p>
      <button onClick={handleViewGoal} className={styles.ViewButton}>
        View Goal
      </button>
    </div>
  );
};

GoalsView.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tasksCount: PropTypes.number.isRequired,
};

export default GoalsView;