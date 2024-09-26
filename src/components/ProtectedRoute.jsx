import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import PropTypes from 'prop-types';

/**
 * ProtectedRoute component for guarding routes that require
 * the user to be authenticated.
 */

const ProtectedRoute = ({ children }) => {
  // Get the current user from the custom hook
  const currentUser = useCurrentUser();
  console.log('ProtectedRoute: currentUser', currentUser);

  // If the current user is null, display a loading message
  if (currentUser === null) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated, render the children components; otherwise, redirect to the sign-in page
  return currentUser ? children : <Navigate to="/signin" />;
};

// Define prop types for the ProtectedRoute component
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;