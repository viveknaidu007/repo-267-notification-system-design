// api client using axios
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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

// fetch all users
export const getUsers = async () => {
  const response = await api.get('/users'); // Add this endpoint later if needed
  return response.data;
};

// create a new user
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};