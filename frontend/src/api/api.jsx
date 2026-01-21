import axios from "axios";
import { getUserUUID } from "../utils/user";

// Create an Axios instance with the base URL of the backend API
const api = axios.create({
  baseURL: "http://localhost:8000/",
});

export const userUUID = getUserUUID();

export default api;
