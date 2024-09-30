import { Navigate, useParams, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { axiosReq } from '../api/axiosDefaults';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/**
 * ProtectedRoute component for guarding routes that require
 * the user to be authenticated and, in some cases, authorized.
 * 
 * This component checks if the user is logged in and, for specific routes,
 * if they have permission to access the requested resource (goal or task).
 */
const ProtectedRoute = ({ children }) => {
  // Get the current user from the custom hook
  const currentUser = useCurrentUser();
  // State to track if the user is authorized to access the resource
  const [isAuthorized, setIsAuthorized] = useState(null);
  // State to track if the authorization check is still loading
  const [isLoading, setIsLoading] = useState(true);
  // Get the 'id' parameter from the URL, if any
  const { id } = useParams();
  // Get the current location (URL path)
  const location = useLocation();

  useEffect(() => {
    /**
     * Checks if the current user is authorized to access the resource.
     * If there's no user, sets authorized to false.
     * If there's a user and an ID, checks if the user owns the resource (goal or task).
     * If there's a user but no ID, assumes the user is authorized.
     */
    const checkAuthorization = async () => {
      if (!currentUser) {
        // No user is signed in
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      if (id) {
        // User is signed in and we're checking a specific resource
        try {
          let response;
          if (location.pathname.includes('goal')) {
            // Check authorization for goal-related routes
            response = await axiosReq.get(`/goals/${id}/`);
          } else if (location.pathname.includes('task')) {
            // Check authorization for task-related routes
            response = await axiosReq.get(`/tasks/${id}/`);
          }
          setIsAuthorized(response?.data?.is_owner);
        } catch (err) {
          console.error("Error checking authorization:", err);
          setIsAuthorized(false);
        }
      } else {
        // User is signed in but we're not checking a specific resource
        // (e.g., for list views like /goalsarea or /tasksarea)
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkAuthorization();
  }, [currentUser, id, location]);

  if (isLoading) {
    // Still checking authorization, show loading state
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // User is not signed in, redirect to sign in page
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!isAuthorized) {
    // User is signed in but not authorized, redirect to Not Authorized page
    return <Navigate to="/notauthorized" />;
  }

  // User is signed in and authorized, render the protected content
  return children;
};

// Define prop types for the ProtectedRoute component
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;