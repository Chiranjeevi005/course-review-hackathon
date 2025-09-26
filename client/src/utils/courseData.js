// Import course data directly
import courses from '../../new_courses.json';

// Create a map for faster lookups
const courseMap = new Map(courses.map(course => [course.courseId, course]));

export const getCourseById = (courseId) => {
  return courseMap.get(courseId) || null;
};

export const getAllCourses = () => {
  return courses;
};