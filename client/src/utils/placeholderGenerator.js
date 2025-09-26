/**
 * Generates a placeholder image URL with text overlay
 * @param {string} text - Text to display on the image
 * @param {string} category - Category name for color coding
 * @param {number} width - Image width (default: 300)
 * @param {number} height - Image height (default: 200)
 * @returns {string} - Placeholder image URL
 */
export const generatePlaceholderImage = (text, category, width = 300, height = 200) => {
  // Define colors for different categories
  const categoryColors = {
    'ai': '4F46E5', // Indigo
    'blockchain': '8B5CF6', // Violet
    'business': '10B981', // Emerald
    'cybersecurity': 'EF4444', // Red
    'data-science': '3B82F6', // Blue
    'design': 'EC4899', // Pink
    'health': 'F59E0B', // Amber
    'language': '06B6D4', // Cyan
    'leadership': '8B5CF6', // Violet
    'mobile-development': 'F97316', // Orange
    'web-development': '6366F1', // Indigo
    'default': '64748B' // Slate
  };

  // Get color based on category or use default
  const color = categoryColors[category.toLowerCase()] || categoryColors['default'];
  
  // Clean text for URL (remove special characters)
  const cleanText = encodeURIComponent(text.substring(0, 30) + (text.length > 30 ? '...' : ''));
  
  // Generate placeholder URL with text overlay
  return `https://placehold.co/${width}x${height}/${color}/FFFFFF?text=${cleanText}`;
};

/**
 * Gets a placeholder image for a course
 * @param {Object} course - Course object
 * @returns {string} - Placeholder image URL
 */
// This function is now deprecated as we're using the CoursePlaceholder component directly
// Keeping it for backward compatibility

export const getCoursePlaceholder = (course) => {
  // If course has a real thumbnail, use it
  if (course.thumbnail && !course.thumbnail.includes('placehold.co')) {
    return course.thumbnail;
  }
  
  // For courses without thumbnails, we now use the CoursePlaceholder component
  // This function returns a generic placeholder as fallback
  const categoryName = course.categoryId?.name || course.category || 'Default';
  return `https://placehold.co/300x200/64748B/FFFFFF?text=${encodeURIComponent(categoryName)}`;
};

// Export the CoursePlaceholder component for direct use
export { default as CoursePlaceholder } from '../components/CoursePlaceholder';

/**
 * Gets a placeholder image for a category
 * @param {Object} category - Category object
 * @returns {string} - Placeholder image URL
 */
export const getCategoryPlaceholder = (category) => {
  // If category already has a valid icon URL, use it
  if (category.icon && (category.icon.startsWith('http') || category.icon.startsWith('//'))) {
    return category.icon;
  }
  
  // Generate a placeholder based on category name
  const categorySlug = category.slug || category.name || 'category';
  return generatePlaceholderImage(category.name, categorySlug, 200, 200);
};