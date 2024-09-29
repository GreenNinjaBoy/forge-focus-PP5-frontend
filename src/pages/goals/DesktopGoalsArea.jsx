import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import GoalsView from "./GoalsView";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/GoalsArea.module.css";
import { Button } from "react-bootstrap";

/**
 * GoalsArea component for displaying a list of goals.
 * Fetches goals data from the API, manages search and pagination, and handles navigation.
 */

const GoalsArea = () => {
  // State to store the fetched goals data
  const [goalsData, setGoalsData] = useState([]);
  
  // State to store the filtered goals based on the search term
  const [filteredGoals, setFilteredGoals] = useState([]);
  
  // State to manage the loading status
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");
  
  // State to manage the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Number of goals to display per page
  const goalsPerPage = 6;
  
  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch goals data from the API
    const fetchGoals = async () => {
      try {
        // Make a GET request to fetch the goals data
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

    // Call the fetchGoals function on component mount
    fetchGoals();
  }, [navigate]);

  useEffect(() => {
    // Filter the goals based on the search term
    const results = goalsData.filter(goal =>
      goal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGoals(results);
    setCurrentPage(1);
  }, [searchTerm, goalsData]);

  // Function to handle navigation to the create goal page
  const handleCreateGoal = () => {
    navigate('/goalscreate');
  };

  // Function to handle navigation to the home page
  const handleHome = () => {
    navigate('/home');
  };

  // Calculate the indices for the current page's goals
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = filteredGoals.slice(indexOfFirstGoal, indexOfLastGoal);
  const totalPages = Math.ceil(filteredGoals.length / goalsPerPage);

  // Function to navigate to the next page
  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // Function to navigate to the previous page
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
            currentGoals.map(goal => {
              console.log("Goal data:", goal);
              console.log("Image URL:", goal.image);
              return (
                <GoalsView
                  key={goal.id}
                  id={goal.id}
                  name={goal.name}
                  image={goal.image}
                  tasksCount={goal.tasks ? goal.tasks.length : 0}
                />
              );
            })
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