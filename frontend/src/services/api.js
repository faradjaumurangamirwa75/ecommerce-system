import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.data?.message || error.message
    );

    return Promise.reject(error);
  }
);

export default API;