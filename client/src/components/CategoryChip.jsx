import React from 'react';
import { motion } from 'framer-motion';

const CategoryChip = ({ category }) => {
  return (
    <motion.div 
      className="bg-card-100 border border-muted-500 rounded-lg p-3 flex items-center transition-all duration-300 ease-in-out hover:shadow-md hover:border-accent-500 group cursor-pointer w-full"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.span 
        className="text-lg mr-3 group-hover:scale-110 transition-transform duration-300 ease-in-out"
        whileHover={{ rotate: 5 }}
      >
        {category.icon}
      </motion.span>
      <div>
        <h3 className="font-semibold text-text-900 text-sm group-hover:text-primary-700 transition-colors duration-200">
          {category.name}
        </h3>
        <p className="text-muted-500 text-xs group-hover:text-accent-500 transition-colors duration-200">
          {category.courseCount} courses
        </p>
      </div>
    </motion.div>
  );
};

export default CategoryChip;