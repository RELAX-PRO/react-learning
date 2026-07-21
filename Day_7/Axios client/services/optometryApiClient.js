// =========================================================================
// File: services/optometryApiClient.js (The Centralized Axios Instance)
// =========================================================================
import axios from 'axios';

// 1. Create a custom Axios Client with pre-configured defaults:
const optometryApiClient = axios.create({
  // The base URL for all clinical endpoints:
  baseURL: 'https://api.optical-clinic.com/v1',
  
  // Abort request if server takes longer than 10 seconds to respond:
  timeout: 10000,
  
  // Standard headers sent with every request:
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
  }
});

// 2. REQUEST INTERCEPTOR: The "Security Gate" before sending data to server
optometryApiClient.interceptors.request.use(
  (config) => {
    // Dynamically grab the doctor's secure login token from local storage or memory:
    const doctorAuthToken = localStorage.getItem('CLINIC_SECURE_TOKEN');
    
    if (doctorAuthToken) {
      // Automatically attach token to the Authorization header:
      config.headers['Authorization'] = `Bearer ${doctorAuthToken}`;
    }
    
    console.log(`🚀 [API Request outgoing]: ${config.method.toUpperCase()} -> ${config.url}`);
    return config; // Let the modified request fly!
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. RESPONSE INTERCEPTOR: The "Quality Control" before data reaches React components
optometryApiClient.interceptors.response.use(
  (response) => {
    // If the server responded with 2xx success, return ONLY the unpacked data!
    return response;
  },
  (error) => {
    // Global Error Handling: What if the doctor's token expired (401 Unauthorized)?
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Doctor session expired! Forcing logout...");
      // Optionally redirect to login screen: window.location.href = '/login';
    }
    
    // Return the clean error message to the React component:
    return Promise.reject(error);
  }
);

export default optometryApiClient;