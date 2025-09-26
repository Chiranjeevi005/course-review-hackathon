import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ courses: 0, categories: 0, users: 0 });
  const [activeTab, setActiveTab] = useState('courses');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    price: 0,
    rating: 0,
  });
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    icon: '',
  });

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    
    // Load users (mock data for now)
    const loadUsers = async () => {
      try {
        // In a real app, this would be an API call
        const mockUsers = [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', provider: 'local', createdAt: '2023-01-15' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', provider: 'google', createdAt: '2023-02-20' },
          { id: 3, name: 'Admin User', email: 'admin@coursefinder.com', role: 'admin', provider: 'local', createdAt: '2023-01-01' },
        ];
        setUsers(mockUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadUsers();
    }
  }, [user, navigate]);

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

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12 mt-12 sm:mt-16 md:mt-20">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
            Manage courses, categories, and user accounts
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-100">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Courses</h2>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-3 sm:mb-4">{stats.courses}</p>
              <button 
                onClick={() => setActiveTab('courses')}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Manage Courses
              </button>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 sm:p-6 border border-green-100">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Categories</h2>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-3 sm:mb-4">{stats.categories}</p>
              <button 
                onClick={() => setActiveTab('categories')}
                className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
              >
                Manage Categories
              </button>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 sm:p-6 border border-purple-100">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Users</h2>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600 mb-3 sm:mb-4">{stats.users}</p>
              <button 
                onClick={() => setActiveTab('users')}
                className="w-full bg-purple-600 text-white py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition text-sm sm:text-base"
              >
                Manage Users
              </button>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-10 md:mt-12">
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium text-sm sm:text-base ${
                  activeTab === 'courses' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium text-sm sm:text-base ${
                  activeTab === 'categories' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium text-sm sm:text-base ${
                  activeTab === 'users' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Users
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              {activeTab === 'courses' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Courses</h2>
                    <button
                      onClick={handleAddCourse}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Course
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Title</th>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Category</th>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Rating</th>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                          <tr key={course._id}>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base">
                              <div className="font-medium text-gray-900">{course.title}</div>
                            </td>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-500">
                              {course.categoryId?.name || 'N/A'}
                            </td>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-500">
                              {course.rating}
                            </td>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm space-x-2">
                              <button
                                onClick={() => handleEditCourse(course)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(course._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'categories' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Categories</h2>
                    <button
                      onClick={handleAddCategory}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Category
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Description</th>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Course Count</th>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category) => (
                          <tr key={category._id}>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base">
                              <div className="font-medium text-gray-900 flex items-center">
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                              </div>
                            </td>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 text-xs sm:text-sm md:text-base text-gray-500 max-w-xs truncate">
                              {category.description}
                            </td>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-500">
                              {category.courseCount}
                            </td>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm space-x-2">
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'users' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Manage Users</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Email</th>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Role</th>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base">
                              <div className="font-medium text-gray-900">{user.name}</div>
                            </td>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm space-x-2">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Modals */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              {editingCourse ? 'Edit Course' : 'Add Course'}
            </h3>
            <form onSubmit={handleCourseFormSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={courseForm.title}
                  onChange={handleCourseFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={courseForm.description}
                  onChange={handleCourseFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="categoryId"
                  value={courseForm.categoryId}
                  onChange={handleCourseFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={courseForm.price}
                    onChange={handleCourseFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={courseForm.rating}
                    onChange={handleCourseFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 sm:space-x-4 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
                >
                  {editingCourse ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </h3>
            <form onSubmit={handleCategoryFormSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={categoryForm.name}
                  onChange={handleCategoryFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={categoryForm.description}
                  onChange={handleCategoryFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={categoryForm.icon}
                  onChange={handleCategoryFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="e.g. 💻"
                />
              </div>
              <div className="flex justify-end space-x-3 sm:space-x-4 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
                >
                  {editingCategory ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;