import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getCategoryPlaceholder } from '../utils/placeholderGenerator';

const CategoryCard = ({ category, onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Always use slug for navigation to avoid MongoDB ID validation issues
    if (category.slug) {
      navigate(`/courses/${category.slug}`);
    } else {
      // Fallback to ID if slug is not available
      navigate(`/courses/${category._id}`);
    }
  };

  // Get the appropriate icon URL (real icon or placeholder)
  const iconUrl = getCategoryPlaceholder(category);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl border border-transparent hover:border-accent-500/30 backdrop-blur-sm bg-white/80 h-full"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center text-center h-full">
        <motion.div 
          className="text-3xl sm:text-4xl mb-3 sm:mb-4"
          whileHover={{ rotate: 10, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {category.icon ? category.icon : (
            <img 
              src={iconUrl} 
              alt={category.name} 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '📁';
              }}
            />
          )}
        </motion.div>
        <h3 className="text-lg sm:text-h3 font-bold text-text-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">
          {category.name}
        </h3>
        <p className="text-muted-500 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed flex-grow">
          {category.description}
        </p>
        <div className="mt-auto pt-3 sm:pt-4">
          <span className="inline-block bg-primary-700/10 text-primary-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
            {category.courseCount || 0} courses
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;