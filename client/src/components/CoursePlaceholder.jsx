import React from 'react';

const CoursePlaceholder = ({ 
  courseTitle = '', 
  courseDescription = '',
  className = '' 
}) => {
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
  
  // Get initials for course title
  const getTitleInitials = (title) => {
    if (!title) return 'CT';
    const words = title.split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
  };
  
  const initials = getTitleInitials(courseTitle);

  return (
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 ${className}`} style={{ width: '100%', height: '100%' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white bg-opacity-5"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white bg-opacity-5"></div>
        
        {/* Course initials badge */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-2 z-10">
          <span className="text-white text-lg font-bold">{initials}</span>
        </div>
        
        {/* Content container */}
        <div className="relative z-10 w-full max-w-xs">
          {/* Course title */}
          <h3 className="text-white text-lg font-bold mb-2 leading-tight">
            {displayTitle}
          </h3>
          
          {/* Course description */}
          <p className="text-white/90 text-sm leading-relaxed">
            {displayDescription}
          </p>
        </div>
        
        {/* Decorative bottom element */}
        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-lg bg-white bg-opacity-10"></div>
      </div>
    </div>
  );
};

export default CoursePlaceholder;