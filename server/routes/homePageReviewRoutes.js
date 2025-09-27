import express from 'express';
import {
  getHomePageReviews,
  upvoteHomePageReview
} from '../controllers/homePageReviewController.js';

const router = express.Router();

// Public routes
router.route('/')
  .get(getHomePageReviews);

router.route('/:reviewId/upvote')
  .patch(upvoteHomePageReview);

export default router;