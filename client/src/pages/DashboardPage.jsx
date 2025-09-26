import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
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
    <div className="min-h-screen">
      <Navbar />
      
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 mt-12 sm:mt-16 md:mt-20">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">User Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-2 sm:mb-3">Account Information</h3>
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500">Name</p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500">Email</p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500">Role</p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-900">
                    <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500">Login Method</p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-900">{user.provider === 'google' ? 'Google' : 'Email & Password'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-2 sm:mb-3">Account Actions</h3>
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                <button className="w-full text-left px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base md:text-lg">
                  Edit Profile
                </button>
                <button className="w-full text-left px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base md:text-lg">
                  Change Password
                </button>
                <button className="w-full text-left px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base md:text-lg">
                  Notification Settings
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {user.role === 'admin' && (
          <div className="mt-6 sm:mt-8 md:mt-10 bg-white rounded-lg shadow p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">Admin Panel</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">As an administrator, you have access to additional features:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="border border-gray-200 rounded-lg p-3 sm:p-4 md:p-5">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base md:text-lg">User Management</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">Manage all users in the system</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 sm:p-4 md:p-5">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base md:text-lg">Course Management</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">Manage course listings and reviews</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 sm:p-4 md:p-5">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base md:text-lg">System Settings</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">Configure application settings</p>
              </div>
            </div>
            <div className="mt-6">
              <a 
                href="/admin-dashboard" 
                className="inline-flex items-center bg-primary-700 text-white px-4 py-2 rounded-md hover:bg-primary-800 transition-colors duration-200 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Go to Admin Dashboard
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;