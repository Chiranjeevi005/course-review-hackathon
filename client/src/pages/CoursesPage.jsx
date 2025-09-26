import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import SearchBox from '../components/SearchBox';
import Navbar from '../components/Navbar';
import SkeletonCard from '../components/SkeletonCard';
import axios from '../utils/axiosConfig';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('popular');
  const coursesPerPage = 8;

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/courses');
        // Transform courses to match expected format
        const transformedCourses = response.data.data.map(course => ({
          id: course._id,
          title: course.title,
          description: course.description,
          provider: course.instructor.name,
          rating: course.rating,
          ratingCount: course.reviewsCount,
          price: course.price,
          originalPrice: course.originalPrice,
          duration: course.duration,
          category: course.categoryId,
          level: course.difficulty,
          language: 'english',
          thumbnail: course.thumbnail,
        }));
        setCourses(transformedCourses);
        setFilteredCourses(transformedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle search and filtering
  const handleSearch = (query, filterParams) => {
    setFilters(filterParams);
    let result = [...courses];
    
    // Apply search query filter
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(lowerQuery) ||
        course.provider.toLowerCase().includes(lowerQuery) ||
        (course.category && typeof course.category === 'object' && course.category.name && course.category.name.toLowerCase().includes(lowerQuery)) ||
        (typeof course.category === 'string' && course.category.toLowerCase().includes(lowerQuery))
      );
    }
    
    // Apply category filter
    if (filterParams.category) {
      result = result.filter(course => {
        if (course.category && typeof course.category === 'object') {
          return course.category._id === filterParams.category;
        }
        return course.category === filterParams.category;
      });
    }
    
    // Apply level filter
    if (filterParams.level) {
      result = result.filter(course => course.level === filterParams.level);
    }
    
    // Apply language filter
    if (filterParams.language) {
      result = result.filter(course => course.language === filterParams.language);
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
        sortedCourses.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
      case 'highest-rated':
        sortedCourses.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sortedCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'trending':
        sortedCourses.sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Courses That Inspire Growth
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Browse thousands of curated courses across top categories — tailored to your learning journey.
          </motion.p>
          
          {/* Search Box */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchBox onSearch={handleSearch} initialFilters={filters} />
          </motion.div>
        </div>
      </section>

      {/* Filters & Sorting Section */}
      <section className="py-6 sm:py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Filters Summary */}
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Category: {filters.category.replace('-', ' ')}
                </span>
              )}
              {filters.level && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Level: {filters.level}
                </span>
              )}
              {(filters.price_min || filters.price_max) && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Price: ₹{filters.price_min || 0} - ₹{filters.price_max || '∞'}
                </span>
              )}
              {Object.keys(filters).length > 0 && (
                <button 
                  onClick={() => {
                    setFilters({});
                    setFilteredCourses(courses);
                  }}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select 
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm sm:text-base"
              >
                <option value="popular">Most Popular</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {[...Array(8)].map((_, index) => (
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10"
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
                      className="flex justify-center mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === 1 
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                          }`}
                        >
                          Previous
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1;
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`px-4 py-2 rounded-lg ${
                                currentPage === pageNumber
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === totalPages 
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
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
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => {
                      setFilters({});
                      setFilteredCourses(courses);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
      <section className="py-12 sm:py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Not sure which course to choose?
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Try our Recommendation Engine to find courses tailored to your interests and goals
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-lg text-lg hover:opacity-90 transition-all duration-200 shadow-lg"
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