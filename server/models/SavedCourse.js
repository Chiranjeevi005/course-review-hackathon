import mongoose from 'mongoose';

const savedCourseSchema = new mongoose.Schema({
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
  }
}, {
  timestamps: true
});

// Ensure a user can only save a course once
savedCourseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const SavedCourse = mongoose.model('SavedCourse', savedCourseSchema);

export default SavedCourse;