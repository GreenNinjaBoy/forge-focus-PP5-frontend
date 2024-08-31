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
    const [goalId, setGoalId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data } = await axiosReq.get(`/goals/`);
                console.log("Fetched data successfully:", data);
                if (data.results && Array.isArray(data.results)) {
                    setGoalsData(data.results);
                } else {
                    setGoalsData([]); // Ensure goalsData is an array
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
            return Array.isArray(goalsData) && goalsData.map(goal => (
                <GoalsView
                    key={goal.id}
                    id={goal.id}
                    name={goal.name}
                    reason={goal.reason}
                    image={goal.image}
                    setGoalState={setGoalsState}
                    setGoalId={setGoalId}
                />
            ));
        } else if (goalsState === 'edit') {
            return <GoalsEdit id={goalId} setGoalData={setGoalsData} setGoalState={setGoalsState} />;
        } else if (goalsState === 'delete') {
            return Array.isArray(goalsData) && goalsData.map(goal => (
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
    id: PropTypes.number, 
};

export default GoalsArea;