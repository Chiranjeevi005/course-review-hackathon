import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSheet = ({ isOpen, onClose, onApplyFilters, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    price_min: '',
    price_max: '',
    language: '',
    ...initialFilters
  });

  // Update filters when initialFilters change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      ...initialFilters
    }));
  }, [initialFilters]);

  const handleApply = () => {
    // Validate price inputs
    const validatedFilters = { ...filters };
    
    if (validatedFilters.price_min && isNaN(validatedFilters.price_min)) {
      validatedFilters.price_min = '';
    }
    
    if (validatedFilters.price_max && isNaN(validatedFilters.price_max)) {
      validatedFilters.price_max = '';
    }
    
    // Ensure min <= max if both are provided
    if (validatedFilters.price_min && validatedFilters.price_max) {
      const min = parseFloat(validatedFilters.price_min);
      const max = parseFloat(validatedFilters.price_max);
      if (min > max) {
        // Swap values
        validatedFilters.price_min = max.toString();
        validatedFilters.price_max = min.toString();
      }
    }
    
    onApplyFilters(validatedFilters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      category: '',
      level: '',
      price_min: '',
      price_max: '',
      language: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          ></motion.div>
          
          {/* Filter Sheet */}
          <motion.div 
            className="fixed inset-y-0 right-0 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 max-w-xs sm:max-w-md md:max-w-lg bg-card-100 shadow-xl"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              x: { type: "spring", damping: 35, stiffness: 250 },
              opacity: { duration: 0.25 }
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-3 sm:p-4 border-b border-muted-500 flex justify-between items-center">
                <h2 className="text-lg sm:text-h3 font-extrabold text-text-900">Filters</h2>
                <motion.button 
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-muted-500 hover:text-text-900 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500 rounded-full"
                  aria-label="Close filters"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Filter Options */}
              <div className="flex-grow overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-6">
                {/* Category Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <h3 className="font-semibold text-text-900 mb-2 sm:mb-3 text-sm sm:text-base">Category</h3>
                  <select 
                    value={filters.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-muted-500 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white transition-all duration-200 ease-in-out text-sm sm:text-base"
                  >
                    <option value="">All Categories</option>
                    <option value="web-development">Web Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="ai">Artificial Intelligence</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </select>
                </motion.div>
                
                {/* Level Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h3 className="font-semibold text-text-900 mb-2 sm:mb-3 text-sm sm:text-base">Level</h3>
                  <select 
                    value={filters.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-muted-500 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white transition-all duration-200 ease-in-out text-sm sm:text-base"
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </motion.div>
                
                {/* Price Range */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <h3 className="font-semibold text-text-900 mb-2 sm:mb-3 text-sm sm:text-base">Price Range (₹)</h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-muted-500 mb-1">Min Price (₹)</label>
                      <input
                        type="number"
                        value={filters.price_min}
                        onChange={(e) => handleInputChange('price_min', e.target.value)}
                        placeholder="0"
                        min="0"
                        className="w-full p-2 sm:p-3 border border-muted-500 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white transition-all duration-200 ease-in-out text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-muted-500 mb-1">Max Price (₹)</label>
                      <input
                        type="number"
                        value={filters.price_max}
                        onChange={(e) => handleInputChange('price_max', e.target.value)}
                        placeholder="10000"
                        min="0"
                        className="w-full p-2 sm:p-3 border border-muted-500 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white transition-all duration-200 ease-in-out text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-500 mt-2">Prices are displayed in Indian Rupees (₹)</p>
                </motion.div>
                
                {/* Language Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <h3 className="font-semibold text-text-900 mb-2 sm:mb-3 text-sm sm:text-base">Language</h3>
                  <select 
                    value={filters.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-muted-500 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white transition-all duration-200 ease-in-out text-sm sm:text-base"
                  >
                    <option value="">All Languages</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                </motion.div>
              </div>
              
              {/* Footer with Actions */}
              <div className="p-3 sm:p-4 border-t border-muted-500 flex space-x-2 sm:space-x-3">
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-grow px-3 sm:px-4 py-2 sm:py-3 border border-muted-500 text-text-900 rounded-lg hover:bg-muted-50 transition-all duration-200 ease-in-out font-medium focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
                >
                  Reset
                </motion.button>
                <motion.button
                  onClick={handleApply}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-grow px-3 sm:px-4 py-2 sm:py-3 bg-accent-500 text-text-900 rounded-lg hover:bg-opacity-90 transition-all duration-200 ease-in-out font-medium focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
                >
                  Apply Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterSheet;