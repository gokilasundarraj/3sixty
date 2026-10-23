import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { BRAND } from '../../lib/constants';

interface LightboxItem {
  id: string;
  title: string;
  category: string;
  image: string;
  video?: string;
  client?: string;
  tags?: string[];
}

interface LightboxModalProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const whatsappInquiryUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi 3 Sixtey, I saw your work "${item.title}" in the ${item.category} gallery and would like a similar solution.`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#070504]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0f0b08] border border-[rgba(240,160,122,0.3)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8714d]/20 bg-[#140e0b]">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#f0a07a] font-semibold">
                {item.category}
              </span>
              <h3 className="text-lg font-serif text-[#f6e9e1] font-semibold">
                {item.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full bg-[#1e1510] text-[#f6e9e1] hover:text-[#ffc7a6] hover:bg-[#2c1e17] transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>

          {/* Media Content */}
          <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[440px]">
            {item.video ? (
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full max-h-[60vh] object-contain"
              />
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full max-h-[60vh] object-contain"
              />
            )}
          </div>

          {/* Footer Info & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#c8714d]/20 bg-[#120d09]">
            <div className="flex flex-wrap items-center gap-2">
              {item.client && (
                <span className="text-xs text-[#b99a8b]">
                  Client / Context: <strong className="text-[#f6e9e1]">{item.client}</strong>
                </span>
              )}
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs bg-[#241711] text-[#f0a07a] border border-[#c8714d]/25"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-copper flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap"
            >
              <FaWhatsapp className="w-4 h-4 text-emerald-950" />
              <span>Get Similar Solution</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
