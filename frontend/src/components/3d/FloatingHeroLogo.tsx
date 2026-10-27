import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const FloatingHeroLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // Subtle, smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft spring for ultra-smooth responsiveness without jitter
  const mouseXSpring = useSpring(x, { stiffness: 90, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 90, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

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

    setSpotlightPos({
      x: Math.round((mouseX / width) * 100),
      y: Math.round((mouseY / height) * 100),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setSpotlightPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center py-4 w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] xl:max-w-[540px] select-none"
      style={{ perspective: 1200 }}
    >
      {/* Ambient Rose-Copper Bloom (Smooth GPU breathing aura) */}
      <div
        className="absolute w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] rounded-full blur-[80px] sm:blur-[110px] bg-gradient-to-tr from-[#934825]/60 via-[#c8714d]/50 to-[#ffc7a6]/40 pointer-events-none -z-10 animate-glow-gpu"
      />

      {/* Tilt Layer (Only handles mouse rotation — separated from float translation) */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full"
      >
        {/* Floating Layer (GPU-accelerated pure CSS animation — 60fps buttery smooth) */}
        <div className="animate-float-gpu relative group">
          
          {/* Main Showcase Plaque Card */}
          <div className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#18100b] via-[#100a07] to-[#080504] border border-[#c8714d]/40 shadow-[0_25px_60px_-12px_rgba(200,113,77,0.35)] transition-all duration-500 group-hover:border-[#f0a07a]/80 group-hover:shadow-[0_30px_70px_-10px_rgba(240,160,122,0.45)] overflow-hidden">
            
            {/* Subtle inner bevel / hairline rim */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/5" />
            
            {/* Logo Image */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0d0806] flex items-center justify-center">
              <img
                src="/logo.png"
                alt="3 Sixtey — Project and Media Solution"
                className="w-full h-auto object-contain rounded-2xl filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-original.jpg';
                }}
              />

              {/* Dynamic Interactive Specular Lighting (Tracks cursor naturally) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl"
                style={{
                  opacity: isHovered ? 0.35 : 0.15,
                  background: `radial-gradient(circle 320px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 215, 185, 0.6), transparent 70%)`,
                }}
              />
            </div>

            {/* Bottom Accent Glow */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-[#f0a07a]/70 to-transparent blur-sm pointer-events-none" />
          </div>

        </div>
      </motion.div>
    </div>
  );
};
