// Utility functions for tracking user events

let socket = null;

// Initialize tracking with socket connection
export const initTracking = (socketInstance) => {
  socket = socketInstance;
};

// Track course view
export const trackCourseView = (userId, courseId, courseTitle) => {
  if (socket && socket.connected) {
    socket.emit('view_course', {
      userId,
      courseId,
      courseTitle,
      ipAddress: null,
      userAgent: navigator.userAgent
    });
  }
};

// Track review submission
export const trackReviewSubmission = (userId, courseId, rating) => {
  if (socket && socket.connected) {
    socket.emit('review_submit', {
      userId,
      courseId,
      rating,
      ipAddress: null,
      userAgent: navigator.userAgent
    });
  }
};

// Track search
export const trackSearch = (userId, query) => {
  if (socket && socket.connected) {
    socket.emit('search', {
      userId,
      query,
      ipAddress: null,
      userAgent: navigator.userAgent
    });
  }
};

export default {
  initTracking,
  trackCourseView,
  trackReviewSubmission,
  trackSearch
};