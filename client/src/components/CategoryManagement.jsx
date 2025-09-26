import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminModal from './AdminModal';

const CategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // create, edit, delete
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📁',
    filter: 'technology'
  });

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/categories');
      setCategories(response.data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = (mode, category = null) => {
    setModalMode(mode);
    setCurrentCategory(category);
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        icon: category.icon || '📁',
        filter: category.filter || 'technology'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: '📁',
        filter: 'technology'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'create') {
        // Add new category
        const response = await axios.post('/api/categories', formData);
        setCategories(prev => [...prev, response.data.data]);
      } else if (modalMode === 'edit' && currentCategory) {
        // Update category
        const response = await axios.put(`/api/categories/${currentCategory._id}`, formData);
        setCategories(prev => 
          prev.map(category => 
            category._id === currentCategory._id 
              ? response.data.data 
              : category
          )
        );
      }
      closeModal();
    } catch (err) {
      console.error('Error saving category:', err);
      setError('Failed to save category: ' + err.message);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/api/categories/${categoryId}`);
      setCategories(prev => prev.filter(category => category._id !== categoryId));
      closeModal();
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category: ' + err.message);
    }
  };

  // Filter options for categories
  const filterOptions = [
    'technology', 'mobile-development', 'data-science', 'ai', 'cloud', 
    'cybersecurity', 'blockchain', 'design', 'graphic-design', 'business', 
    'marketing', 'finance', 'leadership', 'health', 'language', 'music', 
    'photography', 'writing', 'career', 'education', 'science', 'personal-development'
  ];

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Category Management</h3>
          <p className="mt-1 text-sm text-gray-500">Manage all course categories in the platform</p>
        </div>
        <button
          onClick={() => openModal('create')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Category
        </button>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Filter
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Courses
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-xl">
                      {category.icon}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{category.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {category.filter}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.courseCount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openModal('edit', category)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3 inline-flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => openModal('delete', category)}
                    className="text-red-600 hover:text-red-900 inline-flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Edit/Delete */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalMode === 'create' ? 'Add New Category' :
          modalMode === 'edit' ? 'Edit Category' :
          'Delete Category'
        }
      >
        {modalMode === 'delete' ? (
          <div>
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            <p className="text-gray-500 mb-4 text-center">
              Are you sure you want to delete "<span className="font-semibold text-gray-900">{currentCategory?.name}</span>"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDelete(currentCategory?._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <input
                  type="text"
                  name="icon"
                  id="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">Enter an emoji or icon character</p>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter
                </label>
                <select
                  name="filter"
                  id="filter"
                  value={formData.filter}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  {filterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {modalMode === 'create' ? 'Add Category' : 'Update Category'}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
};

export default CategoryManagement;