import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();

  if (currentUser === null) {
    // Still loading, you might want to show a loading spinner here
    return null;
  }

  return currentUser ? children : <Navigate to="/notauthorized" />;
};

export default ProtectedRoute;