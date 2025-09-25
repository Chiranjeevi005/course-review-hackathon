import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  seedCategories
} from '../controllers/categoryController.js';
import { authMiddleware as protect, isAdminMiddleware as admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/')
  .get(getCategories);

router.route('/:id')
  .get(getCategory);

// Admin routes
router.route('/')
  .post(protect, admin, createCategory);

router.route('/:id')
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

// Seed route (for development only)
router.route('/seed')
  .post(protect, admin, seedCategories);

export default router;