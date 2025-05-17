import axios from "axios";

const api = axios.create({
  baseURL: "https://event-management-webapp-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
