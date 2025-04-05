import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
