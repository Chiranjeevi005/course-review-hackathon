import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Rating from './Rating';
import BookmarkIcon from '../assets/icons/BookmarkIcon';
import CoursePlaceholder from './CoursePlaceholder';

const CourseCard = ({ course }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setIsAnimating(true);
    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 600);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice) return null;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const discountPercentage = calculateDiscount(course.originalPrice, course.price);
  
  // Use CoursePlaceholder for the image
  const renderImage = () => {
    // If course has a real thumbnail, use it
    if (course.thumbnail && !course.thumbnail.includes('placehold.co')) {
      return (
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          onError={(e) => {
            // Fallback to placeholder if the image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      );
    }
    
    // Otherwise, use the CoursePlaceholder
    return (
      <div className="w-full h-32 sm:h-40 md:h-48">
        <CoursePlaceholder 
          courseTitle={course.title}
          courseDescription={course.description}
        />
      </div>
    );
  };

  // Get category name
  const getCategoryName = () => {
    if (course.category && typeof course.category === 'object') {
      return course.category.name;
    }
    return course.category;
  };

  return (
    <div className="bg-card-100 rounded-lg shadow-soft overflow-hidden transition-all duration-200 ease-in-out hover:shadow-soft-lg group border border-muted-500">
      <div className="relative overflow-hidden">
        {renderImage()}
        {/* Fallback placeholder element (hidden by default) */}
        <div className="w-full h-32 sm:h-40 md:h-48 hidden">
          <CoursePlaceholder 
            courseTitle={course.title}
            courseDescription={course.description}
          />
        </div>
        
        <motion.button
          onClick={toggleBookmark}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-sm hover:bg-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-700"
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark course"}
        >
          <BookmarkIcon 
            isBookmarked={isBookmarked} 
            className="h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-200 text-text-900" 
            animate={isAnimating}
          />
        </motion.button>
        {discountPercentage && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-accent-500 text-text-900 text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex justify-between items-start mb-1.5 sm:mb-2">
          <h3 className="font-bold text-text-900 text-sm sm:text-base md:text-lg leading-tight group-hover:text-primary-700 transition-colors duration-200">
            {course.title}
          </h3>
        </div>
        
        {/* Use instructor name instead of provider if provider is not available */}
        <p className="text-muted-500 text-xs sm:text-sm mb-2">
          {course.provider || (course.instructor && course.instructor.name) || 'Course Provider'}
        </p>
        
        {/* Category and Level badges */}
        <div className="flex flex-wrap gap-1 mb-2">
          {getCategoryName() && (
            <span className="px-2 py-1 bg-primary-700 bg-opacity-5 text-primary-700 text-xs rounded-full">
              {getCategoryName()}
            </span>
          )}
          {course.level && (
            <span className="px-2 py-1 bg-muted-500 bg-opacity-10 text-muted-500 text-xs rounded-full">
              {course.level}
            </span>
          )}
        </div>
        
        <div className="mb-2 sm:mb-3">
          <Rating rating={course.rating} ratingCount={course.reviewsCount || course.ratingCount} />
        </div>
        
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="flex items-baseline">
            <span className="font-bold text-text-900 text-sm sm:text-base md:text-lg">{formatPrice(course.price)}</span>
            {course.originalPrice && (
              <span className="ml-1 sm:ml-2 text-muted-500 text-xs sm:text-sm line-through">{formatPrice(course.originalPrice)}</span>
            )}
          </div>
          <span className="text-muted-500 text-xs sm:text-sm">{course.duration}</span>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary-700 text-white py-2 sm:py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 ease-in-out font-semibold focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-opacity-50 text-xs sm:text-sm md:text-base"
        >
          View Details
        </motion.button>
      </div>
    </div>
  );
};

export default CourseCard;