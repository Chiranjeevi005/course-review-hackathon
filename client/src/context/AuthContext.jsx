import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set up axios defaults
  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials = true;
    
    // Check if we have a stored access token
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    // Try to load user profile if we have a token
    if (storedToken) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Function to load user profile
  const loadUserProfile = useCallback(async () => {
    try {
      const response = await axios.get('/auth/profile');
      setUser(response.data.user);
    } catch (err) {
      // If token is invalid, clear it
      localStorage.removeItem('accessToken');
      setAccessToken(null);
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('/auth/login', { email, password });
      
      const { accessToken, user } = response.data;
      
      // Store token and set axios defaults
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      // Set user
      setUser(user);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Google login function
  const googleLogin = async (credential) => {
    try {
      setError(null);
      const response = await axios.post('/auth/google', { credential });
      
      const { accessToken, user } = response.data;
      
      // Store token and set axios defaults
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      // Set user
      setUser(user);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Google login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await axios.post('/auth/register', { name, email, password });
      
      const { accessToken, user } = response.data;
      
      // Store token and set axios defaults
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      // Set user
      setUser(user);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear all auth data
      localStorage.removeItem('accessToken');
      setAccessToken(null);
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
      
      // Redirect to login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const response = await axios.post('/auth/refresh');
      const { accessToken: newAccessToken } = response.data;
      
      // Update token
      localStorage.setItem('accessToken', newAccessToken);
      setAccessToken(newAccessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      
      return newAccessToken;
    } catch (err) {
      // If refresh fails, logout user
      logout();
      throw new Error('Session expired. Please log in again.');
    }
  };

  // Context value
  const contextValue = {
    user,
    accessToken,
    loading,
    error,
    login,
    googleLogin,
    register,
    logout,
    refreshToken,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};