import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import axios from '../utils/axiosConfig';
import Navbar from '../components/Navbar';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter options for the dropdown
  const filterOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'data-science', label: 'Data Science & Analytics' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'cloud', label: 'Cloud Computing' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'blockchain', label: 'Blockchain & Web3' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'business', label: 'Business & Entrepreneurship' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'leadership', label: 'Leadership & Management' },
    { value: 'health', label: 'Health & Fitness' },
    { value: 'language', label: 'Language Learning' },
    { value: 'music', label: 'Music & Audio' },
    { value: 'photography', label: 'Photography & Video' },
    { value: 'writing', label: 'Writing & Content Creation' },
    { value: 'career', label: 'Career Development' },
    { value: 'education', label: 'Education & Teaching' },
    { value: 'science', label: 'Science & Engineering' },
    { value: 'personal-development', label: 'Personal Development' }
  ];

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching categories from:', axios.defaults.baseURL);
        const response = await axios.get('/api/categories');
        console.log('Categories response:', response);
        
        // Check if response is valid
        if (response && response.data && response.data.success) {
          console.log('Categories data:', response.data.data);
          setCategories(response.data.data);
        } else {
          setError('Invalid response format from server');
        }
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Error fetching categories:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          console.error('Response headers:', err.response.headers);
        } else if (err.request) {
          console.error('Request data:', err.request);
        } else {
          console.error('Error message:', err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories based on search query and selected filter
  const filteredCategories = useMemo(() => {
    console.log('Categories data:', categories);
    console.log('Search query:', searchQuery);
    console.log('Selected filter:', selectedFilter);
    
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      console.log('No categories available');
      return [];
    }
    
    // Apply search and filter logic
    return categories.filter(category => {
      // Basic validation - only check for name
      if (!category.name) {
        return false;
      }
      
      // Search filter - check name and description if it exists
      const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter dropdown
      const matchesFilter = selectedFilter === 'all' || 
                           (category.filter && category.filter === selectedFilter);
      
      const result = matchesSearch && matchesFilter;
      console.log('Category:', category.name, 'matchesSearch:', matchesSearch, 'matchesFilter:', matchesFilter, 'result:', result);
      return result;
    });
  }, [categories, searchQuery, selectedFilter]);

  // Handle category click - navigate to category courses page
  const handleCategoryClick = (categoryId) => {
    navigate(`/courses/category/${categoryId}`);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Categories</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Learning Categories
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover courses across various fields and find the perfect learning path for your goals
          </motion.p>
          
          {/* Search and Filter */}
          <motion.div
            className="max-w-2xl sm:max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full px-4 py-2 sm:py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 sm:h-6 sm:w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 sm:py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {searchQuery || selectedFilter !== 'all' 
                ? `Search Results (${filteredCategories.length})` 
                : `All Categories (${categories.length})`}
            </h2>
          </div>
          
          {filteredCategories.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredCategories.map((category) => (
                <motion.div key={category._id} variants={item}>
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;