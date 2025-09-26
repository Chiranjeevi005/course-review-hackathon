import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import CategoryChip from '../components/CategoryChip';
import SearchBox from '../components/SearchBox';
import HowItWorksStep from '../components/HowItWorksStep';
import Navbar from '../components/Navbar';
import axios from '../utils/axiosConfig';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext || {};
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [allCourses, setAllCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentReviews] = useState([
    {
      id: 1,
      userName: 'Veer Mahadev',
      courseTitle: 'Advanced JavaScript Concepts',
      rating: 5,
      comment: 'This course completely transformed my understanding of JavaScript. The instructor explains complex topics in a very accessible way.',
      upvotes: 24,
    },
    {
      id: 2,
      userName: 'Sarah Williams',
      courseTitle: 'Data Visualization with D3.js',
      rating: 4,
      comment: 'Excellent content and well-structured modules. The hands-on projects really helped solidify my learning.',
      upvotes: 18,
    }, {
      id: 3,
      userName: 'Nicole Smith',
      courseTitle: 'Cloud Architecture Fundamentals',
      rating: 5,
      comment: 'As a DevOps engineer, this course gave me the foundational knowledge I needed to advance my career. Highly recommended!',
      upvotes: 32,
    },
  ]);

  // How It Works steps
  const howItWorksSteps = [
    {
      icon: '🔍',
      title: 'Search',
      description: 'Find courses across 50+ platforms with our powerful search engine.'
    },
    {
      icon: '⚖️',
      title: 'Compare',
      description: 'Side-by-side comparison of content, price, and reviews.'
    },
    {
      icon: '🚀',
      title: 'Start',
      description: 'Enroll in the perfect course and advance your career.'
    }
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('/api/categories');
        setCategories(categoriesResponse.data.data || []);
        
        // Fetch a larger set of courses to ensure we have variety
        const coursesResponse = await axios.get('/api/courses?limit=50');
        const allCoursesData = coursesResponse.data.data || [];
        
        // Set top rated courses (first 3)
        setAllCourses(allCoursesData);
        setFilteredCourses(allCoursesData.slice(0, 3));
        
        // Create a more diverse selection for recommended courses
        // Shuffle the courses to randomize the selection
        const shuffledCourses = [...allCoursesData].sort(() => Math.random() - 0.5);
        
        // Filter out courses that are already in the top rated section
        const topRatedIds = new Set(allCoursesData.slice(0, 3).map(course => course._id));
        let recommended = shuffledCourses
          .filter(course => !topRatedIds.has(course._id))
          .slice(0, 3);
        
        // If we don't have enough recommended courses, fill with any that aren't in top rated
        if (recommended.length < 3) {
          const additional = allCoursesData
            .filter(course => !topRatedIds.has(course._id))
            .slice(recommended.length, 3);
          recommended = [...recommended, ...additional];
        }
        
        setRecommendedCourses(recommended);
        setIsLoadingRecommendations(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoadingRecommendations(false);
      }
    };

    fetchData();
  }, []);

  // Simulate loading recommendations
  useEffect(() => {
    // This effect is no longer needed since we handle recommendations in the main fetch
  }, []);

  // Filter courses based on search query and filters
  const filterCourses = (query, filterParams) => {
    let result = [...allCourses];
    
    // Apply search query filter
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(lowerQuery) ||
        course.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply category filter
    if (filterParams.category) {
      result = result.filter(course => {
        if (course.categoryId && typeof course.categoryId === 'object') {
          return course.categoryId._id === filterParams.category;
        }
        return course.categoryId === filterParams.category;
      });
    }
    
    // Apply level filter
    if (filterParams.level) {
      result = result.filter(course => course.difficulty.toLowerCase() === filterParams.level.toLowerCase());
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
    
    return result;
  };

  // Handle search and filtering
  const handleSearch = (query, filterParams) => {
    setSearchQuery(query);
    setFilters(filterParams);
    const filtered = filterCourses(query, filterParams);
    setFilteredCourses(filtered);
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
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const cardItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      {/* Recommendation Header Section */}
      <motion.section 
        className="py-12 sm:py-16 md:py-20 lg:py-24 w-full relative overflow-hidden border-b border-gray-200"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Abstract background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-blue-500 sm:top-10 sm:left-10 sm:w-32 sm:h-32"></div>
          <div className="absolute top-20 right-10 w-12 h-12 rounded-full bg-indigo-500 sm:top-40 sm:right-20 sm:w-24 sm:h-24"></div>
          <div className="absolute bottom-10 left-1/4 w-8 h-8 rounded-full bg-blue-400 sm:bottom-20 sm:w-16 sm:h-16"></div>
          <div className="absolute bottom-20 right-1/3 w-10 h-10 rounded-full bg-indigo-400 sm:bottom-40 sm:w-20 sm:h-20"></div>
          <div className="absolute top-1/3 left-1/3 w-6 h-6 rounded-full bg-blue-300 sm:top-1/3 sm:w-12 sm:h-12"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 max-w-2xl sm:max-w-3xl mx-auto"
            variants={item}
          >
            Not sure where to start? Let us guide you to the perfect course for your future
          </motion.h1>
          
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => window.location.href = '/recommendations'}
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg text-base sm:text-lg shadow-lg hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 mt-6 sm:mt-8"
            >
              Find My Perfect Courses
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 sm:h-5 sm:w-5 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-primary-700/8 to-indigo-700/6 py-10 sm:py-12 md:py-16 lg:py-20 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-h1 font-extrabold text-text-900 mb-4 leading-tight"
            variants={item}
          >
            A calmer place to learn — find the right course for your goals.
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto text-text-900 leading-relaxed"
            variants={item}
          >
            Search courses, compare outcomes, and follow real student stories that show what's possible.
          </motion.p>
          
          {/* Search Box */}
          <motion.div
            className="max-w-lg sm:max-w-xl md:max-w-3xl mx-auto w-full"
            variants={item}
          >
            <SearchBox onSearch={handleSearch} initialFilters={filters} />
          </motion.div>
        </div>
      </motion.section>

      {/* Trending Categories */}
      <motion.section 
        className="py-8 sm:py-10 md:py-12 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl sm:text-h2 font-extrabold text-text-900 mb-6 sm:mb-8"
            variants={item}
          >
            Trending Categories
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
            {categories.slice(0, 6).map((category, index) => (
              <motion.div 
                key={category._id} 
                variants={cardItem}
              >
                <CategoryChip category={{
                  id: category._id,
                  name: category.name,
                  courseCount: category.courseCount,
                  icon: category.icon
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Top Rated Courses */}
      <motion.section 
        className="py-8 sm:py-10 md:py-12 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl sm:text-h2 font-extrabold text-text-900 mb-6 sm:mb-8"
            variants={item}
          >
            Top Rated Courses
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={container}
          >
            {(filteredCourses.length > 0 ? filteredCourses : allCourses.slice(0, 3)).map((course, index) => (
              <motion.div
                key={course._id}
                variants={cardItem}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <CourseCard course={{
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
                }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Personalized Recommendations */}
      <motion.section 
        className="py-8 sm:py-10 md:py-12 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl sm:text-h2 font-extrabold text-text-900 mb-6 sm:mb-8"
            variants={item}
          >
            Personalized Recommendations
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={container}
          >
            {recommendedCourses.map((course, index) => (
              <motion.div
                key={course._id}
                variants={cardItem}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <CourseCard course={
                  {
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
                  }
                } />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className="py-12 sm:py-14 md:py-16 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl sm:text-h2 font-extrabold text-text-900 mb-8 sm:mb-10 md:mb-12 text-center"
            variants={item}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <HowItWorksStep 
                  icon={step.icon}
                  title={step.title}
                  description={step.description} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recent Reviews */}
      <motion.section 
        className="py-12 sm:py-14 md:py-16 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl sm:text-h2 font-extrabold text-text-900 mb-8 sm:mb-10 md:mb-12 text-center"
            variants={item}
          >
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {recentReviews.map((review, index) => (
              <motion.div
                key={review.id}
                variants={item}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="bg-card-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-accent-500 rounded-full w-10 h-10 flex items-center justify-center text-text-900 font-bold">
                      {review.userName.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-text-900">{review.userName}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-muted-500'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-bold text-text-900 mb-2">{review.courseTitle}</h4>
                  <p className="text-muted-500 text-sm mb-4">{review.comment}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-500 text-sm font-medium">{review.upvotes} upvotes</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;