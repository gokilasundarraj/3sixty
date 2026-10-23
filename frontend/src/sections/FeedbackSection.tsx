import React, { useState, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiUser, FiPhone, FiCamera, FiX, FiSend, FiCheckCircle } from 'react-icons/fi';
import { reviewService } from '../services/reviewService';
import { AudioVoiceInput } from '../components/common/AudioVoiceInput';

const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export const FeedbackSection: React.FC = () => {
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [projectType, setProjectType] = useState('Final-Year Engineering Project');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Status & feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile photo change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage('Profile photo size should be less than 8MB.');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrorMessage(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setMessage((prev) => (prev ? `${prev} ${text}` : text));
  };

  // Form submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = customerName.trim();
    if (!cleanName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      setErrorMessage('Please enter your contact phone number.');
      return;
    }

    if (cleanPhone.replace(/\D/g, '').length < 7) {
      setErrorMessage('Please enter a valid phone number (at least 7 digits).');
      return;
    }

    const cleanMessage = message.trim();
    if (!cleanMessage) {
      setErrorMessage('Please write your review feedback.');
      return;
    }

    try {
      setLoading(true);

      const res = await reviewService.createReview({
        userName: cleanName,
        phone: cleanPhone,
        rating,
        message: cleanMessage,
        projectType,
        imageFile,
      });

      if (res.success) {
        setSubmitted(true);
        // Notify TestimonialsSection to instantly refresh and display the review
        window.dispatchEvent(
          new CustomEvent('3sixty:review_submitted', {
            detail: res.data,
          })
        );
      } else {
        setErrorMessage(res.message || 'Failed to submit review. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong while submitting your review.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCustomerName('');
    setPhone('');
    setRating(5);
    setMessage('');
    setProjectType('Final-Year Engineering Project');
    handleRemoveImage();
    setErrorMessage(null);
    setSubmitted(false);
  };

  // First letter of name for automatic fallback avatar
  const avatarInitial = (customerName.trim()[0] || 'U').toUpperCase();

  return (
    <section id="feedback-form" className="relative py-20 bg-[#070504] border-t border-[#c8714d]/15 select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c120c] border border-[#c8714d]/40 text-[#f0a07a] text-xs font-semibold uppercase tracking-widest shadow-sm">
            <FaStar className="w-3.5 h-3.5 text-[#ffc7a6]" />
            <span>Community Feedback</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f6e9e1] tracking-tight">
            Write a <span className="text-copper-gradient">Review</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#b99a8b] max-w-xl mx-auto leading-relaxed">
            Share your authentic experience with 3 Sixtey. Your review will be published directly to our customer feedback wall.
          </p>
        </div>

        {/* Review Form Container */}
        <div className="rounded-3xl bg-gradient-to-b from-[#140e0b] via-[#100a07] to-[#090604] border border-[#c8714d]/35 p-6 sm:p-10 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle top ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-[#f0a07a] to-transparent opacity-40 pointer-events-none" />

          {submitted ? (
            /* Success State */
            <div className="text-center py-8 space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                <FiCheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#f6e9e1]">
                  Review Submitted!
                </h3>
                <p className="text-xs sm:text-sm text-[#b99a8b] leading-relaxed">
                  Thank you, <strong className="text-[#ffc7a6]">{customerName}</strong>! Your review has been published directly to our customer testimonials wall.
                </p>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[#f0a07a]">
                {[...Array(rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-[#f0a07a]" />
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#testimonials"
                  className="w-full sm:w-auto btn-copper px-6 py-3 rounded-xl text-xs font-bold shadow-copper-sm text-center"
                >
                  View Reviews List
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1a120c] border border-[#c8714d]/30 text-xs font-semibold text-[#b99a8b] hover:text-[#f6e9e1] transition-colors cursor-pointer"
                >
                  Write Another Review
                </button>
              </div>
            </div>
          ) : (
            /* Direct Review Form */
            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Profile Photo & Live Avatar Preview */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#17100b] border border-[#c8714d]/30 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#f0a07a] shadow-md"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        aria-label="Remove photo"
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs hover:bg-red-700 transition-colors shadow"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c8714d] to-[#6d3219] text-white font-bold text-2xl flex items-center justify-center border-2 border-[#ffc7a6] shadow-md uppercase select-none font-sans">
                      {avatarInitial}
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h4 className="text-sm font-semibold text-[#f6e9e1]">
                    Profile Photo <span className="text-xs text-[#b99a8b] font-normal">(Optional)</span>
                  </h4>
                  <p className="text-xs text-[#b99a8b]">
                    {imagePreview
                      ? 'Photo selected. Click remove to use letter avatar instead.'
                      : 'If not uploaded, the first letter of your name will be used as your avatar.'}
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#24160f] border border-[#c8714d]/40 text-xs font-semibold text-[#f0a07a] hover:bg-[#311e14] hover:text-[#ffc7a6] transition-all cursor-pointer"
                  >
                    <FiCamera className="w-3.5 h-3.5" />
                    <span>{imagePreview ? 'Change Photo' : 'Upload Photo'}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name & Phone Number Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b99a8b] mb-2">
                    Your Name <span className="text-[#f0a07a]">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a6857]" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Karthik Raja"
                      className="w-full pl-11 pr-4 py-3 bg-[#0b0705] border border-[#c8714d]/30 focus:border-[#f0a07a] rounded-xl text-sm text-[#f6e9e1] placeholder-[#62473a] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b99a8b] mb-2">
                    Phone Number <span className="text-[#f0a07a]">*</span>
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a6857]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full pl-11 pr-4 py-3 bg-[#0b0705] border border-[#c8714d]/30 focus:border-[#f0a07a] rounded-xl text-sm text-[#f6e9e1] placeholder-[#62473a] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Service / Project Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b99a8b] mb-2">
                  Service / Project Type
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-[#0b0705] text-[#f6e9e1] text-xs sm:text-sm rounded-xl px-4 py-3 border border-[#c8714d]/30 focus:border-[#f0a07a] outline-none"
                >
                  <option value="Final-Year Engineering Project">Final-Year Engineering Project (IEEE / AI / Web)</option>
                  <option value="Mini Project (2nd & 3rd Year)">Mini Project (2nd & 3rd Year)</option>
                  <option value="Full-Stack Web & App Development">Full-Stack Web & App Development</option>
                  <option value="Cinematic Video Editing & Reels">Cinematic Video Editing & Reels</option>
                  <option value="Logo Animation & 3D Visuals">Logo Animation & 3D Visuals</option>
                  <option value="Poster & Brand Identity Design">Poster & Brand Identity Design</option>
                  <option value="Customer Review">General Feedback</option>
                </select>
              </div>

              {/* Star Rating (1 to 5 Stars) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#120c08] border border-[#c8714d]/25 space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b99a8b]">
                  Star Rating (1–5 Stars) <span className="text-[#f0a07a]">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating !== null ? hoverRating : rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          aria-label={`Rate ${star} star`}
                          className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                        >
                          <FaStar
                            className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${
                              active ? 'text-[#f0a07a]' : 'text-[#36231a]'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-sm font-semibold text-[#ffc7a6] ml-2">
                    {RATING_LABELS[hoverRating !== null ? hoverRating : rating]} ({rating} / 5)
                  </span>
                </div>
              </div>

              {/* Review Feedback Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b99a8b]">
                    Review / Feedback <span className="text-[#f0a07a]">*</span>
                  </label>
                  <AudioVoiceInput onTranscript={handleVoiceTranscript} />
                </div>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details of your experience with 3 Sixtey (project delivery speed, code quality, viva preparation, or video editing output)..."
                  className="w-full bg-[#0b0705] text-[#f6e9e1] placeholder-[#62473a] text-xs sm:text-sm rounded-xl p-4 border border-[#c8714d]/30 focus:border-[#f0a07a] outline-none resize-none transition-all"
                />
                <div className="flex justify-end text-[11px] text-[#6e5346]">
                  <span>{message.length} characters</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button with Send Icon */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-copper flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold shadow-copper-md hover:shadow-copper-lg disabled:opacity-50 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Review...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4 text-zinc-950" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
