import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/GoalsArea.module.css";

const GoalsView = ({ id, name, image, tasksCount }) => {
  console.log("image URL:", image);
  const navigate = useNavigate();

  const handleViewGoal = () => {
    navigate(`/goaldetails/${id}`); 
  };

  // Default image URL in case the provided image is undefined or an empty string
  const defaultImageUrl = 'https://res.cloudinary.com/dcnhbmqy4/image/upload/v1713429424/media/images/default_post_pdrfdn.jpg';

  return (
    <div className={styles.GoalCard}>
      <img 
        src={image || defaultImageUrl} 
        alt={name} 
        className={styles.Image} 
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = defaultImageUrl;
        }}
      />
      <h3>{name}</h3>
      <p>
        {tasksCount > 0 
          ? `There are ${tasksCount} tasks associated with this goal` 
          : "There are no tasks associated with this goal"}
      </p>
      <button onClick={handleViewGoal} className={styles.ViewButton}>
        View Goal
      </button>
    </div>
  );
};

GoalsView.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  tasksCount: PropTypes.number.isRequired,
};

export default GoalsView;