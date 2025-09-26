import Event from '../models/Event.js';
import Course from '../models/Course.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

// Get daily active users for the last 30 days
export const getDailyActiveUsers = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Aggregate events by day
    const dailyData = await Event.aggregate([
      {
        $match: {
          type: 'user_online',
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    // Format data for the chart
    const formattedData = dailyData.map(item => ({
      day: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      users: item.count
    }));
    
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching daily active users:', error);
    res.status(500).json({ error: 'Failed to fetch daily active users' });
  }
};

// Get course views by category
export const getCourseViewsByCategory = async (req, res) => {
  try {
    // Get view_course events from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Aggregate course views by category
    const categoryData = await Event.aggregate([
      {
        $match: {
          type: 'view_course',
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'metadata.courseId',
          foreignField: '_id',
          as: 'course'
        }
      },
      {
        $unwind: '$course'
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'course.categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $group: {
          _id: '$category.name',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    // Format data for the chart
    const formattedData = categoryData.map(item => ({
      category: item._id,
      views: item.count
    }));
    
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching course views by category:', error);
    res.status(500).json({ error: 'Failed to fetch course views by category' });
  }
};

// Get review submission trends for the last 30 days
export const getReviewTrends = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Aggregate reviews by day
    const reviewData = await Review.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    // Format data for the chart
    const formattedData = reviewData.map(item => ({
      day: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      reviews: item.count
    }));
    
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching review trends:', error);
    res.status(500).json({ error: 'Failed to fetch review trends' });
  }
};