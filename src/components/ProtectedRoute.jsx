import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <Navigate to="/notAuthorized" />;
  }

  return children;
};

export default ProtectedRoute;