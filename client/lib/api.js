// api client using axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// fetch notifications for a user
export const getNotifications = async (userId) => {
  const response = await api.get(`/notifications?userId=${userId}`);
  return response.data;
};

// create an event (e.g., comment, follow)
export const createEvent = async (eventData) => {
  const response = await api.post('/events', eventData);
  return response.data;
};