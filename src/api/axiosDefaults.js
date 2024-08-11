import axios from "axios";

// Base Axios configuration
axios.defaults.baseURL = "https://8000-greenninjab-forgefocusb-pqzs5ywqc6f.ws.codeinstitute-ide.net/";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Create Axios instances for requests and responses
export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Add a request interceptor to include the token
axiosReq.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh or other responses
axiosRes.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token refresh or other error responses here if needed
    return Promise.reject(error);
  }
);