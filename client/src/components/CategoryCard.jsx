import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/category/${category._id}`);
  };

  // Generate a gradient based on category name
  const generateGradient = (name) => {
    if (!name) return 'from-blue-400 to-purple-500';
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const gradients = [
      'from-blue-400 to-purple-500',
      'from-green-400 to-blue-500',
      'from-yellow-400 to-red-500',
      'from-purple-400 to-pink-500',
      'from-indigo-400 to-blue-500',
      'from-teal-400 to-green-500',
      'from-orange-400 to-red-500',
      'from-cyan-400 to-blue-500'
    ];
    return gradients[Math.abs(hash) % gradients.length];
  };

  const gradient = generateGradient(category.name);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <span className="text-2xl sm:text-3xl mr-3">{category.icon || '📚'}</span>
          <h3 className="font-bold text-gray-900 text-lg sm:text-xl">{category.name}</h3>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 line-clamp-2">
          {category.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-medium text-xs sm:text-sm">
            {category.courseCount || 0} courses
          </span>
          <div className="flex items-center text-blue-600 font-medium text-xs sm:text-sm">
            <span className="mr-1">Explore</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 sm:h-5 sm:w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;