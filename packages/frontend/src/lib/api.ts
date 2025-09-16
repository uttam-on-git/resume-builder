import axios from 'axios';

const api = axios.create({
  baseURL: 'https://resume-builder-gp1r.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

export default api;