import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router";
import { getRefreshToken, shouldRefreshToken, setTokens, removeTokens } from "../utils/Utils";
import { CurrentUserContext, SetCurrentUserContext } from "../hooks/useCurrentUser";

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
        async (config) => {
            if (shouldRefreshToken()) {
                try {
                    const refreshToken = getRefreshToken();
                    const response = await axios.post("dj-rest-auth/token/refresh/", {
                        refresh: refreshToken
                    });
                    setTokens(response.data);
                } catch (err) {
                    setCurrentUser(null);
                    removeTokens();
                    navigate("/signin");
                    return Promise.reject(err);
                }
            }
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
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
                    const refreshToken = getRefreshToken();
                    const response = await axios.post("/dj-rest-auth/token/refresh/", {
                        refresh: refreshToken
                    });
                    setTokens(response.data);
                    err.config.headers["Authorization"] = `Bearer ${response.data.access_token}`;
                    return axios(err.config);
                } catch (refreshErr) {
                    setCurrentUser(null);
                    removeTokens();
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

CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};