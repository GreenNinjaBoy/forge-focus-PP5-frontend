import { useEffect, useState } from "react";
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const navigate = useNavigate();

  const [goalsCount, setGoalsCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axiosReq.get('/user/');
        setCurrentUser(userResponse.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUserData();
  }, [setCurrentUser]);

  useEffect(() => {
    const fetchGoalsData = async () => {
      try {
        const goalsResponse = await axiosReq.get('/goals/');
        setGoalsCount(goalsResponse.data.results.length);
      } catch (err) {
        console.error("Failed to fetch goals data", err);
      }
    };

    const fetchTasksData = async () => {
      try {
        const tasksResponse = await axiosReq.get('/tasks/');
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

  return (
    <div>
      { currentUser ? (
        <>
          <h1>Welcome {currentUser.username}</h1>
          <div className="d-flex justify-content-around">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Goals</Card.Title>
                <Card.Text>
                  You currently have {goalsCount} goals you are working hard to achieve.
                </Card.Text>
                <Button onClick={() => navigate('/goalscreate')}>Create New Goal</Button>
                <Button onClick={() => navigate('/goalsarea')}>View Goals</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Tasks</Card.Title>
                <Card.Text>
                  You currently have {tasksCount} tasks that are not assigned to any goals.
                </Card.Text>
                <Button onClick={() => navigate('/taskscreate')}>Create New Task</Button>
                <Button onClick={() => navigate('/TasksArea')}>View Tasks</Button>
              </Card.Body>
            </Card>
          </div>
        </>
      ) : (
        <div>
          <h2>No User information to display</h2>
        </div>
      )}
    </div>
  );
};

export default Home;