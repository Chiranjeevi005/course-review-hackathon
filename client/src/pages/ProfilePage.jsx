import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-10 mt-16 sm:mt-20">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">User Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Personal Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Name</p>
                  <p className="text-sm sm:text-base text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Email</p>
                  <p className="text-sm sm:text-base text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Role</p>
                  <p className="text-sm sm:text-base text-gray-900">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Account Details</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Login Method</p>
                  <p className="text-sm sm:text-base text-gray-900">{user.provider === 'google' ? 'Google' : 'Email & Password'}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Member Since</p>
                  <p className="text-sm sm:text-base text-gray-900">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Account Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <button className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-left text-sm sm:text-base">
                Edit Profile
              </button>
              <button className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-left text-sm sm:text-base">
                Change Password
              </button>
              <button className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-left text-sm sm:text-base">
                Notification Preferences
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;