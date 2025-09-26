import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  preferences: {
    fieldOfInterest: {
      type: String,
      enum: ['technology', 'business', 'arts', 'health', 'science', 'education'],
      required: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    goal: {
      type: String,
      enum: ['career-change', 'skill-upgrade', 'hobby', 'certification'],
      required: true
    },
    learningStyle: {
      type: String,
      enum: ['video', 'text', 'projects', 'interactive'],
      required: true
    }
  },
  suggestedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure a user can only have one active recommendation profile
recommendationSchema.index({ userId: 1, isActive: 1 }, { unique: true });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;