import React from 'react';
import { motion } from 'framer-motion';

const HowItWorksStep = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-card-100 p-6 rounded-lg shadow-sm transition-all duration-200 ease-in-out"
      whileHover={{ 
        y: -10,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div 
        className="text-3xl mb-4"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      <motion.h3 
        className="text-h3 font-bold text-text-900 mb-2"
        whileHover={{ color: "#0F4C81" }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>
      <p className="text-muted-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default HowItWorksStep;