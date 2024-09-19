import axios from "axios";

axios.defaults.baseURL = "https://forge-focus-api-backend-83543ef108af.herokuapp.com";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();