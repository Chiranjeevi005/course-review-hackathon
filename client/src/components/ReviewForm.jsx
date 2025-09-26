import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/axiosConfig';
import tracking from '../utils/tracking';

const ReviewForm = ({ courseId, onReviewSubmit }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Available tags for reviews
  const availableTags = [
    'Beginner-Friendly',
    'Career-Boosting',
    'Practical',
    'Well-Structured',
    'Engaging',
    'Challenging',
    'Comprehensive',
    'Value-for-Money'
  ];

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setSubmitStatus({ type: 'error', message: 'Please log in to submit a review' });
      return;
    }
    
    if (rating === 0) {
      setSubmitStatus({ type: 'error', message: 'Please select a rating' });
      return;
    }
    
    if (reviewText.trim().length < 10) {
      setSubmitStatus({ type: 'error', message: 'Review must be at least 10 characters' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await axios.post(`/api/courses/${courseId}/reviews`, {
        rating,
        text: reviewText,
        tags: selectedTags
      });
      
      if (response.data.success) {
        setSubmitStatus({ type: 'success', message: 'Review submitted successfully!' });
        setRating(0);
        setReviewText('');
        setSelectedTags([]);
        
        // Track review submission
        tracking.trackReviewSubmission(user._id, courseId, rating);
        
        onReviewSubmit(response.data.data);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit review';
      setSubmitStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Write a Review</h3>
        <p className="text-gray-600 mb-4">
          Please <a href="/login" className="text-blue-600 hover:underline">log in</a> to write a review.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-2xl focus:outline-none"
              >
                <span className={star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              </button>
            ))}
            <span className="ml-2 text-gray-600">
              {rating > 0 ? `${rating} Star${rating > 1 ? 's' : ''}` : 'Select rating'}
            </span>
          </div>
        </div>
        
        {/* Review Text */}
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="review"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Share your experience with this course..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">
            {reviewText.length}/1000 characters
          </p>
        </div>
        
        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Select up to 3)
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Submit Status */}
        {submitStatus && (
          <div className={`mb-4 p-3 rounded-lg ${
            submitStatus.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-white ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </motion.div>
  );
};

export default ReviewForm;