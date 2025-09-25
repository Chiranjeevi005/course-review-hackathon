import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Authentication Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Auth Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Authenticated</p>
              <p className={`text-lg font-medium ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
                {isAuthenticated ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Admin</p>
              <p className={`text-lg font-medium ${isAdmin ? 'text-green-600' : 'text-red-600'}`}>
                {isAdmin ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
        
        {user && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-medium text-gray-900">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-medium text-gray-900">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Provider</p>
                <p className="text-lg font-medium text-gray-900">{user.provider}</p>
              </div>
            </div>
          </div>
        )}
        
        {accessToken && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Access Token</h2>
            <div className="break-words bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Token</p>
              <p className="text-gray-900">{accessToken}</p>
            </div>
          </div>
        )}
        
        <div className="flex space-x-4">
          {!isAuthenticated ? (
            <button
              onClick={handleLogin}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Test Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
          
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
          
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
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