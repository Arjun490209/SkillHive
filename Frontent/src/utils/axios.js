import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API,
  withCredentials: true    //! IMPORTANT for cookies
});

export default instance;