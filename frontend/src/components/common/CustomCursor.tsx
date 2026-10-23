import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor for non-touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#f0a07a] shadow-[0_0_10px_#f0a07a]"
        animate={{
          x: mousePosition.x - (isHovered ? 6 : 4),
          y: mousePosition.y - (isHovered ? 6 : 4),
          width: isHovered ? 12 : 8,
          height: isHovered ? 12 : 8,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#f0a07a]/60 bg-[#f0a07a]/10 backdrop-blur-[0.5px]"
        animate={{
          x: mousePosition.x - (isHovered ? 26 : 18),
          y: mousePosition.y - (isHovered ? 26 : 18),
          width: isHovered ? 52 : 36,
          height: isHovered ? 52 : 36,
          borderColor: isHovered ? '#ffc7a6' : 'rgba(240, 160, 122, 0.5)',
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 220, mass: 0.2 }}
      />
    </>
  );
};
