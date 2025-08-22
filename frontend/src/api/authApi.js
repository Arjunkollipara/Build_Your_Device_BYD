import api from './axios';

export const signup = (data) => api.post('/api/auth/signup', data).then(r => r.data);
export const login  = (data) => api.post('/api/auth/login',  data).then(r => r.data);
export const getMe  = ()      => api.get('/api/users/me').then(r => r.data);
