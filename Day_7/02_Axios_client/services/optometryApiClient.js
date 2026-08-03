// =========================================================================
// File: services/optometryApiClient.js
// Description: Centralized Axios instance configuration.
// =========================================================================
import axios from 'axios';

/**
 * ============================================================================
 * EXPLANATION: Axios Custom Instances & Interceptors
 * ============================================================================
 * Using a custom Axios instance allows us to define shared configurations (like
 * the base URL and timeout) so we don't have to repeat them in every request.
 * 
 * Interceptors act as middleware for our requests and responses:
 * - Request Interceptors run BEFORE the request is sent, perfect for attaching
 *   authentication tokens dynamically.
 * - Response Interceptors run BEFORE the `.then()` or `.catch()` in our components,
 *   making them ideal for global error handling (like logging out a user when
 *   they receive a 401 Unauthorized status).
 * ============================================================================
 */
// 1. Create a custom Axios instance with defaults:
const optometryApiClient = axios.create({
  baseURL: 'https://api.optical-clinic.com/v1', // Prepended to all relative URLs
  timeout: 10000, // Aborts the request if it takes longer than 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
  }
});

// 2. Request Interceptor: Attach authentication tokens automatically
optometryApiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage (or another secure location)
    const doctorAuthToken = localStorage.getItem('CLINIC_SECURE_TOKEN');
    
    if (doctorAuthToken) {
      // Attach the token as a Bearer header to authenticate the request
      config.headers['Authorization'] = `Bearer ${doctorAuthToken}`;
    }
    
    console.log(`[API Request]: ${config.method.toUpperCase()} -> ${config.url}`);
    return config;
  },
  (error) => {
    // Handle request configuration errors
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Global error handling
optometryApiClient.interceptors.response.use(
  (response) => {
    // Pass through successful responses without modification
    return response;
  },
  (error) => {
    // Handle specific HTTP status codes globally across the entire app
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Redirecting to login...");
      // This is where you might clear local storage and redirect the user
      // e.g., window.location.href = '/login';
    }
    
    // Reject the promise so the component's catch block can still handle it
    return Promise.reject(error);
  }
);

export default optometryApiClient;