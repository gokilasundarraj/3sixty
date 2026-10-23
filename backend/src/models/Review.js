import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
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
    },
    projectType: {
      type: String,
      default: 'Customer Review',
    },
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
