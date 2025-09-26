import axios from 'axios';

// Create axios instance
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3003';
console.log('Creating axios instance with baseURL:', baseURL);
const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true
});
console.log('Axios instance created:', apiClient);

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    console.log('Axios request config:', config);
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Axios request config after token:', config);
    return config;
  },
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    console.log('Axios response:', response);
    return response;
  },
  async (error) => {
    console.error('Axios response error:', error);
    const originalRequest = error.config;
    console.error('Original request config:', originalRequest);
    
    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const response = await apiClient.post(
          `/auth/refresh`,
          {},
          { withCredentials: true }
        );
        
        const { accessToken } = response.data;
        
        // Store new token
        localStorage.setItem('accessToken', accessToken);
        
        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear auth data and redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;