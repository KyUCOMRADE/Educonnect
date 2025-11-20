// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // uses Vite proxy in vite.config.js -> /api -> http://localhost:5000
  withCredentials: true, // include cookies if your backend uses them
  timeout: 10000,
});

// Attach token from localStorage automatically
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
