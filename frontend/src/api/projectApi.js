import api from './axios';

export const createProject = (data) => api.post('/api/projects', data);
export const getProjects = () => api.get('/api/projects');
export const joinProject = (id, userId) => api.post(`/api/projects/${id}/join`, { userId });
export const toggleProject = (id) => api.put(`/api/projects/${id}/toggle`);
export const updateProject = (id, data) => api.put(`/api/projects/${id}`, data);
export const approveMember = (id, userId) => api.put(`/api/projects/${id}/approve`, { userId });
export const removeMember = (id, userId) => api.put(`/api/projects/${id}/remove`, { userId });
