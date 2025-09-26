import express from 'express';
import {
  getCourseReviews,
  createReview,
  updateReviewHelpfulness,
  deleteReview
} from '../controllers/reviewController.js';
import { authMiddleware as protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

// Public routes
router.route('/')
  .get(getCourseReviews);

// Protected routes
router.route('/')
  .post(protect, createReview);

router.route('/:id/helpful')
  .patch(protect, updateReviewHelpfulness);

router.route('/:id')
  .delete(protect, deleteReview);

export default router;