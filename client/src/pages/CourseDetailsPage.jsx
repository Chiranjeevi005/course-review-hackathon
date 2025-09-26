import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Rating from '../components/Rating';
import axios from '../utils/axiosConfig';

// Function to generate category-specific gradient colors
const getCategoryColors = (category) => {
  const colors = {
    "Web Development": { bg: "from-blue-500 to-indigo-600", text: "text-white" },
    "Mobile Development": { bg: "from-emerald-500 to-teal-600", text: "text-white" },
    "Data Science": { bg: "from-violet-500 to-purple-600", text: "text-white" },
    "Artificial Intelligence": { bg: "from-orange-500 to-amber-600", text: "text-white" },
    "Cloud Computing": { bg: "from-sky-500 to-cyan-600", text: "text-white" },
    "Cybersecurity": { bg: "from-rose-500 to-red-600", text: "text-white" },
    "Blockchain": { bg: "from-amber-500 to-yellow-600", text: "text-white" },
    "Design": { bg: "from-pink-500 to-rose-600", text: "text-white" },
    "Graphic Design": { bg: "from-pink-500 to-rose-600", text: "text-white" },
    "Business": { bg: "from-cyan-500 to-sky-600", text: "text-white" },
    "Marketing": { bg: "from-violet-500 to-purple-600", text: "text-white" },
    "Finance": { bg: "from-teal-600 to-emerald-700", text: "text-white" },
    "Leadership": { bg: "from-indigo-500 to-blue-600", text: "text-white" },
    "Health": { bg: "from-green-500 to-emerald-600", text: "text-white" },
    "Language": { bg: "from-amber-500 to-yellow-600", text: "text-white" },
    "Music": { bg: "from-pink-500 to-rose-600", text: "text-white" },
    "Photography": { bg: "from-indigo-500 to-blue-600", text: "text-white" },
    "Writing": { bg: "from-sky-500 to-cyan-600", text: "text-white" },
    "Career": { bg: "from-indigo-500 to-blue-600", text: "text-white" },
    "Education": { bg: "from-emerald-500 to-teal-600", text: "text-white" },
    "Science": { bg: "from-orange-500 to-amber-600", text: "text-white" },
    "Personal Development": { bg: "from-violet-500 to-purple-600", text: "text-white" }
  };
  return colors[category] || { bg: "from-gray-500 to-gray-600", text: "text-white" };
};

