import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Button } from 'react-bootstrap';

const Home = () => {
  const currentUser = useCurrentUser();
  const [goalsCount, setGoalsCount] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchGoalsData = async () => {
    try {
      const response = await axios.get('goals/');
      setGoalsCount(response.data.results.length);
    } catch (err) {
      console.error('Failed to fetch goals data', err);
      setError('Failed to fetch goals data');
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchGoalsData();
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser ? (
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
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Home;