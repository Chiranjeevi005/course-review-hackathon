import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card-100 rounded-lg shadow-md overflow-hidden">
      {/* Thumbnail skeleton with enhanced shimmer */}
      <div className="w-full h-48 bg-gradient-to-r from-muted-500 via-muted-400 to-muted-500 bg-[length:200%_100%] animate-shimmer"></div>
      
      {/* Content skeleton */}
      <div className="p-5">
        {/* Title skeleton */}
        <div className="h-5 bg-gradient-to-r from-muted-500 via-muted-400 to-muted-500 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>
        
        {/* Provider skeleton */}
        <div className="h-4 bg-gradient-to-r from-muted-500 via-muted-400 to-muted-500 bg-[length:200%_100%] animate-shimmer rounded mb-3 w-1/2 opacity-70"></div>
        
        {/* Rating skeleton */}
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gradient-to-r from-muted-500 via-muted-400 to-muted-500 bg-[length:200%_100%] animate-shimmer rounded mr-1"></div>
            ))}
          </div>
          <div className="h-4 bg-gradient-to-r from-muted-500 via-muted-400 to-muted-500 bg-[length:200%_100%] animate-shimmer rounded ml-2 w-16 opacity-70"></div>
        </div>
        
        {/* Price and Duration skeleton */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-5 bg-gradient-to-r from-muted-500 via-muted-400 to-muted-500 bg-[length:200%_100%] animate-shimmer rounded w-16"></div>
          <div className="h-4 bg-gradient-to-r from-muted-500 via-muted-400 to-muted-500 bg-[length:200%_100%] animate-shimmer rounded w-12 opacity-70"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-gradient-to-r from-muted-500 via-muted-400 to-muted-500 bg-[length:200%_100%] animate-shimmer rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;