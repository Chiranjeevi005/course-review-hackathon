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
    navigate(`/courses/${categoryId}`);
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
      <div className="min-h-screen bg-muted-50 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
          <p className="mt-4 text-text-900">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted-50 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h3 className="text-h3 font-semibold text-text-900 mb-2">Error Loading Categories</h3>
          <p className="text-muted-500 mb-4">{error}</p>
          <button 
            className="bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted-50 w-full">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700/10 to-indigo-700/10 py-12 sm:py-16 md:py-20 w-full">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-h1 font-extrabold text-text-900 mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Explore Courses by Category
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto text-text-900 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Discover your passion and unlock new skills with our curated collection of learning paths.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto w-full mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-text-900 focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white shadow-soft-lg transition-all duration-200 ease-in-out pl-10 sm:pl-12 text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          {/* Filter Dropdown */}
          <motion.div
            className="max-w-md sm:max-w-lg mx-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="relative">
              <select
                className="w-full px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl text-text-900 focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white shadow-soft-lg transition-all duration-200 ease-in-out appearance-none text-sm sm:text-base"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-muted-500 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <motion.section 
        className="py-8 sm:py-12 md:py-16 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="container mx-auto px-4">
          {filteredCategories.length === 0 ? (
            <motion.div 
              className="text-center py-8 sm:py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-xl sm:text-h3 font-semibold text-text-900 mb-2">No categories found</h3>
              <p className="text-muted-500 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category._id}
                  variants={item}
                >
                  <CategoryCard category={category} onClick={handleCategoryClick} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-12 sm:py-14 md:py-16 bg-gradient-to-r from-primary-700 to-indigo-700 text-white w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-2xl sm:text-h2 font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Not sure where to start?
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Try our Recommendation Engine to discover personalized courses based on your interests and goals.
          </motion.p>
          <motion.button 
            className="bg-accent-500 text-text-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-opacity-90 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/recommendations')}
          >
            Find My Perfect Courses →
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default CategoriesPage;