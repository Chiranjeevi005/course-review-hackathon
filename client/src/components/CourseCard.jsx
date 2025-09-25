import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Rating from './Rating';
import BookmarkIcon from '../assets/icons/BookmarkIcon';

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

  return (
    <div className="bg-card-100 rounded-lg shadow-md overflow-hidden transition-all duration-200 ease-in-out hover:shadow-lg group">
      <div className="relative overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <motion.button
          onClick={toggleBookmark}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-md hover:bg-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500"
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark course"}
        >
          <BookmarkIcon 
            isBookmarked={isBookmarked} 
            className="h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-200" 
            animate={isAnimating}
          />
        </motion.button>
        {discountPercentage && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-accent-500 text-text-900 text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-5">
        <div className="flex justify-between items-start mb-1.5 sm:mb-2">
          <h3 className="font-bold text-text-900 text-base sm:text-lg leading-tight group-hover:text-primary-700 transition-colors duration-200">
            {course.title}
          </h3>
        </div>
        
        <p className="text-muted-500 text-xs sm:text-sm mb-2 sm:mb-3">{course.provider}</p>
        
        <div className="mb-2 sm:mb-3">
          <Rating rating={course.rating} ratingCount={course.ratingCount} />
        </div>
        
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="flex items-baseline">
            <span className="font-bold text-text-900 text-base sm:text-lg">{formatPrice(course.price)}</span>
            {course.originalPrice && (
              <span className="ml-1 sm:ml-2 text-muted-500 text-xs sm:text-sm line-through">{formatPrice(course.originalPrice)}</span>
            )}
          </div>
          <span className="text-muted-500 text-xs sm:text-sm">{course.duration}</span>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-accent-500 text-text-900 py-2 sm:py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 ease-in-out font-semibold focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50 text-sm sm:text-base"
        >
          View Details
        </motion.button>
      </div>
    </div>
  );
};

export default CourseCard;