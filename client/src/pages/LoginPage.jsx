import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const [activeForm, setActiveForm] = useState('login'); 
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const { login, register, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Google login handler
  const handleGoogleLoginSuccess = async (response) => {
    setLoading(true);
    setLocalError('');
    
    try {
      const result = await googleLogin(response.access_token);
      if (result.success) {
        navigate('/');
      } else {
        setLocalError(result.error);
      }
    } catch (err) {
      setLocalError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    setLocalError('Google login failed. Please try again.');
  };

  // Form submit handler
  const handleLoginSubmit = async (formData) => {
    setLoading(true);
    setLocalError('');
    
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setLocalError(result.error);
      }
    } catch (err) {
      setLocalError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (formData) => {
    setLoading(true);
    setLocalError('');
    
    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setLocalError(result.error);
      }
    } catch (err) {
      setLocalError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex flex-col">
      <Navbar />
      
      <div className="flex items-center justify-center p-4 flex-grow">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-5 sm:space-y-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Account Access
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Choose an option below to continue
            </p>
          </div>

          {localError && (
            <div className="bg-red-50 text-red-700 p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
              {localError}
            </div>
          )}

          {/* Tab buttons for Sign In and Sign Up */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 sm:py-3 font-medium text-sm ${
                activeForm === 'login'
                  ? 'text-primary-700 border-b-2 border-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveForm('login')}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 sm:py-3 font-medium text-sm ${
                activeForm === 'register'
                  ? 'text-primary-700 border-b-2 border-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveForm('register')}
            >
              Sign Up
            </button>
          </div>

          {/* Show the active form */}
          <div className="pt-4 sm:pt-5">
            {activeForm === 'login' ? (
              <LoginForm 
                onSubmit={handleLoginSubmit}
                loading={loading}
                error={localError}
              />
            ) : (
              <RegisterForm 
                onSubmit={handleRegisterSubmit}
                loading={loading}
                error={localError}
              />
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div>
            <GoogleLoginButton
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;