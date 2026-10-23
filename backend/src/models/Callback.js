import mongoose from 'mongoose';

const callbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: '',
      lowercase: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'completed'],
      default: 'new',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Callback = mongoose.model('Callback', callbackSchema);
export default Callback;
