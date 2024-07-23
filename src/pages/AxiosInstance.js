import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Function to refresh token
const refreshToken = async () => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  if (authTokens) {
    try {
      // Ensure the payload is correctly structured
      const response = await axiosInstance.post('/token/refresh/', {
        refresh: authTokens.refresh, // Correct payload structure
      });
      const newTokens = response.data;
      localStorage.setItem('authTokens', JSON.stringify(newTokens));
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newTokens.access}`;
      setupTokenRefreshTimer(); // Reset the refresh timer
      return newTokens;
    } catch (e) {
      console.error('Token refresh failed', e);
      // Handle logout or redirect to login
      // Example: window.location.href = '/login'; // Redirect to login page
    }
  }
  return null;
};

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    if (authTokens) {
      config.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to refresh token on 401 error
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newTokens = await refreshToken();
        if (newTokens) {
          originalRequest.headers['Authorization'] = `Bearer ${newTokens.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (e) {
        console.error('Token refresh failed', e);
        // Handle logout or redirect to login
        // Example: window.location.href = '/login'; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

// Set up a timer to refresh token before it expires
const setupTokenRefreshTimer = () => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  if (authTokens) {
    const accessTokenExpiration = jwtDecode(authTokens.access).exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiration = accessTokenExpiration - currentTime;

    // Refresh token 1 minute before expiry
    const refreshTime = (timeUntilExpiration - 60) * 1000;
    if (refreshTime > 0) {
      setTimeout(() => {
        refreshToken();
      }, refreshTime);
    }
  }
};

// Call this function when your app initializes
setupTokenRefreshTimer();

export default axiosInstance;
