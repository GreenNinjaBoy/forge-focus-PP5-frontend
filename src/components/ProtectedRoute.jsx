import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();

  if (currentUser === null) {
    // possibly add spinner here
    return null;
  }

  return currentUser ? children : <Navigate to="/notauthorized" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;