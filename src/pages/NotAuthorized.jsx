import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

/**
 * NotAuthorized component for displaying an unauthorized access message.
 * Provides buttons to navigate to the sign-in and sign-up pages.
 */

const NotAuthorized = () => {
  // Get the navigate function from react-router-dom to programmatically navigate
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