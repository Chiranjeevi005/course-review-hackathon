import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import axios from '../utils/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const ReviewsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    rating: '',
    sortBy: 'createdAt',
    sortOrder: -1
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalReviews: 0
  });

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        if (response.data.success) {
          setCourse(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course details');
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { rating, sortBy, sortOrder } = filters;
        const response = await axios.get(`/api/courses/${courseId}/reviews`, {
          params: {
            page: pagination.page,
            rating: rating || undefined,
            sortBy,
            sortOrder
          }
        });
        
        if (response.data.success) {
          setReviews(response.data.data);
          setPagination({
            page: response.data.page,
            totalPages: response.data.pages,
            totalReviews: response.data.total
          });
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchReviews();
    }
  }, [courseId, filters, pagination.page]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder: sortBy === 'rating' ? -1 : prev.sortOrder
    }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = (newReview) => {
    // Add the new review to the top of the list
    setReviews(prev => [newReview, ...prev]);
    setPagination(prev => ({
      ...prev,
      totalReviews: prev.totalReviews + 1
    }));
  };

  const handleHelpfulnessChange = (reviewId, updatedReview) => {
    setReviews(prev => 
      prev.map(review => 
        review._id === reviewId 
          ? { ...review, likes: updatedReview.likes, dislikes: updatedReview.dislikes } 
          : review
      )
    );
  };

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Reviews</h3>
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

  if (!course && !loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="px-4 sm:px-6 lg:px-8 py-12">
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

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <button 
              onClick={() => navigate('/')} 
              className="text-blue-600 hover:underline"
            >
              Home
            </button>
            <span className="mx-2 text-gray-400">/</span>
            <button 
              onClick={() => navigate('/courses')} 
              className="text-blue-600 hover:underline"
            >
              Courses
            </button>
            {course && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <button 
                  onClick={() => navigate(`/courses/category/${course.categoryId?._id || course.category}`)} 
                  className="text-blue-600 hover:underline"
                >
                  {course.categoryId?.name || course.category}
                </button>
                <span className="mx-2 text-gray-400">/</span>
                <button 
                  onClick={() => navigate(`/courses/${courseId}`)} 
                  className="text-blue-600 hover:underline"
                >
                  {course.title}
                </button>
              </>
            )}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">Reviews</span>
          </nav>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {course && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${star <= Math.round(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {course.rating} ({course.reviewsCount} reviews)
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {course.categoryId?.name || course.category}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {course.instructor?.name || course.instructor}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/courses/${courseId}`)}
                className="mt-4 md:mt-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                View Course Details
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('rating', filters.rating === rating ? '' : rating)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg ${
                        filters.rating === rating
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm">{rating} stars</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort Options */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSortChange('createdAt')}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-lg ${
                      filters.sortBy === 'createdAt'
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">Most Recent</span>
                  </button>
                  <button
                    onClick={() => handleSortChange('rating')}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-lg ${
                      filters.sortBy === 'rating'
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <span className="text-sm">Highest Rated</span>
                  </button>
                  <button
                    onClick={() => handleSortChange('helpful')}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-lg ${
                      filters.sortBy === 'helpful'
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <span className="text-sm">Most Helpful</span>
                  </button>
                </div>
              </div>
              
              {/* Clear Filters */}
              {(filters.rating || filters.sortBy !== 'createdAt' || filters.sortOrder !== -1) && (
                <button
                  onClick={() => {
                    setFilters({
                      rating: '',
                      sortBy: 'createdAt',
                      sortOrder: -1
                    });
                    setPagination(prev => ({
                      ...prev,
                      page: 1
                    }));
                  }}
                  className="mt-4 w-full py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Review Form */}
            <ReviewForm courseId={courseId} onReviewSubmit={handleReviewSubmit} />
            
            {/* Reviews Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Reviews ({pagination.totalReviews})
              </h2>
            </div>
            
            {/* Reviews List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews yet</h3>
                <p className="mt-2 text-gray-500">
                  Be the first to review this course!
                </p>
              </div>
            ) : (
              <>
                {reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    onHelpfulnessChange={handleHelpfulnessChange}
                  />
                ))}
                
                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className={`px-3 py-2 rounded-md ${
                          pagination.page === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.page <= 3) {
                          pageNum = i + 1;
                        } else if (pagination.page >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = pagination.page - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-2 rounded-md ${
                              pagination.page === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className={`px-3 py-2 rounded-md ${
                          pagination.page === pagination.totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;