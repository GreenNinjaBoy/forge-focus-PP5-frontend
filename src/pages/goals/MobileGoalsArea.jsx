import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import GoalsView from "./GoalsView";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/MobileGoalsArea.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Button } from "react-bootstrap";

const MobileGoalsArea = () => {
    console.log('Rendering MobileGoalsArea');
    const [goalsData, setGoalsData] = useState([]);
    const [filteredGoals, setFilteredGoals] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const goalsPerPage = 3; // Reduced for mobile view
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoals = async () => {
        try {
            const { data } = await axiosReq.get(`/goals/`);
            console.log("Fetched goals data:", data);
            if (data.results && Array.isArray(data.results)) {
            setGoalsData(data.results);
            setFilteredGoals(data.results);
            } else {
            setGoalsData([]);
            setFilteredGoals([]);
            }
            setHasLoaded(true);
        } catch (err) {
            console.error("Failed to fetch goals", err);
            if (err.response?.status === 401) {
            navigate('/signin');
            } else if (err.response?.status === 403 || err.response?.status === 404) {
            navigate('/home');
            }
        }
        };

        fetchGoals();
    }, [navigate]);

    useEffect(() => {
        const results = goalsData.filter(goal =>
        goal.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGoals(results);
        setCurrentPage(1);
    }, [searchTerm, goalsData]);

    const handleCreateGoal = () => {
        navigate('/goalscreate');
    };

    const handleHome = () => {
        navigate('/home');
    };

    const indexOfLastGoal = currentPage * goalsPerPage;
    const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
    const currentGoals = filteredGoals.slice(indexOfFirstGoal, indexOfLastGoal);
    const totalPages = Math.ceil(filteredGoals.length / goalsPerPage);

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className={styles.Container}>
        <div className={styles.TopBar}>
            <Button onClick={handleHome} className={`${btnStyles.Button} ${btnStyles.Wide}`}>Home</Button>
            <div className={styles.SearchContainer}>
            <input
                type="text"
                placeholder="Search goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.SearchInput}
            />
            </div>
            <Button onClick={handleCreateGoal} className={`${btnStyles.Button} ${btnStyles.Wide}`}>Create Goal</Button>
        </div>
        <div className={styles.GoalsContainer}>
            {hasLoaded ? (
            currentGoals.length > 0 ? (
                currentGoals.map(goal => (
                <GoalsView
                    key={goal.id}
                    id={goal.id}
                    name={goal.name}
                    image={goal.image}
                    tasksCount={goal.tasks ? goal.tasks.length : 0}
                />
                ))
            ) : (
                <p className={styles.NoGoalsMessage}>No goals match your search criteria.</p>
            )
            ) : (
            <p className={styles.LoadingMessage}>Loading Goals Data....</p>
            )}
        </div>
        {filteredGoals.length > goalsPerPage && (
            <div className={styles.PaginationContainer}>
            <Button onClick={prevPage} disabled={currentPage === 1} className={`${btnStyles.Button} ${btnStyles.Wide}`}>Previous</Button>
            <span className={styles.PageInfo}>Page {currentPage} of {totalPages}</span>
            <Button onClick={nextPage} disabled={currentPage === totalPages} className={`${btnStyles.Button} ${btnStyles.Wide}`}>Next</Button>
            </div>
        )}
        </div>
    );
};

export default MobileGoalsArea;