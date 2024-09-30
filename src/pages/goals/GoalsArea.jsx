import React, { useState, useEffect, useCallback } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/GoalsArea.module.css";
import { Button } from "react-bootstrap";

const GoalCard = ({ goal, isMobile, isTablet }) => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const toggleExpand = () => {
        if (isMobile || isTablet) {
            setExpanded(!expanded);
        }
    };

    return (
        <div className={styles.GoalCard}>
            <div className={styles.GoalHeader} onClick={toggleExpand}>
                <h3>{goal.name}</h3>
                {(isMobile || isTablet) && <span>{expanded ? '▲' : '▼'}</span>}
            </div>
            {(!isMobile && !isTablet) || expanded ? (
                <div className={styles.GoalContent}>
                    <img src={goal.image} alt={goal.name} className={styles.GoalImage} />
                    <p>Tasks: {goal.tasks ? goal.tasks.length : 0}</p>
                    <Button onClick={() => navigate(`/goaldetails/${goal.id}`)}>View Goal</Button>
                </div>
            ) : null}
        </div>
    );
};

const GoalsArea = () => {
    const [goalsData, setGoalsData] = useState([]);
    const [filteredGoals, setFilteredGoals] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
    const goalsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchGoals = useCallback(async () => {
        try {
            const { data } = await axiosReq.get(`/goals/`);
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
    }, [navigate]);

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

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
                <Button onClick={handleHome} className={styles.TopBarButton}>Home</Button>
                <div className={styles.SearchContainer}>
                    <input
                        type="text"
                        placeholder="Search goals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.SearchInput}
                    />
                </div>
                <Button onClick={handleCreateGoal} className={styles.TopBarButton}>Create Goal</Button>
            </div>
            <div className={styles.GoalsContainer}>
                {hasLoaded ? (
                    currentGoals.length > 0 ? (
                        currentGoals.map(goal => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                isMobile={isMobile}
                                isTablet={isTablet}
                            />
                        ))
                    ) : (
                        <p>No goals match your search criteria.</p>
                    )
                ) : (
                    <p>Loading Goals Data....</p>
                )}
            </div>
            {filteredGoals.length > goalsPerPage && (
                <div className={styles.PaginationContainer}>
                    <Button onClick={prevPage} disabled={currentPage === 1}>Previous</Button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button onClick={nextPage} disabled={currentPage === totalPages}>Next</Button>
                </div>
            )}
        </div>
    );
};

export default GoalsArea;