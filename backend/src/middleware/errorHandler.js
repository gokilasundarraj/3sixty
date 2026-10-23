import { errorResponse } from '../common/responseHelper.js';

export const errorHandler = (err, req, res, next) => {
  console.error('[Global Error]', err);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return errorResponse(res, 'Validation Error', 400, messages);
  }

  // MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    return errorResponse(res, 'You have already submitted a review with this phone number.', 409);
  }

  if (err.message === 'Only image files are allowed') {
    return errorResponse(res, err.message, 400);
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  return errorResponse(res, err.message || 'Internal Server Error', statusCode);
};

export default errorHandler;
