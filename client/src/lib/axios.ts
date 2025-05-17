import axios from "axios";

const api = axios.create({
  baseURL: "https://event-management-webapp-client.onrender.com/api",
  // baseURL: "http://theroxeventorganisers.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
