import Review from '../models/Review.js';
import Course from '../models/Course.js';
import mongoose from 'mongoose';

// @desc    Get all reviews for a course
// @route   GET /api/courses/:courseId/reviews
// @access  Public
export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { page = 1, limit = 10, rating, sortBy = 'createdAt', sortOrder = -1 } = req.query;
    
    console.log('Fetching reviews for course:', courseId);
    console.log('Query params:', { page, limit, rating, sortBy, sortOrder });
    
    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }
    
    // Build query
    let query = { courseId };
    
    // Add rating filter
    if (rating) {
      query.rating = parseInt(rating);
    }
    
    // Build sort object
    let sort = {};
    if (sortBy === 'helpful') {
      sort.likes = parseInt(sortOrder);
    } else if (sortBy === 'rating') {
      sort.rating = parseInt(sortOrder);
    } else {
      sort.createdAt = parseInt(sortOrder);
    }
    
    console.log('Query object:', query);
    console.log('Sort object:', sort);
    
    // Execute query with pagination
    const reviews = await Review.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('userId', 'name');
    
    console.log('Found reviews:', reviews.length);
    
    // Get total count for pagination
    const total = await Review.countDocuments(query);
    
    res.json({
      success: true,
      count: reviews.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: reviews
    });
  } catch (error) {
    console.error('Error fetching course reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course reviews',
      error: error.message
    });
  }
};

// @desc    Create a review for a course
// @route   POST /api/courses/:courseId/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating, text, tags } = req.body;
    const userId = req.user._id;
    
    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }
    
    // Check if user already reviewed this course
    const existingReview = await Review.findOne({ 
      userId, 
      courseId
    });
    
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this course'
      });
    }
    
    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    // Create review
    const review = await Review.create({
      userId,
      courseId,
      rating,
      text,
      tags: tags || []
    });
    
    // Populate user info
    await review.populate('userId', 'name');
    
    // Update course rating and reviews count
    await updateCourseRating(courseId);
    
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error creating review:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating review'
    });
  }
};

// @desc    Update helpfulness of a review (like/dislike)
// @route   PATCH /api/reviews/:id/helpful
// @access  Private
export const updateReviewHelpfulness = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'like' or 'dislike'
    
    // Validate review ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid review ID'
      });
    }
    
    // Find the review
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Update likes/dislikes based on action
    if (action === 'like') {
      review.likes += 1;
    } else if (action === 'dislike') {
      review.dislikes += 1;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be "like" or "dislike"'
      });
    }
    
    await review.save();
    
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error updating review helpfulness:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating review helpfulness'
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate review ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid review ID'
      });
    }
    
    // Find the review
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Check if user is admin or owner of the review
    if (req.user.role !== 'admin' && review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }
    
    // Delete the review
    await review.remove();
    
    // Update course rating and reviews count
    await updateCourseRating(review.courseId);
    
    res.json({
      success: true,
      message: 'Review removed'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting review'
    });
  }
};

// Helper function to update course rating and reviews count
const updateCourseRating = async (courseId) => {
  try {
    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      console.error('Invalid course ID for rating update:', courseId);
      return;
    }
    
    // Get all reviews for this course
    const reviews = await Review.find({ courseId });
    
    // Calculate average rating
    const totalReviews = reviews.length;
    const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalReviews > 0 ? (sumRatings / totalReviews) : 0;
    
    // Update course
    await Course.findByIdAndUpdate(courseId, {
      rating: parseFloat(averageRating.toFixed(1)),
      reviewsCount: totalReviews
    });
  } catch (error) {
    console.error('Error updating course rating:', error);
  }
};