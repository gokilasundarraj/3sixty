import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { FiCheckCircle, FiMessageSquare, FiImage } from 'react-icons/fi';
import { reviewService } from '../services/reviewService';
import { FeedbackItem } from '../types';
import { ReviewDetailModal } from '../components/common/ReviewDetailModal';

// ─── Review Card ────────────────────────────────────────────────────────────────
interface ReviewCardProps {
  review: FeedbackItem;
  idx: number;
  onOpenModal: (review: FeedbackItem, imgIdx?: number) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, idx, onOpenModal }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  const projectImages = review.projectImages?.filter(Boolean) ?? [];
  const hasImages = projectImages.length > 0;

  // Detect whether the review text is actually truncated by line-clamp
  const checkClamp = useCallback(() => {
    const el = textRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, []);

  useEffect(() => {
    checkClamp();
    window.addEventListener('resize', checkClamp);
    return () => window.removeEventListener('resize', checkClamp);
  }, [checkClamp, review.message]);

  const showSeeMore = isClamped || hasImages;
  const avatarUrl = review.userAvatar || review.userPhoto;
  const nameInitial = (review.userName?.trim().charAt(0) || 'U').toUpperCase();
  const displayName = review.userName
    ? review.userName.trim().charAt(0).toUpperCase() + review.userName.trim().slice(1)
    : 'Customer';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      className="review-card relative rounded-2xl bg-gradient-to-b from-[#140e0b]/90 to-[#0e0907]/95 border border-[#c8714d]/25 hover:border-[#f0a07a]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_35px_rgba(240,160,122,0.2)] hover:-translate-y-1"
    >
      <div className="min-w-0 space-y-4">
        {/* Top: Star Rating & Quote Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#f0a07a]">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${i < review.rating ? 'text-[#f0a07a]' : 'text-[#38261e]'}`}
              />
            ))}
          </div>
          <FaQuoteLeft className="w-5 h-5 text-[#c8714d]/30 flex-shrink-0" />
        </div>

        {/* Review text — clamped to 4 lines */}
        <p
          ref={textRef}
          className="review-card__text text-xs sm:text-sm text-[#f6e9e1]/90 leading-relaxed italic"
        >
          &ldquo;{review.message}&rdquo;
        </p>

        {/* Project images indicator + "See more" */}
        {showSeeMore && (
          <div className="flex flex-wrap items-center gap-3">
            {/* Tiny thumbnail row (max 3 + "+N") */}
            {hasImages && (
              <div className="flex items-center gap-1.5">
                {projectImages.slice(0, 3).map((url, i) => (
                  <button
                    key={i}
                    onClick={() => onOpenModal(review, i)}
                    className="w-8 h-8 rounded-md overflow-hidden border border-[#c8714d]/30 hover:border-[#f0a07a] transition-colors cursor-pointer flex-shrink-0"
                  >
                    <img
                      src={url}
                      alt={`Preview ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </button>
                ))}
                {projectImages.length > 3 && (
                  <button
                    onClick={() => onOpenModal(review, 3)}
                    className="w-8 h-8 rounded-md bg-[#1e1510] border border-[#c8714d]/30 flex items-center justify-center text-[10px] text-[#f0a07a] font-semibold cursor-pointer hover:border-[#f0a07a] transition-colors flex-shrink-0"
                  >
                    +{projectImages.length - 3}
                  </button>
                )}
                {/* Photo count badge */}
                <span className="text-[10px] text-[#8a6857] flex items-center gap-0.5 ml-0.5">
                  <FiImage className="w-3 h-3" />
                  {projectImages.length}
                </span>
              </div>
            )}

            {/* See more link */}
            <button
              onClick={() => onOpenModal(review, -1)}
              className="text-[11px] font-semibold text-[#f0a07a] hover:text-[#ffc7a6] underline underline-offset-2 transition-colors cursor-pointer"
            >
              See more
            </button>
          </div>
        )}
      </div>

      {/* Reviewer Meta: Avatar, Name — profile image ONLY as avatar */}
      <div className="pt-5 mt-4 border-t border-[#c8714d]/15 flex items-center justify-between min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-11 h-11 rounded-full object-cover border border-[#f0a07a]/50 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#c8714d] to-[#7a391e] text-[#f6e9e1] font-bold text-base flex items-center justify-center border border-[#ffc7a6]/60 flex-shrink-0 shadow-sm uppercase select-none font-sans">
              {nameInitial}
            </div>
          )}

          <div className="min-w-0">
            <h4 className="review-card__name text-xs sm:text-sm font-serif font-bold text-[#f6e9e1] truncate">
              {displayName}
            </h4>
            <p className="review-card__label text-[10px] text-[#8a6857] truncate mt-0.5">
              {review.projectType || 'Customer Review'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 flex-shrink-0">
          <FiCheckCircle className="w-3 h-3 text-emerald-400" />
          <span>Verified</span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── TestimonialsSection ────────────────────────────────────────────────────────
export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalReview, setModalReview] = useState<FeedbackItem | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(-1);

  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await reviewService.getApprovedReviews();
        if (mounted) {
          setReviews(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.warn('Error loading reviews:', err);
        if (mounted) {
          setError('Unable to load reviews right now.');
          setReviews([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchReviews();

    const handleUpdate = (e: any) => {
      if (e?.detail) {
        const newReview = e.detail;
        setReviews((prev) => {
          const exists = prev.some((r) => (r._id || r.id) === (newReview._id || newReview.id));
          return exists ? prev : [newReview, ...prev];
        });
      }
      fetchReviews();
    };

    window.addEventListener('3sixty:review_submitted', handleUpdate);

    return () => {
      mounted = false;
      window.removeEventListener('3sixty:review_submitted', handleUpdate);
    };
  }, []);

  const handleOpenModal = useCallback((review: FeedbackItem, imgIdx?: number) => {
    setModalReview(review);
    setModalImgIdx(imgIdx ?? -1);
  }, []);

  return (
    <>
      <section id="testimonials" className="relative py-24 bg-[#0a0705] select-none">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c120c] border border-[#c8714d]/40 text-[#f0a07a] text-xs font-semibold uppercase tracking-widest">
              <FaStar className="w-3.5 h-3.5 text-[#ffc7a6]" />
              <span>Customer Experiences</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f6e9e1] tracking-tight">
              Customer <span className="text-copper-gradient">Reviews</span>
            </h2>

            <p className="text-sm sm:text-base text-[#b99a8b] leading-relaxed">
              Authentic reviews from students and creators who partnered with 3 Sixtey for projects, development, and media solutions.
            </p>

            <div className="pt-2">
              <a
                href="#feedback-form"
                className="btn-copper inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-copper-sm hover:scale-105 transition-all cursor-pointer"
              >
                <FaStar className="w-4 h-4 text-zinc-950" />
                <span>Write a Review</span>
              </a>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-16 text-center">
              <div className="w-10 h-10 border-2 border-[#f0a07a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs text-[#b99a8b] font-mono">Loading reviews...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="max-w-md mx-auto p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-center text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && reviews.length === 0 && (
            <div className="max-w-md mx-auto text-center py-12 px-6 rounded-2xl bg-[#120d09] border border-[#c8714d]/25 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#1e130c] border border-[#c8714d]/40 flex items-center justify-center mx-auto text-[#f0a07a]">
                <FiMessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#f6e9e1]">
                No reviews yet. Be the first to share your experience.
              </h3>
              <p className="text-xs text-[#b99a8b] leading-relaxed">
                Have you worked with 3 Sixtey on a college project or media order? We'd love to hear your authentic feedback.
              </p>
              <div className="pt-2">
                <a
                  href="#feedback-form"
                  className="btn-copper inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-copper-sm"
                >
                  Write a Review
                </a>
              </div>
            </div>
          )}

          {/* Reviews Grid */}
          {!loading && !error && reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {reviews.map((review, idx) => (
                <ReviewCard
                  key={review._id || review.id || `rev-${idx}`}
                  review={review}
                  idx={idx}
                  onOpenModal={handleOpenModal}
                />
              ))}
            </div>
          )}

          {/* Bottom invitation */}
          <div className="text-center mt-12">
            <a
              href="#feedback-form"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#f0a07a] hover:text-[#ffc7a6] underline underline-offset-4"
            >
              Completed a project or media order with us? Share your review below
            </a>
          </div>
        </div>
      </section>

      {/* Review Detail Modal (full text + image gallery) */}
      <ReviewDetailModal
        review={modalReview}
        initialImageIndex={modalImgIdx}
        onClose={() => setModalReview(null)}
      />
    </>
  );
};

export default TestimonialsSection;
