import redisClient from '../utils/redisClient.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

const ACTIVE_USERS_KEY_PREFIX = 'activeUsers:';
const ONLINE_STATUS_TTL = 120; // 2 minutes in seconds

class UserTrackingService {
  /**
   * Mark a user as online in Redis and update MongoDB
   * @param {string} userId - The user ID
   * @param {string} userName - The user name
   * @param {string} ipAddress - The IP address of the user
   */
  static async setUserOnline(userId, userName, ipAddress) {
    try {
      const key = `${ACTIVE_USERS_KEY_PREFIX}${userId}`;
      const userData = {
        userId,
        name: userName,
        lastActiveAt: new Date().toISOString(),
        ipAddress
      };

      // Store in Redis with TTL
      await redisClient.setEx(key, ONLINE_STATUS_TTL, JSON.stringify(userData));

      // Update MongoDB
      await User.findByIdAndUpdate(userId, {
        isOnline: true,
        lastActiveAt: new Date()
      });

      // Log event
      await Event.create({
        userId,
        type: 'user_online',
        ipAddress
      });

      console.log(`User ${userName} (${userId}) marked as online`);
    } catch (error) {
      console.error('Error setting user online:', error);
    }
  }

  /**
   * Mark a user as offline in Redis and update MongoDB
   * @param {string} userId - The user ID
   * @param {string} userName - The user name
   */
  static async setUserOffline(userId, userName) {
    try {
      const key = `${ACTIVE_USERS_KEY_PREFIX}${userId}`;

      // Remove from Redis
      await redisClient.del(key);

      // Update MongoDB
      await User.findByIdAndUpdate(userId, {
        isOnline: false
      });

      // Log event
      await Event.create({
        userId,
        type: 'user_offline'
      });

      console.log(`User ${userName} (${userId}) marked as offline`);
    } catch (error) {
      console.error('Error setting user offline:', error);
    }
  }

  /**
   * Update user's last activity timestamp
   * @param {string} userId - The user ID
   * @param {string} userName - The user name
   * @param {string} ipAddress - The IP address of the user
   */
  static async updateUserActivity(userId, userName, ipAddress) {
    try {
      const key = `${ACTIVE_USERS_KEY_PREFIX}${userId}`;
      const userData = {
        userId,
        name: userName,
        lastActiveAt: new Date().toISOString(),
        ipAddress
      };

      // Update in Redis with TTL
      await redisClient.setEx(key, ONLINE_STATUS_TTL, JSON.stringify(userData));

      // Update MongoDB
      await User.findByIdAndUpdate(userId, {
        lastActiveAt: new Date()
      });

      console.log(`Updated activity for user ${userName} (${userId})`);
    } catch (error) {
      console.error('Error updating user activity:', error);
    }
  }

  /**
   * Get the count of active users
   * @returns {Promise<number>} The count of active users
   */
  static async getActiveUserCount() {
    try {
      const keys = await redisClient.keys(`${ACTIVE_USERS_KEY_PREFIX}*`);
      return keys.length;
    } catch (error) {
      console.error('Error getting active user count:', error);
      return 0;
    }
  }

  /**
   * Get all active users
   * @returns {Promise<Array>} Array of active users
   */
  static async getActiveUsers() {
    try {
      const keys = await redisClient.keys(`${ACTIVE_USERS_KEY_PREFIX}*`);
      const users = [];

      for (const key of keys) {
        const userData = await redisClient.get(key);
        if (userData) {
          users.push(JSON.parse(userData));
        }
      }

      // Sort by last active time (most recent first)
      return users.sort((a, b) => new Date(b.lastActiveAt) - new Date(a.lastActiveAt));
    } catch (error) {
      console.error('Error getting active users:', error);
      return [];
    }
  }

  /**
   * Log a user event
   * @param {string} userId - The user ID
   * @param {string} eventType - The type of event
   * @param {Object} metadata - Additional event metadata
   * @param {string} ipAddress - The IP address of the user
   * @param {string} userAgent - The user agent string
   */
  static async logUserEvent(userId, eventType, metadata = {}, ipAddress = null, userAgent = null) {
    try {
      await Event.create({
        userId,
        type: eventType,
        metadata,
        ipAddress,
        userAgent
      });

      console.log(`Logged event ${eventType} for user ${userId}`);
    } catch (error) {
      console.error('Error logging user event:', error);
    }
  }

  /**
   * Get recent events
   * @param {number} limit - Number of events to return
   * @returns {Promise<Array>} Array of recent events
   */
  static async getRecentEvents(limit = 50) {
    try {
      return await Event.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('userId', 'name')
        .lean();
    } catch (error) {
      console.error('Error getting recent events:', error);
      return [];
    }
  }

  /**
   * Get trending courses based on view events
   * @param {number} hours - Number of hours to look back
   * @param {number} limit - Number of courses to return
   * @returns {Promise<Array>} Array of trending courses
   */
  static async getTrendingCourses(hours = 1, limit = 5) {
    try {
      const since = new Date(Date.now() - hours * 60 * 60 * 1000);
      
      const trending = await Event.aggregate([
        {
          $match: {
            type: 'view_course',
            createdAt: { $gte: since }
          }
        },
        {
          $group: {
            _id: '$metadata.courseId',
            count: { $sum: 1 },
            title: { $first: '$metadata.courseTitle' }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: limit
        }
      ]);

      return trending;
    } catch (error) {
      console.error('Error getting trending courses:', error);
      return [];
    }
  }
}

export default UserTrackingService;