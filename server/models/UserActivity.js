import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
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
  action: {
    type: String,
    enum: ['viewed', 'enrolled', 'completed'],
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for querying user activities
userActivitySchema.index({ userId: 1, action: 1 });
userActivitySchema.index({ courseId: 1, action: 1 });
userActivitySchema.index({ action: 1, createdAt: -1 });

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;