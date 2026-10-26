import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [60, 'Name must be 60 characters or fewer.'],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    // Profile avatar URL (Cloudinary) — shown only in the small avatar circle
    userAvatar: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, 'Review must be 1000 characters or fewer.'],
    },
    projectType: {
      type: String,
      default: 'Customer Review',
    },
    // Project proof / screenshot URLs (Cloudinary) — array of up to 5
    projectImages: {
      type: [String],
      default: [],
    },
    // Legacy field kept for backwards compatibility; no longer set to avatar URL
    imageUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'hidden'],
      default: 'approved',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.virtual('userPhoto').get(function () {
  return this.userAvatar;
});

export const Review = mongoose.model('Review', reviewSchema);
export default Review;
