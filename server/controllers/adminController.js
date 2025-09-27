import Course from '../models/Course.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import UserTrackingService from '../services/userTrackingService.js';

export const getAdminStats = async (req, res) => {
  try {
    // Count all active registered users (users who haven't deactivated their accounts)
    const activeUserCount = await User.countDocuments({ isActive: true });
    const totalCourses = await Course.countDocuments();
    const reviewsToday = await Review.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    });

    res.json({
      usersOnline: activeUserCount,
      coursesAvailable: totalCourses,
      reviewsSubmittedToday: reviewsToday
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const getTrendingCourses = async (req, res) => {
  try {
    const trendingCourses = await UserTrackingService.getTrendingCourses();
    res.json(trendingCourses);
  } catch (error) {
    console.error('Error fetching trending courses:', error);
    res.status(500).json({ error: 'Failed to fetch trending courses' });
  }
};

export const getRecentEvents = async (req, res) => {
  try {
    const events = await UserTrackingService.getRecentEvents(50);
    res.json(events);
  } catch (error) {
    console.error('Error fetching recent events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get active users
export const getActiveUsers = async (req, res) => {
  try {
    const activeUsers = await UserTrackingService.getActiveUsers();
    res.json(activeUsers);
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).json({ error: 'Failed to fetch active users' });
  }
};

// Course CRUD operations
export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

// Review management
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name')
      .populate('courseId', 'title')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

// User management
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error deactivating user:', error);
    res.status(500).json({ error: 'Failed to deactivate user' });
  }
};