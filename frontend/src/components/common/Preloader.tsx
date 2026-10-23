import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 1600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070504] select-none"
        >
          {/* Ambient copper glow in background */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.4 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute w-72 h-72 rounded-full blur-[80px] bg-gradient-to-tr from-[#c8714d] to-[#ffc7a6]"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo container with scale & clip sweep */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-48 sm:w-56 h-auto"
            >
              <img
                src="/logo.png"
                alt="3 Sixtey"
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(240,160,122,0.5)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-original.jpg';
                }}
              />

              {/* Shimmer line passing through logo */}
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '150%' }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] pointer-events-none"
              />
            </motion.div>

            {/* Glowing progress line */}
            <div className="w-40 sm:w-52 h-[2px] bg-[rgba(240,160,122,0.15)] rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#ffc7a6] via-[#f0a07a] to-[#c8714d] shadow-[0_0_12px_#f0a07a]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-3 text-xs tracking-[0.25em] text-[#b99a8b] uppercase font-mono"
            >
              PROJECT & MEDIA SOLUTION
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
