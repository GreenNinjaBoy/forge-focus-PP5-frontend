import { useEffect, useState } from "react";
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../pages/contexts/CurrentUserContext';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const navigate = useNavigate();

  const [goalsCount, setGoalsCount] = useState(0);

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

    if (currentUser) {
      fetchGoalsData();
    }
  }, [currentUser]);

  return (
    <div>
      { currentUser ? (
        <>
        <div>
        <h1>Welcome {currentUser.username}</h1>
        <p>You currently have {goalsCount} goals you are working hard to achieve</p>
        </div>
        <div>
          <Button onClick={() => navigate('/goalscreate')}>Create New Goal</Button>
          <Button onClick={() => navigate('/GoalsArea')}>View Goals</Button>
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