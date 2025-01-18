import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8101',
});

export const getHealth = () => api.get('/deed/health/');
export const getDeed = (id) => api.get(`/deed/${id}/`);
export const deleteDeed = (id) => api.delete(`/deed/${id}/`);
export const addDeed = (deed) => api.post('/deed/add/', deed);
export const addNotification = (id, notification) => 
  api.patch(`/deed/${id}/notification/`, { notification_time: notification });
export const renameDeed = (id, name) => api.patch(`/deed/${id}/rename/`, { name });
export const getDeedsByUser = (userId) => api.get(`/user/${userId}/deeds/`);
