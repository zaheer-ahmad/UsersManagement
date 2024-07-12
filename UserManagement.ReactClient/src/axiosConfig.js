// src/axiosConfig.js
import axios from "axios";
import conf from "./conf/conf";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: conf.baseUrl, // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or your state management (e.g., Redux)
    const token = sessionStorage.getItem("authToken");

    // If the token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
