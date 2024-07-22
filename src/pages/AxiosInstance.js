import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8000/api/token/',  // Replace with your backend base URL
  timeout: 5000,  // Adjust timeout as needed
});

// Function to obtain JWT token
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('token/', { email, password });
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
  } catch (error) {
    throw error;  // Handle error in component
  }
};

// Set Authorization header for subsequent requests
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
