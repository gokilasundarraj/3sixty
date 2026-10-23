import { Router } from 'express';
import {
  getApprovedReviews,
  createReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// GET /api/reviews — retrieve approved customer reviews
router.get('/', getApprovedReviews);

// POST /api/reviews — submit review directly with optional profile photo
router.post('/', upload.single('image'), createReview);

// DELETE /api/reviews/:id — delete review
router.delete('/:id', deleteReview);

export default router;
