import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import SkeletonCard from './SkeletonCard';

const Carousel = ({ title, courses, isLoading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (courses && courses.length > 0) {
      setCurrentIndex((prevIndex) => 
        prevIndex === courses.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (courses && courses.length > 0) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? courses.length - 1 : prevIndex - 1
      );
    }
  };

  // Animation variants for Framer Motion
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

  // Show skeleton loaders when loading
  if (isLoading) {
    return (
      <section className="py-8 sm:py-12 bg-muted-50 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-h2 font-extrabold text-text-900 mb-6 sm:mb-8">{title}</h2>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(3)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show message when no courses
  if (!courses || courses.length === 0) {
    return (
      <section className="py-8 sm:py-12 bg-muted-50 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-h2 font-extrabold text-text-900 mb-6 sm:mb-8">{title}</h2>
          <p className="text-muted-500 text-center py-6 sm:py-8 text-sm sm:text-base">No courses available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 bg-muted-50 w-full">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl sm:text-h2 font-extrabold text-text-900 mb-6 sm:mb-8"
        >
          {title}
        </motion.h2>
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex transition-transform duration-300 ease-in-out sm:hidden"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              key={currentIndex} // Add key to trigger re-render on index change
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex">
                {courses.map((course, index) => (
                  <motion.div 
                    key={course.id} 
                    className="w-full flex-shrink-0 px-1 sm:px-2"
                    variants={item}
                    initial="hidden"
                    animate="show"
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Grid for larger screens with staggered entrance */}
            <motion.div 
              className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={item}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation Arrows - only show on mobile */}
          <div className="sm:hidden">
            <motion.button 
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 sm:-translate-x-4 bg-card-100 rounded-full p-1.5 sm:p-2 shadow-md hover:bg-muted-50 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 text-text-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button 
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 sm:translate-x-4 bg-card-100 rounded-full p-1.5 sm:p-2 shadow-md hover:bg-muted-50 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 text-text-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
            
            {/* Dot Indicators */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
              {courses.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500 ${index === currentIndex ? 'bg-accent-500' : 'bg-muted-500'}`}
                  aria-label={`Go to slide ${index + 1}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;