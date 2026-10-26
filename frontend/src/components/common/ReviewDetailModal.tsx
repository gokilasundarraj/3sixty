import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { FiX, FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi';
import { FeedbackItem } from '../../types';

interface ReviewDetailModalProps {
  review: FeedbackItem | null;
  /** Index of the image to open on initially (0 = first). -1 or undefined = show text first */
  initialImageIndex?: number;
  onClose: () => void;
}

export const ReviewDetailModal: React.FC<ReviewDetailModalProps> = ({
  review,
  initialImageIndex,
  onClose,
}) => {
  const images = review?.projectImages?.filter(Boolean) ?? [];
  const hasImages = images.length > 0;
  const [currentImg, setCurrentImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState<Record<number, boolean>>({});
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef(0);

  // Set initial image index on open
  useEffect(() => {
    if (review && typeof initialImageIndex === 'number' && initialImageIndex >= 0) {
      setCurrentImg(Math.min(initialImageIndex, images.length - 1));
    } else {
      setCurrentImg(0);
    }
    setImgLoaded({});
    setImgError({});
  }, [review, initialImageIndex, images.length]);

  // Lock body scroll, Esc to close, arrow keys for gallery
  useEffect(() => {
    if (!review) return;
    triggerRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasImages) {
        setCurrentImg((p) => (p > 0 ? p - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight' && hasImages) {
        setCurrentImg((p) => (p < images.length - 1 ? p + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
      triggerRef.current?.focus();
    };
  }, [review, onClose, hasImages, images.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!hasImages) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) {
          setCurrentImg((p) => (p < images.length - 1 ? p + 1 : 0));
        } else {
          setCurrentImg((p) => (p > 0 ? p - 1 : images.length - 1));
        }
      }
    },
    [hasImages, images.length],
  );

  if (!review) return null;

  const avatarUrl = review.userAvatar || review.userPhoto;
  const displayName = review.userName
    ? review.userName.trim().charAt(0).toUpperCase() + review.userName.trim().slice(1)
    : 'Customer';
  const nameInitial = (review.userName?.trim().charAt(0) || 'U').toUpperCase();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#070504]/92 backdrop-blur-xl"
        />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f0b08] border border-[rgba(240,160,122,0.3)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] outline-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-[#1e1510]/90 text-[#f6e9e1] hover:text-[#ffc7a6] hover:bg-[#2c1e17] transition-colors backdrop-blur-sm cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Header: avatar + name + rating */}
          <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-[#c8714d]/20 bg-[#140e0b] rounded-t-2xl">
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover border border-[#f0a07a]/50 flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c8714d] to-[#7a391e] text-[#f6e9e1] font-bold text-sm flex items-center justify-center border border-[#ffc7a6]/60 flex-shrink-0 uppercase select-none font-sans">
                  {nameInitial}
                </div>
              )}
              <div className="min-w-0">
                <h3
                  className="text-sm font-serif font-bold text-[#f6e9e1]"
                  style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                >
                  {displayName}
                </h3>
                <p
                  className="text-[10px] text-[#8a6857] mt-0.5"
                  style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                >
                  {review.projectType || 'Customer Review'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[#f0a07a]">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? 'text-[#f0a07a]' : 'text-[#38261e]'}`}
                />
              ))}
              <span className="ml-2 text-xs text-[#ffc7a6] font-semibold">
                {review.rating} / 5
              </span>
            </div>
          </div>

          {/* Full review text */}
          <div className="px-5 sm:px-6 py-5">
            <p
              className="text-xs sm:text-sm text-[#f6e9e1]/90 leading-relaxed italic whitespace-pre-wrap"
              style={{ overflowWrap: 'anywhere', wordBreak: 'break-word', minWidth: 0 }}
            >
              &ldquo;{review.message}&rdquo;
            </p>
          </div>

          {/* Image gallery */}
          {hasImages && (
            <div className="px-5 sm:px-6 pb-5">
              {/* Main image area */}
              <div
                className="relative w-full bg-black/40 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ minHeight: '200px', maxHeight: '50vh' }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Loading placeholder */}
                {!imgLoaded[currentImg] && !imgError[currentImg] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#f0a07a] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Error fallback */}
                {imgError[currentImg] && (
                  <div className="flex flex-col items-center gap-2 text-[#8a6857] py-12">
                    <FiImage className="w-10 h-10" />
                    <span className="text-xs">Image failed to load</span>
                  </div>
                )}

                <img
                  key={currentImg}
                  src={images[currentImg]}
                  alt={`Project screenshot ${currentImg + 1}`}
                  loading="lazy"
                  className="w-full h-full max-h-[50vh] object-contain transition-opacity duration-200"
                  style={{ opacity: imgLoaded[currentImg] && !imgError[currentImg] ? 1 : 0 }}
                  onLoad={() => setImgLoaded((p) => ({ ...p, [currentImg]: true }))}
                  onError={() => setImgError((p) => ({ ...p, [currentImg]: true }))}
                />

                {/* Prev / Next arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImg((p) => (p > 0 ? p - 1 : images.length - 1))}
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0f0b08]/80 text-[#f6e9e1] hover:bg-[#1e1510] transition-colors cursor-pointer"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImg((p) => (p < images.length - 1 ? p + 1 : 0))}
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0f0b08]/80 text-[#f6e9e1] hover:bg-[#1e1510] transition-colors cursor-pointer"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Counter badge */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-[#0f0b08]/80 text-[10px] text-[#ffc7a6] font-mono backdrop-blur-sm">
                    {currentImg + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                  {images.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        i === currentImg
                          ? 'border-[#f0a07a] shadow-[0_0_8px_rgba(240,160,122,0.4)]'
                          : 'border-[#c8714d]/25 hover:border-[#c8714d]/60 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`Thumb ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReviewDetailModal;
