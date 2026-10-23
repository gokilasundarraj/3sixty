import Review from '../models/Review.js';
import { successResponse, errorResponse } from '../common/responseHelper.js';
import { uploadToCloudinary } from '../middleware/upload.js';

// Helper to normalize phone numbers for consistency (e.g. removes spaces and dashes)
function normalizePhone(phone) {
  return String(phone || '').trim().replace(/[\s-]/g, '');
}

// GET /api/reviews — retrieve all approved reviews for display
export const getApprovedReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    const formatted = reviews.map((r) => ({
      id: r._id.toString(),
      _id: r._id.toString(),
      userName: r.userName,
      phone: r.phone || '',
      userAvatar: r.userAvatar || '',
      userPhoto: r.userAvatar || '',
      rating: r.rating,
      message: r.message,
      projectType: r.projectType || 'Customer Review',
      imageUrl: r.imageUrl || '',
      status: r.status,
      createdAt: r.createdAt,
    }));
    return successResponse(res, formatted);
  } catch (error) {
    next(error);
  }
};

// POST /api/reviews — directly submit a review (One review per phone number)
export const createReview = async (req, res, next) => {
  try {
    const { userName, phone, rating, message, projectType } = req.body;

    // Validation
    if (!userName || !userName.trim()) {
      return errorResponse(res, 'Name is required.', 400);
    }

    if (!phone || !phone.trim()) {
      return errorResponse(res, 'Phone number is required.', 400);
    }

    const cleanPhone = normalizePhone(phone);
    if (cleanPhone.length < 7) {
      return errorResponse(res, 'Please enter a valid phone number.', 400);
    }

    // Check if a review has already been submitted with this phone number
    const existingReview = await Review.findOne({
      $or: [
        { phone: cleanPhone },
        { phone: phone.trim() },
      ],
    });

    if (existingReview) {
      return errorResponse(
        res,
        'You have already submitted a review with this phone number.',
        409
      );
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return errorResponse(res, 'Rating must be between 1 and 5 stars.', 400);
    }

    const cleanMessage = (message || '').trim();
    if (!cleanMessage) {
      return errorResponse(res, 'Review feedback is required.', 400);
    }

    // Handle optional profile photo upload
    let avatarUrl = '';
    if (req.file && req.file.buffer) {
      try {
        avatarUrl = await uploadToCloudinary(req.file.buffer, '3sixty-avatars');
      } catch (uploadErr) {
        console.error('[Upload error]', uploadErr.message);
        // Fallback to base64 data URI if Cloudinary is unconfigured
        avatarUrl = `data:${req.file.mimetype || 'image/jpeg'};base64,${req.file.buffer.toString('base64')}`;
      }
    }

    const review = await Review.create({
      userName: userName.trim(),
      phone: cleanPhone,
      rating: numRating,
      message: cleanMessage,
      projectType: (projectType && projectType.trim()) || 'Customer Review',
      userAvatar: avatarUrl,
      imageUrl: avatarUrl,
      status: 'approved',
    });

    return successResponse(
      res,
      {
        id: review._id.toString(),
        _id: review._id.toString(),
        userName: review.userName,
        phone: review.phone,
        userAvatar: review.userAvatar,
        userPhoto: review.userAvatar,
        rating: review.rating,
        message: review.message,
        projectType: review.projectType,
        imageUrl: review.imageUrl,
        status: review.status,
        createdAt: review.createdAt,
      },
      'Review submitted successfully.',
      201
    );
  } catch (error) {
    // Catch MongoDB duplicate key error on phone (code 11000)
    if (error.code === 11000) {
      return errorResponse(
        res,
        'You have already submitted a review with this phone number.',
        409
      );
    }
    next(error);
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return errorResponse(res, 'Review not found', 404);
    return successResponse(res, null, 'Review deleted successfully');
  } catch (error) {
    next(error);
  }
};
