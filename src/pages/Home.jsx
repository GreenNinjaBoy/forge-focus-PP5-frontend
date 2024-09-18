import { useEffect, useState } from "react";
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../hooks/useCurrentUser';
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Home.module.css';

const Home = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const navigate = useNavigate();

  const [goalsCount, setGoalsCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const userResponse = await axiosReq.get('dj-rest-auth/user/');
        console.log('User data received:', userResponse.data);
        setCurrentUser(userResponse.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        setIsLoading(false);
        console.log('Loading completed');
      }
    };

    fetchUserData();
  }, [setCurrentUser]);

  useEffect(() => {
    console.log('Current user updated:', currentUser);
    
    const fetchGoalsData = async () => {
      try {
        const goalsResponse = await axiosReq.get('/goals/');
        console.log('Goals data received:', goalsResponse.data);
        setGoalsCount(goalsResponse.data.results.length);
      } catch (err) {
        console.error("Failed to fetch goals data", err);
      }
    };

    const fetchTasksData = async () => {
      try {
        const tasksResponse = await axiosReq.get('/tasks/');
        console.log('Tasks data received:', tasksResponse.data);
        const unassignedTasks = tasksResponse.data.results.filter(task => !task.goals);
        setTasksCount(unassignedTasks.length);
      } catch (err) {
        console.error("Failed to fetch tasks data", err);
      }
    };

    if (currentUser) {
      fetchGoalsData();
      fetchTasksData();
    }
  }, [currentUser]);

  console.log('Rendering Home component. isLoading:', isLoading, 'currentUser:', currentUser);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.homeContainer}>
      {currentUser ? (
        <>
          <h1 className={styles.heading}>Welcome, {currentUser.username}</h1>
          <div className={styles.cardContainer}>
            <Card className={styles.cardCustom}>
              <Card.Body>
                <Card.Title className={styles.cardTitleCustom}>Goals</Card.Title>
                <Card.Text className={styles.cardTextCustom}>
                  You currently have {goalsCount} goals you are working hard to achieve.
                </Card.Text>
                <div className={styles.buttonRow}>
                  <Button className={styles.buttonCustom} onClick={() => navigate('/goalscreate')}>Create New Goal</Button>
                  <Button className={styles.buttonCustom} onClick={() => navigate('/goalsarea')}>View Goals</Button>
                </div>
              </Card.Body>
            </Card>
            <Card className={styles.cardCustom}>
              <Card.Body>
                <Card.Title className={styles.cardTitleCustom}>Tasks</Card.Title>
                <Card.Text className={styles.cardTextCustom}>
                  You currently have {tasksCount} tasks that are not assigned to any goals.
                </Card.Text>
                <div className={styles.buttonRow}>
                  <Button className={styles.buttonCustom} onClick={() => navigate('/taskcreate')}>Create New Task</Button>
                  <Button className={styles.buttonCustom} onClick={() => navigate('/tasksarea')}>View Tasks</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </>
      ) : (
        <div className={styles.noUserInfo}>
          <h2>No User information to display</h2>
        </div>
      )}
    </div>
  );
};

export default Home;