// Function to generate enhanced placeholder SVG
const generatePlaceholderSVG = (category, width, height, isBanner = false) => {
  const colors = getCategoryColors(category);
  const encodedCategory = encodeURIComponent(category);
  const titleText = isBanner ? `${category} Course` : category;
  const encodedTitle = encodeURIComponent(titleText);
  
  // Create a more sophisticated SVG with gradient background, icon, and text
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)'/%3E%3Ccircle cx='${width/4}' cy='${height/3}' r='30' fill='rgba(255,255,255,0.2)'/%3E%3Ccircle cx='${3*width/4}' cy='${2*height/3}' r='50' fill='rgba(255,255,255,0.1)'/%3E%3Crect x='${width/6}' y='${height/2}' width='${2*width/3}' height='40' rx='20' fill='rgba(255,255,255,0.15)'/%3E%3Ctext x='50%25' y='${isBanner ? '40%25' : '50%25'}' font-family='Arial, sans-serif' font-size='${isBanner ? '24' : '18'}' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${encodedTitle}%3C/text%3E%3C/svg%3E`;
};

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        console.log('Fetching course with ID:', courseId);
        
        // First, try to fetch from the API (for real database courses)
        try {
          const response = await axios.get(`/api/courses/${courseId}`);
          console.log('API response:', response.data);
          
          if (response.data.success && response.data.data) {
            // Transform API course data to match our expected format
            const apiCourse = response.data.data;
            const transformedCourse = {
              courseId: apiCourse.courseId || apiCourse._id,
              title: apiCourse.title,
              description: apiCourse.description,
              category: apiCourse.categoryId?.name || apiCourse.category || 'Unknown',
              instructor: apiCourse.instructor?.name || apiCourse.instructor || 'Unknown Instructor',
              platform: apiCourse.platform || 'Unknown Platform',
              duration: apiCourse.duration || 'Not specified',
              level: apiCourse.difficulty || apiCourse.level || 'Not specified',
              price: apiCourse.price !== undefined ? apiCourse.price : 'Free',
              rating: apiCourse.rating || 0,
              enrollmentCount: apiCourse.reviewsCount || apiCourse.enrollmentCount || 0,
              language: apiCourse.language || 'English',
              certification: apiCourse.certification || 'No information available',
              prerequisites: 'No prerequisites specified',
              syllabus: [
                'Introduction to the course',
                'Core concepts and fundamentals',
                'Practical applications and exercises',
                'Final project and assessment'
              ],
              learningOutcomes: [
                'Understand core concepts of the subject',
                'Apply knowledge through practical exercises',
                'Complete hands-on projects',
                'Demonstrate proficiency in the subject area'
              ],
              tags: [apiCourse.categoryId?.name || apiCourse.category || 'Course'],
              image: apiCourse.thumbnail || apiCourse.image || null
            };
            
            setCourse(transformedCourse);
            return;
          }
        } catch (apiError) {
          console.log('API fetch failed:', apiError.message);
        }
        
        // If API fetch fails, show error since we want to use database data
        setError(`Course with ID '${courseId}' not found in the database. Please ensure the backend server is running and the course exists in the database.`);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(`Failed to load course details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    } else {
      setError('No course ID provided');
      setLoading(false);
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Course</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Course Not Found</h3>
            <p className="text-gray-500 mb-4">The requested course could not be found.</p>
            <button
              onClick={() => navigate('/courses')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get category-specific colors
  const categoryColors = getCategoryColors(course.category);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/courses" className="text-blue-600 hover:underline">Courses</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/courses/category/${course.category}`} className="text-blue-600 hover:underline">{course.category}</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Course Details */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="flex items-center">
                    <Rating rating={course.rating} ratingCount={course.enrollmentCount} />
                  </div>
                  <span className="text-gray-600 text-sm sm:text-base">({course.enrollmentCount.toLocaleString()} students)</span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full">
                    {course.level}
                  </span>
                  <Link 
                    to={`/courses/${courseId}/reviews`} 
                    className="px-2 py-1 sm:px-3 sm:py-1.5 bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-medium rounded-full hover:bg-yellow-200 transition-colors"
                  >
                    See Reviews
                  </Link>
                </div>
                
                <p className="text-gray-700 text-base sm:text-lg mb-5 sm:mb-6">
                  {course.description}
                </p>
                
                {/* Course Banner Image */}
                <div className="mb-6 sm:mb-8 rounded-xl overflow-hidden shadow-lg">
                  {course.image ? (
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover"
                      onError={(e) => {
                        // Fallback to category-based placeholder if image fails to load
                        e.target.src = generatePlaceholderSVG(course.category, 800, 400, true);
                      }}
                    />
                  ) : (
                    <div className={`w-full h-48 sm:h-56 md:h-64 bg-gradient-to-r ${categoryColors.bg} flex items-center justify-center`}>
                      <span className={`${categoryColors.text} text-lg sm:text-xl md:text-2xl font-bold text-center px-3 sm:px-4`}>
                        {course.category} Course
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Instructor */}
                <div className="flex items-center mb-6 sm:mb-8 p-4 sm:p-5 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`bg-gradient-to-br ${categoryColors.bg} rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg sm:text-xl">
                        {course.instructor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Instructor</h3>
                    <p className="text-gray-700 text-sm sm:text-base">{course.instructor}</p>
                  </div>
                </div>
                
                {/* Learning Outcomes */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">What you'll learn</h2>
                  <ul className="grid grid-cols-1 gap-2 sm:gap-3">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm sm:text-base">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Syllabus */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Course Content</h2>
                  <div className="border border-gray-200 rounded-lg">
                    {course.syllabus.map((module, index) => (
                      <div 
                        key={index} 
                        className={`p-3 sm:p-4 flex items-center ${index !== course.syllabus.length - 1 ? 'border-b border-gray-200' : ''}`}
                      >
                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 sm:mr-3">
                          <span className="text-blue-800 font-medium text-xs sm:text-sm">{index + 1}</span>
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Prerequisites */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Prerequisites</h2>
                  <div className="p-4 sm:p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-gray-700 text-sm sm:text-base">{course.prerequisites}</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="sticky top-6"
              >
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  {/* Course Image */}
                  <div className="w-full h-40 sm:h-48 md:h-52 overflow-hidden">
                    {course.image ? (
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to category-based placeholder if image fails to load
                          e.target.src = generatePlaceholderSVG(course.category, 600, 400);
                        }}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-r ${categoryColors.bg} flex items-center justify-center`}>
                        <span className={`${categoryColors.text} text-base sm:text-lg font-bold text-center px-3`}>
                          {course.category}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="mb-5 sm:mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          {course.certification.includes('Yes') ? 'Certificate' : 'No Certificate'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">{course.duration}</p>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                      <div className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs sm:text-sm">{course.duration}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-xs sm:text-sm">{course.language}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <button className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base">
                        Enroll Now
                      </button>
                      <button className="w-full bg-white text-blue-600 border border-blue-600 py-2.5 sm:py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm sm:text-base">
                        Save for Later
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="mt-5 sm:mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;