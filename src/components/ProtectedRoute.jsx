import { Navigate, useParams } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { axiosReq } from '../api/axiosDefaults';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/**
 * ProtectedRoute component for guarding routes that require
 * the user to be authenticated and authorized.
 * 
 * This component checks if the user is logged in and has permission
 * to access the requested resource. If not, it redirects to the
 * appropriate page.
 *
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

  useEffect(() => {
    /**
     * Checks if the current user is authorized to access the resource.
     * If there's no user, sets authorized to false.
     * If there's a user and an ID, checks if the user owns the resource.
     * If there's a user but no ID, assumes the user is authorized.
     */
    const checkAuthorization = async () => {
      if (currentUser === null) {
        // No user is signed in
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      if (currentUser && id) {
        // User is signed in and we're checking a specific resource
        try {
          const response = await axiosReq.get(`/goals/${id}/`);
          setIsAuthorized(response.data.is_owner);
        } catch (err) {
          console.error("Error checking authorization:", err);
          setIsAuthorized(false);
        }
      } else {
        // User is signed in but we're not checking a specific resource
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkAuthorization();
  }, [currentUser, id]);

  if (isLoading) {
    // Still checking authorization, show loading state
    return <div>Loading...</div>;
  }

  if (!currentUser || !isAuthorized) {
    // User is not signed in or not authorized, redirect to Not Authorized page
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