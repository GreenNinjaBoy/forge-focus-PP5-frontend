import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router";
import { shouldRefreshToken } from "../utils/Utils";
import { CurrentUserContext, SetCurrentUserContext } from "../hooks/useCurrentUser";

/**
 * CurrentUserProvider component for managing and providing the current user context.
 */

export const CurrentUserProvider = ({ children }) => {
  // State to store the current user
  const [currentUser, setCurrentUser] = useState(null);
  
  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the navigate function from react-router to programmatically navigate
  const navigate = useNavigate();

  // Function to handle component mount and fetch the current user
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to run handleMount on component mount
  useEffect(() => {
    handleMount();
  }, []);

  // useMemo to set up axios interceptors for request and response
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("dj-rest-auth/token/refresh/");
          } catch {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {!isLoading && children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

// Define prop types for the CurrentUserProvider component. 
// This was to address the esLint error about props validation.
CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};