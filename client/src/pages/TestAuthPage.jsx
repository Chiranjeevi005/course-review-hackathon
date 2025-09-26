import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TestAuthPage = () => {
  const { user, accessToken, loading, login, logout, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login('test@example.com', 'password123');
    console.log('Login result:', result);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto p-4 sm:p-6 md:p-8 mt-16 sm:mt-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Authentication Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Auth Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Authenticated</p>
              <p className={`text-base sm:text-lg font-medium ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
                {isAuthenticated ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Admin</p>
              <p className={`text-base sm:text-lg font-medium ${isAdmin ? 'text-green-600' : 'text-red-600'}`}>
                {isAdmin ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
        
        {user && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">User Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Name</p>
                <p className="text-base sm:text-lg font-medium text-gray-900">{user.name}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Email</p>
                <p className="text-base sm:text-lg font-medium text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Role</p>
                <p className="text-base sm:text-lg font-medium text-gray-900">{user.role}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Provider</p>
                <p className="text-base sm:text-lg font-medium text-gray-900">{user.provider}</p>
              </div>
            </div>
          </div>
        )}
        
        {accessToken && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Access Token</h2>
            <div className="break-words bg-gray-100 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-500">Token</p>
              <p className="text-xs sm:text-sm text-gray-900">{accessToken}</p>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {!isAuthenticated ? (
            <button
              onClick={handleLogin}
              className="bg-primary-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-primary-700 transition text-sm sm:text-base"
            >
              Test Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
            >
              Logout
            </button>
          )}
          
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Go to Dashboard
          </button>
          
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-purple-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition text-sm sm:text-base"
            >
              Go to Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestAuthPage;