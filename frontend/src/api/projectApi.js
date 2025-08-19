import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/projects' });

export const createProject = (data) => API.post('/', data);
export const getProjects = () => API.get('/');
export const joinProject = (id, userId) => API.post(`/${id}/join`, { userId });
export const toggleProject = (id) => API.put(`/${id}/toggle`);
export const updateProject = (id, data) => API.put(`/${id}`, data);
