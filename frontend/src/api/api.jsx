import axios from "axios";
import { getUserUUID } from "../utils/user";

// Create an Axios instance with the base URL of the backend API
const api = axios.create({
  // baseURL: "http://localhost:8000/",
  baseURL: import.meta.env.VITE_API_URL || "https://insightfeed.onrender.com",
});

export const userUUID = getUserUUID();

export default api;
