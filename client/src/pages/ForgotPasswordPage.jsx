import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // In a real app, this would be an API call
      // await axios.post('/auth/forgot-password', { email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
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
              Reset Password
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 text-green-700 p-3 sm:p-4 rounded-lg text-sm">
              <p className="font-medium">Check your email</p>
              <p className="mt-1 text-xs sm:text-sm">We've sent a password reset link to {email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm sm:text-base"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          )}

          <div className="text-center text-xs sm:text-sm text-gray-600">
            <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;