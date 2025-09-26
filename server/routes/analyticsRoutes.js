import express from 'express';
import { 
  getDailyActiveUsers,
  getCourseViewsByCategory,
  getReviewTrends
} from '../controllers/analyticsController.js';
import { authMiddleware, isAdminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Apply admin middleware to all routes
router.use(isAdminMiddleware);

// Analytics endpoints
router.get('/daily-active-users', getDailyActiveUsers);
router.get('/course-views-by-category', getCourseViewsByCategory);
router.get('/review-trends', getReviewTrends);

export default router;