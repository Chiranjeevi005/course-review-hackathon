import mongoose from 'mongoose';

const homePageReviewSchema = new mongoose.Schema({
  reviewId: {
    type: Number,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  courseTitle: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for reviewId
homePageReviewSchema.index({ reviewId: 1 });

const HomePageReview = mongoose.model('HomePageReview', homePageReviewSchema);

export default HomePageReview;