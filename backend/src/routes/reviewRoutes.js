import { Router } from 'express';
import {
  getApprovedReviews,
  createReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { reviewUpload } from '../middleware/upload.js';

const router = Router();

// GET /api/reviews — retrieve approved customer reviews
router.get('/', getApprovedReviews);

// POST /api/reviews — submit review with optional profileImage + up to 5 projectImages
router.post('/', reviewUpload, createReview);

// DELETE /api/reviews/:id — delete review
router.delete('/:id', deleteReview);

export default router;
