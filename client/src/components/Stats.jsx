import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const [counters, setCounters] = useState({
    courses: 0,
    students: 0,
    reviews: 0,
    platforms: 0
  });

  const targetStats = {
    courses: 5000,
    students: 50000,
    reviews: 12000,
    platforms: 50
  };

  // Animate counters when component mounts
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames per second
    const increment = duration / steps;
    
    let interval; // Declare interval variable here
    
    const timer = setTimeout(() => {
      interval = setInterval(() => { // Assign to the declared variable
        setCounters(prev => {
          const newCounters = { ...prev };
          let updated = false;
          
          Object.keys(targetStats).forEach(key => {
            if (newCounters[key] < targetStats[key]) {
              const step = Math.ceil(targetStats[key] / steps);
              newCounters[key] = Math.min(
                newCounters[key] + step,
                targetStats[key]
              );
              updated = true;
            }
          });
          
          if (!updated) {
            clearInterval(interval);
          }
          
          return newCounters;
        });
      }, increment);
    }, 300); // Small delay before starting animation

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval); // Check if interval exists before clearing
    };
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k+`;
    }
    return `${num}+`;
  };

  const stats = [
    { id: 1, value: counters.courses, label: 'Online Courses' },
    { id: 2, value: counters.students, label: 'Happy Students' },
    { id: 3, value: counters.reviews, label: 'Course Reviews' },
    { id: 4, value: counters.platforms, label: 'Learning Platforms' }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-primary-700 to-indigo-700 text-text-900 w-full">
      <div className="max-w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="text-3xl md:text-4xl font-extrabold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {formatNumber(stat.value)}
              </motion.div>
              <motion.div 
                className="text-base md:text-lg font-medium opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;