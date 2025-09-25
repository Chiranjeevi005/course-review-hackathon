import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import CategoryChip from '../components/CategoryChip';
import SearchBox from '../components/SearchBox';
import MobileMenu from '../components/MobileMenu';
import HowItWorksStep from '../components/HowItWorksStep';
import Carousel from '../components/Carousel';
import SkeletonCard from '../components/SkeletonCard';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext || {};
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [allCourses] = useState([
    {
      id: 1,
      title: 'Complete React Developer Course',
      provider: 'Udemy',
      rating: 4.8,
      ratingCount: 12400,
      price: 7469,
      originalPrice: 10792,
      duration: '24 hours',
      category: 'web-development',
      level: 'intermediate',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=React+Course',
    },
    {
      id: 2,
      title: 'Python for Data Science and Machine Learning',
      provider: 'Coursera',
      rating: 4.7,
      ratingCount: 9800,
      price: 4149,
      originalPrice: null,
      duration: '32 hours',
      category: 'data-science',
      level: 'beginner',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=Python+Course',
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      provider: 'Skillshare',
      rating: 4.9,
      ratingCount: 5600,
      price: 2489,
      originalPrice: 4979,
      duration: '18 hours',
      category: 'design',
      level: 'intermediate',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=UI/UX+Course',
    },
    {
      id: 4,
      title: 'Advanced Cloud Computing',
      provider: 'edX',
      rating: 4.6,
      ratingCount: 7200,
      price: 6639,
      originalPrice: 8299,
      duration: '28 hours',
      category: 'web-development',
      level: 'advanced',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=Cloud+Course',
    },
    {
      id: 5,
      title: 'Digital Marketing Strategy',
      provider: 'Udemy',
      rating: 4.5,
      ratingCount: 8900,
      price: 3329,
      originalPrice: null,
      duration: '15 hours',
      category: 'business',
      level: 'beginner',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=Marketing+Course',
    },
    {
      id: 6,
      title: 'Machine Learning Fundamentals',
      provider: 'Coursera',
      rating: 4.8,
      ratingCount: 11200,
      price: 4979,
      originalPrice: 7469,
      duration: '35 hours',
      category: 'ai',
      level: 'intermediate',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=ML+Course',
    },
    {
      id: 7,
      title: 'Full-Stack Web Development',
      provider: 'Udemy',
      rating: 4.9,
      ratingCount: 15600,
      price: 8299,
      originalPrice: 12442,
      duration: '40 hours',
      category: 'web-development',
      level: 'advanced',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=Full+Stack',
    },
    {
      id: 8,
      title: 'Data Visualization with Python',
      provider: 'DataCamp',
      rating: 4.7,
      ratingCount: 6800,
      price: 4149,
      originalPrice: null,
      duration: '20 hours',
      category: 'data-science',
      level: 'intermediate',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=Data+Viz',
    },
    {
      id: 9,
      title: 'Product Management Essentials',
      provider: 'LinkedIn Learning',
      rating: 4.6,
      ratingCount: 4200,
      price: 2489,
      originalPrice: 3329,
      duration: '12 hours',
      category: 'business',
      level: 'beginner',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=Product+Mgmt',
    },
  ]);

  // Mock data for categories
  const categories = [
    { id: 1, name: 'Web Development', courseCount: 120, icon: '💻' },
    { id: 2, name: 'Data Science', courseCount: 85, icon: '📊' },
    { id: 3, name: 'Artificial Intelligence', courseCount: 95, icon: '🤖' },
    { id: 4, name: 'Design', courseCount: 75, icon: '🎨' },
    { id: 5, name: 'Business', courseCount: 110, icon: '💼' },
    { id: 6, name: 'Marketing', courseCount: 65, icon: '📈' },
  ];

  // Mock data for recent reviews
  const recentReviews = [
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
  ];

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

  // Filter courses based on search query and filters
  const filterCourses = (query, filterParams) => {
    let result = [...allCourses];
    
    // Apply search query filter
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(lowerQuery) ||
        course.provider.toLowerCase().includes(lowerQuery) ||
        course.category.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply category filter
    if (filterParams.category) {
      result = result.filter(course => course.category === filterParams.category);
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
    
    return result;
  };

  // Handle search and filtering
  const handleSearch = (query, filterParams) => {
    setSearchQuery(query);
    setFilters(filterParams);
    const filtered = filterCourses(query, filterParams);
    setFilteredCourses(filtered);
  };

  // Simulate loading recommendations
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecommendedCourses([
        {
          id: 7,
          title: 'Full-Stack Web Development',
          provider: 'Udemy',
          rating: 4.9,
          ratingCount: 15600,
          price: 8299,
          originalPrice: 12442,
          duration: '40 hours',
          thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=Full+Stack',
        },
        {
          id: 8,
          title: 'Data Visualization with Python',
          provider: 'DataCamp',
          rating: 4.7,
          ratingCount: 6800,
          price: 4149,
          originalPrice: null,
          duration: '20 hours',
          thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=Data+Viz',
        },
        {
          id: 9,
          title: 'Product Management Essentials',
          provider: 'LinkedIn Learning',
          rating: 4.6,
          ratingCount: 4200,
          price: 2489,
          originalPrice: 3329,
          duration: '12 hours',
          thumbnail: 'https://placehold.co/300x200/0F4C81/FFFFFF?text=Product+Mgmt',
        },
      ]);
      setIsLoadingRecommendations(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Initialize with all courses
  useEffect(() => {
    setFilteredCourses(allCourses.slice(0, 3));
  }, [allCourses]);

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
    <div className="min-h-screen bg-muted-50 w-full">
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        user={user}
        logout={logout}
      />

      {/* Header */}
      <motion.header 
        className="bg-card-100 shadow-sm sticky top-0 z-40 w-full backdrop-blur-sm bg-white/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.h1 
                className="text-2xl font-bold text-primary-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                CourseFinder
              </motion.h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {['Home', 'Courses', 'Categories', 'Reviews', 'About'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-muted-500 hover:text-primary-700 transition-colors duration-200 ease-in-out"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <motion.button 
                className="text-muted-500 hover:text-primary-700 transition-colors duration-200 ease-in-out"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
              {user ? (
                <>
                  <motion.button 
                    className="bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-all duration-200 ease-in-out font-semibold shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Dashboard
                  </motion.button>
                  <motion.button 
                    className="bg-accent-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 ease-in-out font-semibold shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05, backgroundColor: "#e6951d" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onClick={logout}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <button 
                    className="bg-accent-500 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all duration-200"
                    onClick={() => window.location.href = '/login'}
                  >
                    Sign In
                  </button>
                  <button 
                    className="bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-primary-800 transition-all duration-200"
                    onClick={() => window.location.href = '/login'}
                  >
                    Sign Up
                  </button>
                </>
              )}
              
              {/* Mobile Menu Button */}
              <motion.button 
                className="md:hidden text-muted-500"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700/8 to-indigo-700/6 py-16 sm:py-20 w-full">
        <div className="max-w-full px-4 text-center">
          <motion.h1 
            className="text-h1 font-extrabold text-text-900 mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            A calmer place to learn — find the right course for your goals.
          </motion.h1>
          <motion.p 
            className="text-base mb-8 max-w-2xl mx-auto text-text-900 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            Search courses, compare outcomes, and follow real student stories that show what's possible.
          </motion.p>
          
          {/* Search Box */}
          <motion.div
            className="max-w-3xl mx-auto w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <SearchBox onSearch={handleSearch} initialFilters={filters} />
          </motion.div>
        </div>
      </section>

      {/* Trending Categories */}
      <motion.section 
        className="py-12 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-full px-4">
          <motion.h2 
            className="text-h2 font-extrabold text-text-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trending Categories
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div 
                key={category.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryChip category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Top Rated Courses */}
      <motion.section 
        className="py-12 bg-card-100 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="max-w-full px-4">
          <motion.h2 
            className="text-h2 font-extrabold text-text-900 mb-8"
            variants={item}
          >
            Top Rated Courses
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
          >
            {(filteredCourses.length > 0 ? filteredCourses : allCourses.slice(0, 3)).map((course, index) => (
              <motion.div
                key={course.id}
                variants={cardItem}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Recommended for You */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Carousel 
          title="Recommended for You" 
          courses={recommendedCourses} 
          isLoading={isLoadingRecommendations}
        />
      </motion.div>

      {/* How It Works */}
      <motion.section 
        className="py-16 bg-muted-50 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="max-w-full px-4">
          <motion.h2 
            className="text-h2 font-extrabold text-text-900 mb-12 text-center"
            variants={item}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  description={step.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest Reviews */}
      <motion.section 
        className="py-12 w-full"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="max-w-full px-4">
          <motion.h2 
            className="text-h2 font-extrabold text-text-900 mb-8"
            variants={item}
          >
            Latest Reviews
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
          >
            {recentReviews.map((review, index) => (
              <motion.div
                key={review.id}
                variants={cardItem}
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="bg-card-100 p-6 rounded-lg shadow-md transition-all duration-200 ease-in-out hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < review.rating ? 'text-amber-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-muted-500">({review.rating})</span>
                </div>
                <p className="text-text-900 mb-4 leading-relaxed">"{review.comment}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-text-900">{review.userName}</p>
                    <p className="text-sm text-muted-500">{review.courseTitle}</p>
                  </div>
                  <div className="flex items-center text-muted-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{review.upvotes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section 
        className="py-16 bg-primary-700 text-text-900 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="max-w-full px-4 text-center">
          <motion.h2 
            className="text-h2 font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get Weekly Course Picks
          </motion.h2>
          <motion.p 
            className="text-base mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Subscribe to our newsletter and get personalized course recommendations every week.
          </motion.p>
          <motion.div 
            className="max-w-md mx-auto flex flex-col sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-text-900 focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white/95 mb-2 sm:mb-0 transition-all duration-200 ease-in-out"
            />
            <motion.button 
              className="bg-accent-500 text-text-900 font-semibold px-6 py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-opacity-90 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#e6951d" }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-text-900 text-card-100 py-12 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="max-w-full px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div variants={item}>
              <h3 className="text-h3 font-extrabold mb-4">CourseFinder</h3>
              <p className="text-muted-500 leading-relaxed">Find the best online courses from 50+ platforms in one place.</p>
            </motion.div>
            <motion.div variants={item}>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-muted-500">
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Course Comparison</a></li>
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Reviews</a></li>
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Learning Paths</a></li>
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Career Guides</a></li>
              </ul>
            </motion.div>
            <motion.div variants={item}>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-500">
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">About Us</a></li>
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Careers</a></li>
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Contact</a></li>
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Blog</a></li>
              </ul>
            </motion.div>
            <motion.div variants={item}>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-500">
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Terms of Service</a></li>
                <li><a href="#" className="hover:text-card-100 transition-colors duration-200 ease-in-out">Cookie Policy</a></li>
              </ul>
            </motion.div>
          </div>
          <motion.div 
            className="border-t border-muted-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-muted-500 mb-4 md:mb-0">© 2025 CourseFinder. All rights reserved.</p>
            <div className="flex space-x-4">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-muted-500 hover:text-card-100 transition-colors duration-200 ease-in-out"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;