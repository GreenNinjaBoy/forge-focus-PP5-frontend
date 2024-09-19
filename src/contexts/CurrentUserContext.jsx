import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/Utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
      console.log("Current user set in context:", data);
    } catch (err) {
      console.log("Error fetching current user:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('dj-rest-auth/user/');
        setCurrentUser(data);
        console.log('CurrentUserContext: User fetched', data);
      } catch (err) {
        console.log('CurrentUserContext: Error fetching user', err);
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser(null);
            removeTokenTimestamp();
            navigate("/signin");
            return Promise.reject("Session expired. Please log in again.");
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
            return axios(err.config);
          } catch (refreshErr) {
            setCurrentUser(null);
            removeTokenTimestamp();
            navigate("/signin");
          }
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};