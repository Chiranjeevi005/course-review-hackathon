import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FilterSheet from './FilterSheet';
import { useAuth } from '../context/AuthContext';
import tracking from '../utils/tracking';

const SearchBox = ({ onSearch, initialFilters = {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Track search event if user is logged in
    if (user && searchQuery.trim()) {
      tracking.trackSearch(user._id, searchQuery);
    }
    
    // Pass search query and filters to parent component
    if (onSearch) {
      onSearch(searchQuery, appliedFilters);
    }
    console.log('Searching for:', searchQuery, 'with filters:', appliedFilters);
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    // Trigger search with new filters
    if (onSearch) {
      onSearch(searchQuery, filters);
    }
    console.log('Applied filters:', filters);
  };

  return (
    <>
      <motion.form 
        role="search" 
        onSubmit={handleSearch}
        className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex shadow-lg rounded-lg overflow-hidden"
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          aria-label="Search courses"
          placeholder="Search courses, topics, or instructors"
          className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 text-text-900 bg-white/95 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all duration-200 ease-in-out text-sm sm:text-base"
        />
        <motion.button
          type="submit"
          whileHover={{ backgroundColor: "#e6951d" }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 bg-accent-500 text-text-900 font-semibold hover:bg-opacity-90 transition-all duration-200 ease-in-out shadow-md text-sm sm:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.button>
        
        {/* Filters button - hidden on mobile, visible on sm and up */}
        <button
          type="button"
          onClick={() => setIsFilterSheetOpen(true)}
          className="hidden sm:flex absolute right-20 sm:right-24 md:right-28 top-1/2 bg-card-100 text-text-900 px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 rounded-lg items-center text-xs sm:text-sm border border-muted-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 transform -translate-y-1/2 hover:bg-gray-100 transition-colors duration-200 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="hidden md:inline">Filters</span>
          <span className="md:hidden">Filter</span>
        </button>
        
        {/* Mobile filter button - visible only on mobile */}
        <button
          type="button"
          onClick={() => setIsFilterSheetOpen(true)}
          className="sm:hidden absolute right-12 top-1/2 bg-card-100 text-text-900 p-1.5 rounded-lg flex items-center text-xs border border-muted-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 transform -translate-y-1/2 hover:bg-gray-100 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
        
        {/* Search suggestions dropdown (mock) */}
        {isFocused && searchQuery.length > 0 && (
          <motion.div 
            className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-10 border border-muted-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="py-1">
              <motion.div 
                className="px-3 py-2 hover:bg-muted-50 cursor-pointer flex items-center text-sm"
                whileHover={{ backgroundColor: "#f9fafb" }}
                transition={{ duration: 0.15 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span><span className="font-medium">React</span> fundamentals course</span>
              </motion.div>
              <motion.div 
                className="px-3 py-2 hover:bg-muted-50 cursor-pointer flex items-center text-sm"
                whileHover={{ backgroundColor: "#f9fafb" }}
                transition={{ duration: 0.15 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Advanced <span className="font-medium">JavaScript</span> techniques</span>
              </motion.div>
              <motion.div 
                className="px-3 py-2 hover:bg-muted-50 cursor-pointer flex items-center text-sm"
                whileHover={{ backgroundColor: "#f9fafb" }}
                transition={{ duration: 0.15 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span><span className="font-medium">Python</span> for data science</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.form>
      
      {/* Filter Sheet */}
      <FilterSheet 
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={appliedFilters}
      />
    </>
  );
};

export default SearchBox;