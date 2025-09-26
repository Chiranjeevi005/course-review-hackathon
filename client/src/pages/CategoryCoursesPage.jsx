import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import Navbar from '../components/Navbar';
import axios from '../utils/axiosConfig';

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
            description: course.description
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
  };

  // Clear filters button handler
  const clearFilters = () => {
    console.log('Clearing filters');
    setActiveFilters([]);
    setFilteredCourses(courses);
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className={`py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary-700 to-indigo-700 text-white`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="text-4xl sm:text-5xl mb-4">
              {category.icon || '📚'}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 opacity-90">
              {category.description || 'Explore courses in this category'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sorting & Filtering Section */}
      <section className="py-6 sm:py-8 bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select 
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm sm:text-base"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <button
                  key={level}
                  onClick={() => toggleFilter(level)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeFilters.includes(level)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Free
              </button>
              
              <button
                onClick={() => toggleFilter('paid')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilters.includes('paid')
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Paid
              </button>
              
              {activeFilters.length > 0 && (
                <button 
                  onClick={clearFilters}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          ) : (
            <>
              {console.log('Rendering courses - filteredCourses.length:', filteredCourses.length, 'filteredCourses:', filteredCourses)}
              {filteredCourses.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id || course._id}
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
              ) : (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters</p>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Courses array length: {courses.length}</p>
                    <p className="text-sm text-gray-400">Filtered courses array length: {filteredCourses.length}</p>
                    <p className="text-sm text-gray-400">Active filters: {activeFilters.join(', ') || 'None'}</p>
                  </div>
                  <button
                    onClick={clearFilters}
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
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary-700 to-indigo-700 text-white w-full">
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
      </section>
    </div>
  );
};

export default CategoryCoursesPage;