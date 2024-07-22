import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => API.post('/login/', data);
export const signup = (data) => API.post('/signup/', data);
export const sendFriendRequest = (data) => API.post('/friend-requests/send_fr/', data);
export const acceptOrRejectFriendRequest = (data) => API.post('/friend-requests/accept_or_reject_fr/', data);
export const getFriendList = () => API.get('/friend-requests/get_friend_list/');
export const sendMessage = (data) => API.post(`/messages/send_message/`, data);

export default API;
