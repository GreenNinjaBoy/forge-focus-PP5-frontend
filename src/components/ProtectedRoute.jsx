import { Navigate, useParams } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { axiosReq } from '../api/axiosDefaults';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUser();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const checkAuthorization = async () => {
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
    };

    checkAuthorization();
  }, [currentUser, id]);

  if (currentUser === null || isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  if (!isAuthorized) {
    return <Navigate to="/notauthorized" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;