import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ Base URL from .env
  withCredentials: true, // ✅ Always send cookies (for HttpOnly auth)
});

// Optional: interceptors for handling tokens, errors, etc.
api.interceptors.request.use(
  (config) => {
    // You can attach extra headers here if needed
    // Example: config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
