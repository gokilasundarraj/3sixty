import React, { useState, useEffect } from 'react';
import { MdCall, MdPhoneCallback } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { FiCheck, FiSend, FiClock, FiShield } from 'react-icons/fi';
import { callbackService } from '../services/callbackService';
import { BRAND } from '../lib/constants';

export const BookOrderSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Final-Year Engineering Project');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please provide your name and contact phone number.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const res = await callbackService.submitCallback({
        name: name.trim(),
        phone: phone.trim(),
        projectType,
        message: message.trim() || undefined,
      });

      if (res.success) {
        setSubmitted(true);
        setMessage('');
      } else {
        setError(res.message || 'Unable to save request. Please contact us directly.');
      }

      setSubmitted(true);
      setMessage('');
    } catch (err) {
      console.error('Call back submit error:', err);
      setError('Unable to save request. Please call or WhatsApp us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="book" className="relative py-24 bg-[#0a0705] border-t border-[#c8714d]/15 select-none">
      <div className="max-w-100% sm:px-6 lg:px-8 ">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c120c] border border-[#c8714d]/40 text-[#f0a07a] text-xs font-semibold uppercase tracking-widest">
            <MdPhoneCallback className="w-4 h-4 text-[#ffc7a6]" />
            <span>Direct Guidance Hotline</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f6e9e1] tracking-tight">
            Book Your <span className="text-copper-gradient">Order</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b99a8b] leading-relaxed">
            Need an urgent capstone project, IEEE transaction implementation, or high-impact video edit? Call our lead engineer directly or request an instant call-back.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Instant Calling Card & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1b120c] via-[#120c08] to-[#0a0604] border border-[#c8714d]/40 shadow-[0_20px_50px_rgba(240,160,122,0.15)] space-y-6">
              <div>
                <span className="text-xs font-mono text-[#f0a07a] uppercase tracking-wider">
                  Instant Support
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#f6e9e1] mt-1">
                  Connect with Our Team
                </h3>
                <p className="text-xs text-[#b99a8b] mt-2 leading-relaxed">
                  Have an urgent review deadline this week? Connect with our senior project leads right now.
                </p>
              </div>

              {/* Prominent WhatsApp Button */}
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                  `Hi 3 Sixtey, I want to book an order for a college project / media solution.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-base font-bold shadow-[0_8px_25px_rgba(37,211,102,0.3)] transition-all hover:scale-[1.02]"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[#c8714d]/20 space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#f6e9e1]/85">
                  <FiClock className="w-4 h-4 text-[#f0a07a] flex-shrink-0" />
                  <span>Available 7 Days a Week (9:00 AM – 10:30 PM IST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Request Call Back Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-2xl bg-[#0e0907]/90 border border-[#c8714d]/30 backdrop-blur-md shadow-2xl">
              <div className="mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f6e9e1]">
                  Request a Call Back
                </h3>
                <p className="text-xs text-[#b99a8b] mt-1">
                  Leave your phone number and project topic. Our department specialist will review your syllabus and call you back within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center mx-auto">
                    <FiCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-emerald-200">
                    Call Back Requested Successfully!
                  </h4>
                  <p className="text-xs text-emerald-300 max-w-md mx-auto">
                    Thank you, {name}. Our engineering lead has received your request and will call you on <strong>{phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[#f0a07a] hover:underline pt-2"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#b99a8b] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Karthik Raja"
                        className="w-full bg-[#140e0b] text-[#f6e9e1] placeholder-[#6e5346] text-xs sm:text-sm rounded-xl px-4 py-3 border border-[#c8714d]/30 focus:border-[#f0a07a] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#b99a8b] mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98400 00000"
                        className="w-full bg-[#140e0b] text-[#f6e9e1] placeholder-[#6e5346] text-xs sm:text-sm rounded-xl px-4 py-3 border border-[#c8714d]/30 focus:border-[#f0a07a] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#b99a8b] mb-1.5">
                      Requirement Category
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-[#140e0b] text-[#f6e9e1] text-xs sm:text-sm rounded-xl px-4 py-3 border border-[#c8714d]/30 focus:border-[#f0a07a] focus:outline-none"
                    >
                      <option value="Final-Year Engineering Project">Final-Year Project</option>
                      <option value="Mini Project (2nd / 3rd Year)">Mini Project (2nd / 3rd Year)</option>
                      {/* <option value="IEEE Research Paper Implementation">IEEE Research Paper Implementation</option> */}
                      <option value="Urgent Thesis Documentation & PPT"> Documentation & PPT</option>
                      <option value="One-on-One Viva Coaching">Social media management</option>
                      <option value="Video Editing & Reels">Video Editing & Reels</option>
                      <option value="Poster & Flex Banner Design">Poster & Flex Banner Design</option>
                      <option value="3D Animation & Logo Reveal">3D Animation & Logo Reveal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#b99a8b] mb-1.5">
                      Project Details / College / Deadline (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mention your department, university, topic ideas, or urgency..."
                      className="w-full bg-[#140e0b] text-[#f6e9e1] placeholder-[#6e5346] text-xs sm:text-sm rounded-xl p-4 border border-[#c8714d]/30 focus:border-[#f0a07a] focus:outline-none resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-400 font-medium">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-copper flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold tracking-wide shadow-md hover:shadow-copper-sm disabled:opacity-50"
                  >
                    <FiSend className="w-4 h-4" />
                    <span>{submitting ? 'Submitting Request...' : 'Submit Call Back Request'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
