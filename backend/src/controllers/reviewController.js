import Review from '../models/Review.js';
import { successResponse, errorResponse } from '../common/responseHelper.js';
import { uploadToCloudinary } from '../middleware/upload.js';

const MAX_NAME_LEN = 60;
const MAX_MSG_LEN = 1000;

// Helper to normalize phone numbers for consistency (removes spaces and dashes)
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
      // projectImages: always an array (empty for old reviews)
      projectImages: Array.isArray(r.projectImages) ? r.projectImages : [],
      // imageUrl kept for legacy — do NOT surface it in the card body
      imageUrl: r.imageUrl || '',
      status: r.status,
      createdAt: r.createdAt,
    }));
    return successResponse(res, formatted);
  } catch (error) {
    next(error);
  }
};

// POST /api/reviews — directly submit a review (one review per phone number)
export const createReview = async (req, res, next) => {
  try {
    const { userName, phone, rating, message, projectType } = req.body;

    // ── Name validation ──────────────────────────────────────────────────────
    if (!userName || !userName.trim()) {
      return errorResponse(res, 'Name is required.', 400);
    }
    if (userName.trim().length > MAX_NAME_LEN) {
      return errorResponse(res, `Name must be ${MAX_NAME_LEN} characters or fewer.`, 400);
    }

    // ── Phone validation ─────────────────────────────────────────────────────
    if (!phone || !phone.trim()) {
      return errorResponse(res, 'Phone number is required.', 400);
    }
    const cleanPhone = normalizePhone(phone);
    if (cleanPhone.length < 7) {
      return errorResponse(res, 'Please enter a valid phone number.', 400);
    }

    // ── Duplicate check ──────────────────────────────────────────────────────
    const existingReview = await Review.findOne({
      $or: [{ phone: cleanPhone }, { phone: phone.trim() }],
    });
    if (existingReview) {
      return errorResponse(res, 'You have already submitted a review with this phone number.', 409);
    }

    // ── Rating ───────────────────────────────────────────────────────────────
    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return errorResponse(res, 'Rating must be between 1 and 5 stars.', 400);
    }

    // ── Message validation ───────────────────────────────────────────────────
    const cleanMessage = (message || '').trim();
    if (!cleanMessage) {
      return errorResponse(res, 'Review feedback is required.', 400);
    }
    if (cleanMessage.length > MAX_MSG_LEN) {
      return errorResponse(res, `Review must be ${MAX_MSG_LEN} characters or fewer.`, 400);
    }

    // ── Profile avatar upload ────────────────────────────────────────────────
    // req.files is an object when using .fields(); req.files.profileImage is an array
    let avatarUrl = '';
    const profileImageFile = req.files?.profileImage?.[0] || req.files?.image?.[0];
    if (profileImageFile?.buffer) {
      try {
        avatarUrl = await uploadToCloudinary(
          profileImageFile.buffer,
          '3sixty-avatars',
          { transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face', quality: 'auto', fetch_format: 'auto' }] }
        );
      } catch (uploadErr) {
        console.error('[Avatar upload error]', uploadErr.message);
        // Fallback: base64 data URI (works without Cloudinary credentials)
        avatarUrl = `data:${profileImageFile.mimetype};base64,${profileImageFile.buffer.toString('base64')}`;
      }
    }

    // ── Project proof images upload ──────────────────────────────────────────
    const projectImageFiles = req.files?.projectImages || [];
    if (projectImageFiles.length > 5) {
      return errorResponse(res, 'You can upload at most 5 project images.', 400);
    }

    const projectImageUrls = [];
    for (const file of projectImageFiles) {
      if (!file.buffer) continue;
      try {
        const url = await uploadToCloudinary(file.buffer, '3sixty-project-proofs');
        projectImageUrls.push(url);
      } catch (uploadErr) {
        console.error('[Project image upload error]', uploadErr.message);
        // Fallback base64
        projectImageUrls.push(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
      }
    }

    // ── Create document ──────────────────────────────────────────────────────
    const review = await Review.create({
      userName: userName.trim(),
      phone: cleanPhone,
      rating: numRating,
      message: cleanMessage,
      projectType: (projectType && projectType.trim()) || 'Customer Review',
      userAvatar: avatarUrl,
      projectImages: projectImageUrls,
      // imageUrl left empty — profile avatar is NOT stored here any more
      imageUrl: '',
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
        projectImages: review.projectImages,
        imageUrl: review.imageUrl,
        status: review.status,
        createdAt: review.createdAt,
      },
      'Review submitted successfully.',
      201
    );
  } catch (error) {
    if (error.code === 11000) {
      return errorResponse(res, 'You have already submitted a review with this phone number.', 409);
    }
    // multer file-size or file-count limit
    if (error.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 'Each image must be 5 MB or smaller.', 413);
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return errorResponse(res, 'You can upload at most 5 project images.', 400);
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return errorResponse(res, 'Unexpected file field. Use profileImage or projectImages.', 400);
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
