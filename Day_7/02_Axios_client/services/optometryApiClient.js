// =========================================================================
// File: services/optometryApiClient.js
// Description: Centralized Axios instance configuration.
// =========================================================================
import axios from 'axios';

// 1. Create a custom Axios instance with defaults:
const optometryApiClient = axios.create({
  baseURL: 'https://api.optical-clinic.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
  }
});

// 2. Request Interceptor: Attach authentication tokens automatically
optometryApiClient.interceptors.request.use(
  (config) => {
    const doctorAuthToken = localStorage.getItem('CLINIC_SECURE_TOKEN');
    
    if (doctorAuthToken) {
      config.headers['Authorization'] = `Bearer ${doctorAuthToken}`;
    }
    
    console.log(`[API Request]: ${config.method.toUpperCase()} -> ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Global error handling
optometryApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific status codes globally
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Redirecting to login...");
      // e.g., window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default optometryApiClient;