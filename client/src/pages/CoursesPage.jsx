import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import SearchBox from '../components/SearchBox';
import Navbar from '../layouts/Navbar';
import SkeletonCard from '../components/SkeletonCard';
import axios from '../services/axiosConfig';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('popular');
  const [categories, setCategories] = useState([]);
  const [categoriesWithCourses, setCategoriesWithCourses] = useState([]);
  const categoryScrollRef = useRef(null);
  const coursesPerPage = 12; // Increased to show more courses per page

  // Fetch all courses and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch categories
        const categoriesResponse = await axios.get('/api/categories');
        const allCategories = categoriesResponse.data.data || [];
        setCategories(allCategories);
        
        // Fetch ALL courses (increased limit to get all 88 courses)
        const response = await axios.get('/api/courses?limit=100'); // Get all courses
        // Transform courses to match expected format
        const transformedCourses = response.data.data.map(course => ({
          id: course._id,
          title: course.title,
          description: course.description,
          provider: course.instructor?.name || 'Unknown Instructor',
          rating: course.rating,
          ratingCount: course.reviewsCount,
          price: course.price,
          originalPrice: course.originalPrice,
          duration: course.duration,
          category: course.categoryId, // Keep the entire categoryId object
          level: course.difficulty,
          language: course.language || 'english',
          thumbnail: course.thumbnail,
          courseId: course._id // Add this for consistency with CourseCard
        }));
        setCourses(transformedCourses);
        setFilteredCourses(transformedCourses);
        
        // Filter categories to only show those with courses
        const courseCategoryIds = [...new Set(transformedCourses.map(course => 
          course.category && typeof course.category === 'object' ? course.category._id : course.category
        ))].filter(Boolean);
        
        const categoriesWithCourses = allCategories.filter(category => 
          courseCategoryIds.includes(category._id)
        );
        
        setCategoriesWithCourses(categoriesWithCourses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search and filtering
  const handleSearch = (query, filterParams) => {
    setFilters(filterParams);
    let result = [...courses];
    
    // Apply search query filter
    if (query) {
      const lowerQuery = query.toLowerCase().trim();
      if (lowerQuery.length > 0) {
        result = result.filter(course => 
          course.title.toLowerCase().includes(lowerQuery) ||
          course.provider.toLowerCase().includes(lowerQuery) ||
          course.description.toLowerCase().includes(lowerQuery) ||
          (course.category && typeof course.category === 'object' && course.category.name && course.category.name.toLowerCase().includes(lowerQuery)) ||
          (typeof course.category === 'string' && course.category.toLowerCase().includes(lowerQuery)) ||
          (course.level && course.level.toLowerCase().includes(lowerQuery))
        );
      }
    }
    
    // Apply category filter
    if (filterParams.category) {
      result = result.filter(course => {
        // If course.category is an object, compare with its _id
        if (course.category && typeof course.category === 'object' && course.category._id) {
          return course.category._id === filterParams.category;
        }
        // If course.category is a string, compare directly
        if (course.category) {
          return course.category === filterParams.category;
        }
        // If course.categoryId is an object, compare with its _id
        if (course.categoryId && typeof course.categoryId === 'object' && course.categoryId._id) {
          return course.categoryId._id === filterParams.category;
        }
        return false;
      });
    }
    
    // Apply level filter
    if (filterParams.level) {
      result = result.filter(course => course.level && course.level.toLowerCase() === filterParams.level.toLowerCase());
    }
    
    // Apply language filter
    if (filterParams.language) {
      result = result.filter(course => course.language && course.language.toLowerCase() === filterParams.language.toLowerCase());
    }
    
    // Apply price range filters
    if (filterParams.price_min) {
      const minPrice = parseFloat(filterParams.price_min);
      result = result.filter(course => course.price >= minPrice);
    }
    
    if (filterParams.price_max) {
      const maxPrice = parseFloat(filterParams.price_max);
      result = result.filter(course => course.price <= maxPrice);
    }
    
    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    let sortedCourses = [...filteredCourses];
    
    switch (option) {
      case 'popular':
        sortedCourses.sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0));
        break;
      case 'highest-rated':
        sortedCourses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // Sort by ID creation time (MongoDB ObjectId contains timestamp)
        sortedCourses.sort((a, b) => {
          // Extract timestamp from MongoDB ObjectId
          const timestampA = a.id ? a.id.substring(0, 8) : '';
          const timestampB = b.id ? b.id.substring(0, 8) : '';
          // Convert hex timestamp to decimal and compare
          return parseInt(timestampB, 16) - parseInt(timestampA, 16);
        });
        break;
      case 'trending':
        sortedCourses.sort((a, b) => 
          (b.rating || 0) - (a.rating || 0) || 
          (b.ratingCount || 0) - (a.ratingCount || 0)
        );
        break;
      case 'price-low':
        sortedCourses.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        sortedCourses.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'title-a-z':
        sortedCourses.sort((a, b) => 
          (a.title || '').localeCompare(b.title || '')
        );
        break;
      case 'title-z-a':
        sortedCourses.sort((a, b) => 
          (b.title || '').localeCompare(a.title || '')
        );
        break;
      default:
        break;
    }
    
    setFilteredCourses(sortedCourses);
  };

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of courses section
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Handle category filter with better UX
  const handleCategoryFilter = (categoryId) => {
    // If the same category is clicked again, clear the filter
    const newFilters = categoryId === filters.category 
      ? { ...filters, category: '' } 
      : { ...filters, category: categoryId };
    
    setFilters(newFilters);
    handleSearch('', newFilters); // Apply the category filter
  };

  // Scroll category section
  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200;
      const newScrollPosition = direction === 'left' 
        ? categoryScrollRef.current.scrollLeft - scrollAmount
        : categoryScrollRef.current.scrollLeft + scrollAmount;
      
      categoryScrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Calculate course counts per category
  const getCategoryCourseCount = (categoryId) => {
    return courses.filter(course => {
      // If course.category is an object, compare with its _id
      if (course.category && typeof course.category === 'object' && course.category._id) {
        return course.category._id === categoryId;
      }
      // If course.category is a string, compare directly
      if (course.category) {
        return course.category === categoryId;
      }
      // If course.categoryId is an object, compare with its _id
      if (course.categoryId && typeof course.categoryId === 'object' && course.categoryId._id) {
        return course.categoryId._id === categoryId;
      }
      return false;
    }).length;
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

  // Hide scrollbar CSS
  const hideScrollbarStyle = `
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <div className="min-h-screen">
      <style>{hideScrollbarStyle}</style>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-20 bg-gradient-to-r from-primary-700 to-indigo-700 text-white">
        <div className="px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Courses That Inspire Growth
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Browse thousands of curated courses across top categories — tailored to your learning journey.
          </motion.p>
          
          {/* Search Box */}
          <motion.div
            className="max-w-2xl sm:max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchBox onSearch={handleSearch} initialFilters={filters} />
          </motion.div>
        </div>
      </section>

      {/* Category Filter Section - ENHANCED */}
      <section className="py-6 sm:py-8 bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-text-900">Browse by Category</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => scrollCategories('left')}
                className="p-1.5 sm:p-2 rounded-full bg-muted-50 hover:bg-muted-500 hover:bg-opacity-20 text-text-900 transition-colors"
                aria-label="Scroll left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => scrollCategories('right')}
                className="p-1.5 sm:p-2 rounded-full bg-muted-50 hover:bg-muted-500 hover:bg-opacity-20 text-text-900 transition-colors"
                aria-label="Scroll right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div 
            ref={categoryScrollRef}
            className="flex overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar"
          >
            <div className="flex space-x-2 sm:space-x-3 min-w-max">
              <button
                onClick={() => handleCategoryFilter('')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
                  !filters.category 
                    ? 'bg-primary-700 text-white shadow-md transform scale-105' 
                    : 'bg-muted-50 text-text-900 hover:bg-muted-500 hover:bg-opacity-20'
                }`}
              >
                All Courses
              </button>
              {categoriesWithCourses.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryFilter(category._id)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all whitespace-nowrap flex items-center ${
                    filters.category === category._id
                      ? 'bg-primary-700 text-white shadow-md transform scale-105' 
                      : 'bg-muted-50 text-text-900 hover:bg-muted-500 hover:bg-opacity-20'
                  }`}
                >
                  <span className="mr-2">{category.icon || '📚'}</span>
                  <span className="mr-1">{category.name}</span>
                  <span className="bg-primary-700 bg-opacity-20 text-primary-700 text-xs font-medium px-1.5 py-0.5 rounded-full">
                    {getCategoryCourseCount(category._id)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Sorting Section */}
      <section className="py-6 sm:py-8 bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Filters Summary */}
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <span className="px-3 py-1 bg-muted-50 text-text-900 rounded-full text-sm font-medium flex items-center">
                  <span className="mr-2">Category:</span>
                  <span className="font-semibold">{categories.find(cat => cat._id === filters.category)?.name || filters.category.replace('-', ' ')}</span>
                  <button 
                    onClick={() => {
                      const newFilters = { ...filters, category: '' };
                      setFilters(newFilters);
                      handleSearch('', newFilters);
                    }}
                    className="ml-2 text-text-900 hover:text-primary-700 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.level && (
                <span className="px-3 py-1 bg-muted-50 text-text-900 rounded-full text-sm font-medium flex items-center">
                  <span className="mr-2">Level:</span>
                  <span className="font-semibold">{filters.level}</span>
                  <button 
                    onClick={() => {
                      const newFilters = { ...filters, level: '' };
                      setFilters(newFilters);
                      handleSearch('', newFilters);
                    }}
                    className="ml-2 text-text-900 hover:text-primary-700 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {(filters.price_min || filters.price_max) && (
                <span className="px-3 py-1 bg-muted-50 text-text-900 rounded-full text-sm font-medium flex items-center">
                  <span className="mr-2">Price:</span>
                  <span className="font-semibold">₹{filters.price_min || 0} - ₹{filters.price_max || '∞'}</span>
                  <button 
                    onClick={() => {
                      const newFilters = { ...filters, price_min: '', price_max: '' };
                      setFilters(newFilters);
                      handleSearch('', newFilters);
                    }}
                    className="ml-2 text-text-900 hover:text-primary-700 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.language && (
                <span className="px-3 py-1 bg-muted-50 text-text-900 rounded-full text-sm font-medium flex items-center">
                  <span className="mr-2">Language:</span>
                  <span className="font-semibold">{filters.language}</span>
                  <button 
                    onClick={() => {
                      const newFilters = { ...filters, language: '' };
                      setFilters(newFilters);
                      handleSearch('', newFilters);
                    }}
                    className="ml-2 text-text-900 hover:text-primary-700 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {Object.keys(filters).some(key => filters[key]) && (
                <button 
                  onClick={() => {
                    setFilters({});
                    setFilteredCourses(courses);
                  }}
                  className="px-3 py-1 bg-muted-50 text-text-900 rounded-full text-sm font-medium hover:bg-muted-500 hover:bg-opacity-20 transition-colors flex items-center"
                >
                  <span className="mr-1">Clear All</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-text-900 font-medium">Sort by:</span>
              <select 
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="px-3 py-2 border border-muted-500 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white text-sm sm:text-base text-text-900"
              >
                <option value="popular">Most Popular</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="trending">Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title-a-z">Title: A to Z</option>
                <option value="title-z-a">Title: Z to A</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Results summary */}
          <div className="mb-4 sm:mb-6">
            <p className="text-muted-500 text-sm sm:text-base">
              Showing <span className="font-semibold text-text-900">{currentCourses.length}</span> of{' '}
              <span className="font-semibold text-text-900">{filteredCourses.length}</span> courses
              {filters.category && (
                <span> in <span className="font-semibold text-text-900">{categories.find(cat => cat._id === filters.category)?.name || 'selected category'}</span></span>
              )}
            </p>
          </div>
          
          {isLoading ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {[...Array(12)].map((_, index) => (
                <motion.div key={index} variants={item}>
                  <SkeletonCard />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <>
              {currentCourses.length > 0 ? (
                <>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {currentCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        variants={item}
                        whileHover={{ 
                          scale: 1.03, 
                          y: -5,
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <CourseCard course={course} />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div 
                      className="flex justify-center mt-6 sm:mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                            currentPage === 1 
                              ? 'bg-muted-50 text-muted-500 cursor-not-allowed' 
                              : 'bg-white text-text-900 hover:bg-muted-50 shadow'
                          }`}
                        >
                          Previous
                        </button>
                        
                        {/* Show first page */}
                        {currentPage > 2 && (
                          <>
                            <button
                              onClick={() => handlePageChange(1)}
                              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white text-text-900 hover:bg-muted-50 shadow text-sm sm:text-base"
                            >
                              1
                            </button>
                            {currentPage > 3 && (
                              <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-text-900 text-sm sm:text-base">...</span>
                            )}
                          </>
                        )}
                        
                        {/* Show pages around current page */}
                        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                          let pageNumber;
                          if (totalPages <= 3) {
                            pageNumber = i + 1;
                          } else if (currentPage === 1) {
                            pageNumber = i + 1;
                          } else if (currentPage === totalPages) {
                            pageNumber = totalPages - 2 + i;
                          } else {
                            pageNumber = currentPage - 1 + i;
                          }
                          
                          // Ensure page number is within valid range
                          if (pageNumber < 1 || pageNumber > totalPages) return null;
                          
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                                currentPage === pageNumber
                                  ? 'bg-primary-700 text-white'
                                  : 'bg-white text-text-900 hover:bg-muted-50 shadow'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                        
                        {/* Show last page */}
                        {currentPage < totalPages - 1 && (
                          <>
                            {currentPage < totalPages - 2 && (
                              <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-text-900 text-sm sm:text-base">...</span>
                            )}
                            <button
                              onClick={() => handlePageChange(totalPages)}
                              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white text-text-900 hover:bg-muted-50 shadow text-sm sm:text-base"
                            >
                              {totalPages}
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                            currentPage === totalPages 
                              ? 'bg-muted-50 text-muted-500 cursor-not-allowed' 
                              : 'bg-white text-text-900 hover:bg-muted-50 shadow'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-xl font-semibold text-text-900 mb-2">No courses found</h3>
                  <p className="text-muted-500 mb-4">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => {
                      setFilters({});
                      setFilteredCourses(courses);
                    }}
                    className="px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Recommendation CTA Section */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#0f4c81] text-white">
        <div className="px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Not sure which course to choose?
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Try our Recommendation Engine to find courses tailored to your interests and goals
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-[#0f4c81] font-bold rounded-lg text-base sm:text-lg hover:bg-[#e0e0e0] transition-all duration-200 shadow-md"
            onClick={() => window.location.href = '/recommendations'}
          >
            Get Personalized Recommendations →
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;