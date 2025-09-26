import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  helpfulCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Ensure a user can only review a course once
reviewSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Index for sorting by helpfulness and recency
reviewSchema.index({ helpfulCount: -1, createdAt: -1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;