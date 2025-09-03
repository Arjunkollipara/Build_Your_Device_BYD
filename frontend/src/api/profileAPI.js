import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/profile" });

// Create or update profile
export const createOrUpdateProfile = (data) => API.post("/", data);

// Get profile by userId
export const getProfileByUserId = (userId) => API.get(`/${userId}`);
