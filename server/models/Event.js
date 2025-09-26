import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['user_online', 'user_offline', 'view_course', 'search', 'review_submit', 'page_view']
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Index for querying by type and timestamp
eventSchema.index({ type: 1, createdAt: -1 });
eventSchema.index({ userId: 1, type: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;