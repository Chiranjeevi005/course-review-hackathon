import express from 'express';
import {
  getCourses,
  getCourse,
  getCoursesByCategory,
  searchCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { authMiddleware as protect, isAdminMiddleware as admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/')
  .get(getCourses);

router.route('/search')
  .get(searchCourses);

router.route('/:id')
  .get(getCourse);

router.route('/category/:categoryId')
  .get(getCoursesByCategory);

// Admin routes
router.route('/')
  .post(protect, admin, createCourse);

router.route('/:id')
  .put(protect, admin, updateCourse)
  .delete(protect, admin, deleteCourse);

export default router;