import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from '../services/axiosConfig';

const ReviewCard = ({ review, onHelpfulnessChange }) => {
  const { user } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulness, setHelpfulness] = useState({
    likes: review.likes || 0,
    dislikes: review.dislikes || 0
  });
  const [hasVoted, setHasVoted] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleHelpfulVote = async (action) => {
    if (!user) {
      alert('Please log in to vote on reviews');
      return;
    }

    if (hasVoted) {
      alert('You have already voted on this review');
      return;
    }

    try {
      const response = await axios.patch(`/api/reviews/${review._id}/helpful`, { action });
      if (response.data.success) {
        setHelpfulness({
          likes: response.data.data.likes,
          dislikes: response.data.data.dislikes
        });
        setHasVoted(true);
        onHelpfulnessChange(review._id, response.data.data);
      }
    } catch (error) {
      console.error('Error voting on review:', error);
      alert('Failed to vote on review');
    }
  };

  // Truncate review text if it's too long
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const isLongReview = review.text.length > 150;
  const displayText = isExpanded ? review.text : truncateText(review.text);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold mr-3">
            {review.userId?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.userId?.name || 'Anonymous'}</h4>
            <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center">
          {/* Star rating */}
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-700">
          {displayText}
          {isLongReview && (
            <button
              onClick={toggleExpand}
              className="ml-1 text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Tags */}
      {review.tags && review.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {review.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Helpful buttons */}
      <div className="mt-4 flex items-center">
        <span className="text-sm text-gray-600 mr-3">Helpful?</span>
        <button
          onClick={() => handleHelpfulVote('like')}
          disabled={hasVoted}
          className={`flex items-center text-sm px-3 py-1 rounded-full ${
            hasVoted
              ? 'bg-gray-100 text-gray-500'
              : 'bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700'
          }`}
        >
          <svg
            className="w-4 h-4 mr-1"
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
          {helpfulness.likes}
        </button>
        <button
          onClick={() => handleHelpfulVote('dislike')}
          disabled={hasVoted}
          className={`flex items-center text-sm ml-2 px-3 py-1 rounded-full ${
            hasVoted
              ? 'bg-gray-100 text-gray-500'
              : 'bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700'
          }`}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m0 0v9m0-9h2.765a2 2 0 011.789 2.894l-3.5 7A2 2 0 0118.264 15H17m0 0v5m0-5h-2"
            />
          </svg>
          {helpfulness.dislikes}
        </button>
        {helpfulness.likes > 20 && (
          <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Helpful
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewCard;