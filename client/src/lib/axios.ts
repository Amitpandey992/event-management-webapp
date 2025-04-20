import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  // baseURL: "http://theroxeventorganisers.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
