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
    const [filteredGoals, setFilteredGoals] = useState([]);
    const [goalsState, setGoalsState] = useState("view");
    const [hasLoaded, setHasLoaded] = useState(false);
    const [goalId, setGoalId] = useState(null);
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

    function GoalsContext() {
        if (goalsState === 'view') {
            return Array.isArray(filteredGoals) && filteredGoals.length > 0 ? (
                filteredGoals.map(goal => (
                    <GoalsView
                        key={goal.id}
                        id={goal.id}
                        name={goal.name}
                        reason={goal.reason}
                        image={goal.image}
                        setGoalState={setGoalsState}
                        setGoalId={setGoalId}
                    />
                ))
            ) : (
                <p>No goals match your search criteria.</p>
            );
        } else if (goalsState === 'edit') {
            return <GoalsEdit id={goalId} setGoalData={setGoalsData} setGoalState={setGoalsState} />;
        } else if (goalsState === 'delete') {
            return Array.isArray(filteredGoals) && filteredGoals.map(goal => (
                <GoalsDelete
                    key={goal.id}
                    id={goal.id}
                    name={goal.name}
                    setGoalsState={setGoalsState}
                />
            ));
        }
    }

    const handleCreateGoal = () => {
        navigate('/goalscreate'); 
    };

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
                    <GoalsContext />
                ) : (
                    <p>Loading Goals Data....</p>
                )}
            </div>
        </div>
    );
};

GoalsArea.propTypes = {
    id: PropTypes.number, 
};

export default GoalsArea;