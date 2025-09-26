import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onError, text = "Continue with Google", className = "", disabled = false }) => {
  // Check if we're in a browser environment and if the Google Client ID is configured
  const isGoogleLoginAvailable = typeof window !== 'undefined' && 
    import.meta.env.VITE_GOOGLE_CLIENT_ID && 
    import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE';

  const handleGoogleLogin = isGoogleLoginAvailable ? useGoogleLogin({
    onSuccess: onSuccess,
    onError: onError || (() => console.error('Google login failed'))
  }) : null;

  const handleClick = () => {
    if (!isGoogleLoginAvailable) {
      console.error('Google login is not configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file.');
      if (onError) {
        onError(new Error('Google login not configured'));
      }
      return;
    }
    
    if (handleGoogleLogin) {
      handleGoogleLogin();
    }
  };

  // If Google login is not available, show a disabled button with a tooltip
  if (!isGoogleLoginAvailable) {
    return (
      <div className="w-full">
        <button
          disabled
          className={`flex items-center justify-center gap-3 bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-500 cursor-not-allowed w-full ${className}`}
          title="Google login not configured - Please contact administrator"
        >
          <svg className="h-5 w-5 opacity-50" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>{text}</span>
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Google login not configured. Please contact administrator.
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      <span>{text}</span>
    </button>
  );
};

export default GoogleLoginButton;