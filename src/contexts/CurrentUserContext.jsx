import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = useCallback(async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleMount();
  }, [handleMount]);

  useEffect(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config.url.includes('dj-rest-auth/token/refresh/')) {
          try {
            const refreshToken = localStorage.getItem('refreshToken') || document.cookie.split('; ').find(row => row.startsWith('my-refresh-token=')).split('=')[1];
            const { data } = await axios.post('/dj-rest-auth/token/refresh/', { refresh: refreshToken });
            localStorage.setItem('accessToken', data.access);
            error.config.headers['Authorization'] = `Bearer ${data.access}`;
            return axios(error.config);
          } catch (refreshError) {
            setCurrentUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/signin');
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);
export const useSetCurrentUser = () => React.useContext(SetCurrentUserContext);