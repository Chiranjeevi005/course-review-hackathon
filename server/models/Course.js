import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  instructor: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    profileImage: {
      type: String,
      default: ''
    }
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true
  },
  duration: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0,
    min: 0
  },
  language: {
    type: String,
    default: 'english'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for frequently queried fields
courseSchema.index({ categoryId: 1 });
courseSchema.index({ difficulty: 1 });
courseSchema.index({ price: 1 });
courseSchema.index({ rating: -1 });
courseSchema.index({ title: 'text', description: 'text' });

const Course = mongoose.model('Course', courseSchema);

export default Course;