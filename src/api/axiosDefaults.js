import axios from "axios";

// Base Axios configuration
axios.defaults.baseURL = "https://8000-greenninjab-forgefocusb-pqzs5ywqc6f.ws.codeinstitute-ide.net/";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Create Axios instances for requests and responses
export const axiosReq = axios.create();
export const axiosRes = axios.create();
