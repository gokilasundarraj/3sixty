import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import multer from 'multer';

// Configure Cloudinary from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// multer uses memory storage — no disk writes (Render filesystem is ephemeral)
const storage = multer.memoryStorage();

// Only allow JPEG / PNG / WebP
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp'];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIMES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Only JPEG, PNG, or WebP images are allowed. Got: ${file.mimetype}`), false);
  }
};

// Single-file upload (profile avatar) — max 8 MB
export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter,
});

// Multi-file upload for the review form:
//   field "profileImage" → single file (avatar)
//   field "projectImages" → up to 5 files (project proof screenshots)
export const reviewUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,  // 5 MB per file
    files: 10,                   // 1 avatar + max 5 project images + legacy fallbacks
  },
  fileFilter,
}).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'projectImages', maxCount: 5 },
  { name: 'image', maxCount: 5 },
]);

// Upload a buffer to Cloudinary and return the secure URL
export async function uploadToCloudinary(buffer, folder = '3sixty-reviews', options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ width: 1600, quality: 'auto', fetch_format: 'auto' }],
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    Readable.from(buffer).pipe(stream);
  });
}

export default upload;
