import express from 'express';
import { 
  getAdminStats, 
  getTrendingCourses, 
  getRecentEvents,
  getActiveUsers,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllReviews,
  deleteReview,
  getAllUsers,
  updateUserRole,
  deactivateUser
} from '../controllers/adminController.js';
import { authMiddleware, isAdminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Apply admin middleware to all routes
router.use(isAdminMiddleware);

// Stats and analytics
router.get('/stats', getAdminStats);
router.get('/trending-courses', getTrendingCourses);
router.get('/recent-events', getRecentEvents);
router.get('/active-users', getActiveUsers);

// Course management (CRUD)
router.post('/course', createCourse);
router.put('/course/:id', updateCourse);
router.delete('/course/:id', deleteCourse);

// Review management
router.get('/reviews', getAllReviews);
router.delete('/review/:id', deleteReview);

// User management
router.get('/users', getAllUsers);
router.put('/user/:id/role', updateUserRole);
router.put('/user/:id/deactivate', deactivateUser);

export default router;