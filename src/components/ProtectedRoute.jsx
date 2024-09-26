import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();
  console.log('ProtectedRoute: currentUser', currentUser);

  if (currentUser === null) {
    return <div>Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/signin" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;