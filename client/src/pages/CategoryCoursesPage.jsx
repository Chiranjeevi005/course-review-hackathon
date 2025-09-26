import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import Navbar from '../components/Navbar';
import axios from '../utils/axiosConfig';
import SkeletonCard from '../components/SkeletonCard';

const CategoryCoursesPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('popularity');
  const [activeFilters, setActiveFilters] = useState([]);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  // Initialize courses and category
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Category ID from URL:', categoryId);
        
        let categoryResponse;
        // Always try to find by slug first, then by ID
        console.log('Fetching all categories to find by slug:', categoryId);
        const allCategoriesResponse = await axios.get('/api/categories');
        const matchedCategory = allCategoriesResponse.data.data.find(cat => cat.slug === categoryId);
        
        if (matchedCategory) {
          console.log('Found category by slug:', matchedCategory);
          categoryResponse = {
            data: {
              success: true,
              data: matchedCategory
            }
          };
        } else {
          // If not found by slug, try by ID
          console.log('Category not found by slug, trying by ID');
          // Check if categoryId looks like a MongoDB ID (24 hex characters)
          const isMongoId = categoryId && categoryId.length === 24 && /^[0-9a-fA-F]+$/.test(categoryId);
          console.log('Is MongoDB ID:', isMongoId);
          
          if (isMongoId) {
            // Fetch category by ID
            console.log('Fetching category by ID:', categoryId);
            categoryResponse = await axios.get(`/api/categories/${categoryId}`);
          } else {
            throw new Error('Category not found');
          }
        }
        
        console.log('Category response:', categoryResponse);
        setCategory(categoryResponse.data.data);
        
        // Fetch courses for this category (always use the actual ID)
        const categoryToUse = categoryResponse.data.data;
        console.log('Fetching courses for category ID:', categoryToUse._id);
        const coursesResponse = await axios.get(`/api/courses/category/${categoryToUse._id}`);
        console.log('Courses response:', coursesResponse);
        
        // Check if response has the expected structure
        if (coursesResponse.data && coursesResponse.data.data && Array.isArray(coursesResponse.data.data)) {
          console.log('Setting courses:', coursesResponse.data.data);
          // Transform courses to match expected format
          const transformedCourses = coursesResponse.data.data.map(course => ({
            ...course,
            id: course._id,
            ratingCount: course.reviewsCount,
            level: course.difficulty,
            category: course.categoryId,
            description: course.description,
            provider: course.instructor?.name || 'Unknown Instructor',
            language: course.language || 'english'
          }));
          setCourses(transformedCourses);
          setFilteredCourses(transformedCourses); // Set filteredCourses as well
        } else {
          console.error('Unexpected courses response structure:', coursesResponse);
          setError('Invalid courses data format');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load category or courses');
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  // Simplified useEffect - always update filteredCourses when courses change
  useEffect(() => {
    console.log('Courses updated, setting filteredCourses to:', courses.length);
    setFilteredCourses(courses);
  }, [courses]);

  // Reset filtered courses when filters are cleared
  useEffect(() => {
    console.log('Filters changed - activeFilters length:', activeFilters.length, 'courses length:', courses.length);
    if (activeFilters.length === 0) {
      // If no filters are active, show all courses
      console.log('Setting filteredCourses to all courses (filter cleared)');
      setFilteredCourses(courses);
    }
  }, [activeFilters, courses]);

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    let sortedCourses = [...filteredCourses];
    
    switch (option) {
      case 'popularity':
        sortedCourses.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
      case 'rating':
        sortedCourses.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sortedCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-low':
        sortedCourses.sort((a, b) => {
          const priceA = a.salePrice !== undefined ? a.salePrice : a.price;
          const priceB = b.salePrice !== undefined ? b.salePrice : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        sortedCourses.sort((a, b) => {
          const priceA = b.salePrice !== undefined ? b.salePrice : b.price;
          const priceB = a.salePrice !== undefined ? a.salePrice : a.price;
          return priceA - priceB;
        });
        break;
      default:
        break;
    }
    
    setFilteredCourses(sortedCourses);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Handle filtering
  const toggleFilter = (filter) => {
    let newFilters;
    if (activeFilters.includes(filter)) {
      newFilters = activeFilters.filter(f => f !== filter);
    } else {
      newFilters = [...activeFilters, filter];
    }
    setActiveFilters(newFilters);
    
    // Apply filters
    let result = [...courses];
    
    console.log('Applying filters:', newFilters);
    console.log('Original courses:', courses.length);
    
    // Apply level filters (using 'difficulty' instead of 'difficultyLevel')
    const levelFilters = newFilters.filter(f => ['beginner', 'intermediate', 'advanced'].includes(f));
    if (levelFilters.length > 0) {
      result = result.filter(course => {
        // Convert course difficulty to lowercase for comparison
        const courseDifficulty = course.difficulty ? course.difficulty.toLowerCase() : '';
        console.log('Checking difficulty filter - course difficulty:', courseDifficulty, 'filters:', levelFilters);
        return levelFilters.includes(courseDifficulty);
      });
    }
    
    // Apply price filters
    const priceFilters = newFilters.filter(f => ['free', 'paid'].includes(f));
    if (priceFilters.includes('free')) {
      result = result.filter(course => {
        console.log('Checking free filter - course price:', course.price);
        return course.price === 0;
      });
    }
    if (priceFilters.includes('paid')) {
      result = result.filter(course => {
        console.log('Checking paid filter - course price:', course.price);
        return course.price > 0;
      });
    }
    
    console.log('Filtered courses result:', result.length);
    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Clear filters button handler
  const clearFilters = () => {
    console.log('Clearing filters');
    setActiveFilters([]);
    setFilteredCourses(courses);
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

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading category and courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Data</h3>
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

  if (!category) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Category Not Found</h3>
            <p className="text-gray-500 mb-4">The requested category could not be found.</p>
            <button
              onClick={() => navigate('/categories')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Categories
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
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            >
              {category?.name || 'Courses'}
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90"
            >
              {category?.description || 'Discover courses in this category'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-4 sm:py-6 bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <button
                key={level}
                onClick={() => toggleFilter(level)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilters.includes(level)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
            <button
              onClick={() => toggleFilter('free')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeFilters.includes('free')
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Free
            </button>
            <button
              onClick={() => toggleFilter('paid')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeFilters.includes('paid')
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Paid
            </button>
            {activeFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Results summary */}
            <div>
              <p className="text-gray-600">
                Showing <span className="font-semibold">{currentCourses.length}</span> of{' '}
                <span className="font-semibold">{filteredCourses.length}</span> courses
              </p>
            </div>
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium text-sm sm:text-base">Sort by:</span>
              <select 
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-xs sm:text-sm"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-8">
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
                      <div className="flex space-x-1 sm:space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                            currentPage === 1 
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                          }`}
                        >
                          Previous
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1;
                          // Only show first, last, current, and nearby pages
                          if (pageNumber === 1 || pageNumber === totalPages || 
                              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                                  currentPage === pageNumber
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                            return (
                              <span key={pageNumber} className="px-2 py-2 text-gray-500">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
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
                  className="text-center py-10 sm:py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryCoursesPage;