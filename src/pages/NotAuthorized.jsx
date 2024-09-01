import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>OOPS!!</h1>
      <h2>It looks like you are not authorized to access this page</h2>
      <p>If you are a user of Forge Focus, please sign in!</p>
      <p>If you are not a user, please sign up to use our features</p>

      <Button onClick={() => navigate('/signin')}>Sign In</Button>
      <Button onClick={() => navigate('/signup')}>Sign Up</Button>
    </div>
  );
};

export default NotAuthorized;