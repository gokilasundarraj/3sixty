import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const FloatingHeroLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center py-6 perspective-1000 cursor-pointer select-none"
      style={{ perspective: 1200 }}
    >
      {/* Soft Rose-Copper Bloom / Atmospheric Glow */}
      <motion.div
        animate={{
          scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.12, 1],
          opacity: isHovered ? 0.75 : 0.45,
        }}
        transition={{
          repeat: Infinity,
          duration: 4.5,
          ease: 'easeInOut',
        }}
        className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full blur-[90px] bg-gradient-to-tr from-[#934825] via-[#f0a07a] to-[#ffc7a6] pointer-events-none -z-10"
      />

      {/* Floating 3D Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [-8, 8, -8],
          rotateZ: [-0.5, 0.5, -0.5]
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
        className="relative group p-4 sm:p-6 rounded-3xl"
      >
        {/* Subtle glass pedestal */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[rgba(240,160,122,0.12)] to-[rgba(7,5,4,0.6)] backdrop-blur-sm border border-[rgba(240,160,122,0.2)] shadow-2xl opacity-80 group-hover:border-[rgba(240,160,122,0.5)] transition-all duration-500" />

        {/* Shiny sweep highlight */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <motion.div
            initial={{ x: '-150%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 5,
              ease: 'easeInOut',
            }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
          />
        </div>

        {/* Logo Image */}
        <motion.img
          src="/logo.png"
          alt="3 Sixtey — Project and Media Solution"
          className="relative z-10 w-64 sm:w-80 md:w-96 lg:w-[440px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(240,160,122,0.4)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          onError={(e) => {
            // fallback to original image if transparent png has issue
            (e.target as HTMLImageElement).src = '/logo-original.jpg';
          }}
        />

        {/* Interactive Radial Spotlight */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 199, 166, 0.15), transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
};
