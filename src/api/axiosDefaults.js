import axios from "axios";

// Base Axios configuration
axios.defaults.baseURL = "https://forge-focus-pp5-467431862e16.herokuapp.com";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Create Axios instances for requests and responses
export const axiosReq = axios.create();
export const axiosRes = axios.create();
