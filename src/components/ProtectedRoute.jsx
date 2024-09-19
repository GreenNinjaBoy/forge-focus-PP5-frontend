import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();
  console.log('ProtectedRoute: currentUser', currentUser);

  if (currentUser === null) {
    // User auth status is still being determined
    return <div>Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;