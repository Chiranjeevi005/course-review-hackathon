import React from 'react';

const CoursePlaceholder = ({ courseTitle, courseDescription, className = "" }) => {
  // Truncate course title for display
  const displayTitle = courseTitle 
    ? courseTitle.length > 60 
      ? courseTitle.substring(0, 57) + '...' 
      : courseTitle
    : 'Course Title';
  
  // Truncate course description for display
  const displayDescription = courseDescription 
    ? courseDescription.length > 100 
      ? courseDescription.substring(0, 97) + '...' 
      : courseDescription
    : 'Learn valuable skills with this comprehensive course designed for beginners to advanced learners.';
  
  // Use a consistent color scheme based on the design system
  const gradient = 'from-primary-700 to-indigo-700';

  return (
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${gradient} ${className}`} style={{ width: '100%', height: '100%' }}>
      {/* Simplified background pattern for professionalism */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white sm:top-3 sm:left-3 sm:w-3 sm:h-3"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-white sm:bottom-3 sm:right-3 sm:w-3 sm:h-3"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center sm:p-3 md:p-4">
        <div className="text-white text-xs font-semibold leading-tight break-words max-h-full overflow-hidden sm:text-sm md:text-base">
          {displayTitle}
        </div>
        <div className="text-white text-opacity-80 text-[0.6rem] sm:text-xs mt-1 sm:mt-2 leading-tight break-words max-h-full overflow-hidden">
          {displayDescription}
        </div>
      </div>
      
      {/* Subtle border effect */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-10"></div>
    </div>
  );
};

export default CoursePlaceholder;