import { errorResponse } from '../common/responseHelper.js';

/**
 * Global error handler.
 * Ensures the CORS header is present even when the server crashes, so the
 * browser never misreads a 5xx as a CORS error.
 */
export const errorHandler = (err, req, res, next) => {
  console.error('[Global Error]', err);

  // Re-apply CORS Allow-Origin so browser can read the error body
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return errorResponse(res, 'Validation Error', 400, messages);
  }

  // Explicit CORS rejection (from our origin callback)
  if (err.message && err.message.startsWith('CORS:')) {
    return res.status(403).json({ success: false, message: err.message });
  }

  // MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    return errorResponse(res, 'You have already submitted a review with this phone number.', 409);
  }

  // Multer file-size / count / type errors → 400/413
  if (err.code === 'LIMIT_FILE_SIZE') {
    return errorResponse(res, 'File too large. Each image must be 5 MB or smaller.', 413);
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    return errorResponse(res, 'Too many files. You can upload at most 5 project images + 1 profile photo.', 400);
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return errorResponse(res, 'Unexpected file field. Use profileImage or projectImages.', 400);
  }

  if (err.message && (err.message.includes('Only') && err.message.includes('allowed'))) {
    return errorResponse(res, err.message, 400);
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  return errorResponse(res, err.message || 'Internal Server Error', statusCode);
};

export default errorHandler;
