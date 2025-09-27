import HomePageReview from '../models/HomePageReview.js';

// @desc    Get all home page reviews
// @route   GET /api/homepage-reviews
// @access  Public
export const getHomePageReviews = async (req, res) => {
  try {
    const reviews = await HomePageReview.find().sort({ reviewId: 1 });
    
    // If no reviews exist in database, create default ones
    if (reviews.length === 0) {
      const defaultReviews = [
        {
          reviewId: 1,
          userName: 'Veer Mahadev',
          courseTitle: 'Advanced JavaScript Concepts',
          rating: 5,
          comment: 'This course completely transformed my understanding of JavaScript. The instructor explains complex topics in a very accessible way.',
          upvotes: 24,
        },
        {
          reviewId: 2,
          userName: 'Sarah Williams',
          courseTitle: 'Data Visualization with D3.js',
          rating: 4,
          comment: 'Excellent content and well-structured modules. The hands-on projects really helped solidify my learning.',
          upvotes: 18,
        },
        {
          reviewId: 3,
          userName: 'Nicole Smith',
          courseTitle: 'Cloud Architecture Fundamentals',
          rating: 5,
          comment: 'As a DevOps engineer, this course gave me the foundational knowledge I needed to advance my career. Highly recommended!',
          upvotes: 32,
        }
      ];
      
      // Insert default reviews
      await HomePageReview.insertMany(defaultReviews);
      
      // Return the newly created reviews
      const newReviews = await HomePageReview.find().sort({ reviewId: 1 });
      return res.json({
        success: true,
        count: newReviews.length,
        data: newReviews
      });
    }
    
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Error fetching home page reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching home page reviews'
    });
  }
};

// @desc    Update upvotes for a home page review
// @route   PATCH /api/homepage-reviews/:reviewId/upvote
// @access  Public
export const upvoteHomePageReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    // Find and update the review
    const review = await HomePageReview.findOneAndUpdate(
      { reviewId: parseInt(reviewId) },
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error upvoting home page review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while upvoting review'
    });
  }
};