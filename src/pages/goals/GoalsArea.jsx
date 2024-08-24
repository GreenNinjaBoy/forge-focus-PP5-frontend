import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import GoalsView from "./GoalsView";
import GoalsEdit from "./GoalsEdit";
import GoalsDelete from "./GoalsDelete";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/GoalsView.module.css";

const GoalsArea = ({ id }) => {
    const [goalsData, setGoalsData] = useState([]);
    const [goalsState, setGoalsState] = useState("view");
    const [hasLoaded, setHasLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data } = await axiosReq.get(`/goals/`);
                console.log("Fetched data successfully:", data);
                if (data.results && data.results.length > 0) {
                    setGoalsData(data.results);
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

    function GoalsContext() {
        if (goalsState === 'view') {
            return goalsData.map(goal => (
                <GoalsView
                    key={goal.id}
                    name={goal.name}
                    reason={goal.reason}
                    image={goal.image}
                    setGoalState={setGoalsState}
                />
            ));
        } else if (goalsState === 'edit') {
            const goal = goalsData.find(goal => goal.id === id);
            if (goal) {
                return <GoalsEdit {...goal} setGoalData={setGoalsData} setGoalState={setGoalsState} />;
            }
        } else if (goalsState === 'delete') {
            return goalsData.map(goal => (
                <GoalsDelete
                    key={goal.id}
                    id={goal.id}
                    name={goal.name}
                    setGoalsState={setGoalsState}
                />
            ));
        }
    }

    return (
        <div className={styles.GoalsContainer}>
            {hasLoaded ? (
                <GoalsContext />
            ) : (
                <p>Loading Goals Data....</p>
            )}
        </div>
    );
};

GoalsArea.propTypes = {
    id: PropTypes.number.isRequired,
};

export default GoalsArea;