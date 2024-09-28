import { Navigate, useParams } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { axiosReq } from '../api/axiosDefaults';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const checkAuthorization = async () => {
      if (currentUser === null) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      if (currentUser && id) {
        try {
          const response = await axiosReq.get(`/goals/${id}/`);
          setIsAuthorized(response.data.is_owner);
        } catch (err) {
          console.error("Error checking authorization:", err);
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkAuthorization();
  }, [currentUser, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || !isAuthorized) {
    return <Navigate to="/notauthorized" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;