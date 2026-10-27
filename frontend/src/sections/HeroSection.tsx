import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { MdCall, MdMovieEdit } from 'react-icons/md';
import { ParticleSphereBackground } from '../components/3d/ParticleSphere';
import { FloatingHeroLogo } from '../components/3d/FloatingHeroLogo';
import { BRAND } from '../lib/constants';

export const HeroSection: React.FC = () => {
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsHeroHovered(true)}
      onMouseLeave={() => setIsHeroHovered(false)}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden select-none"
    >
      {/* Cinematic Background Image with Parallax & Dynamic Color Grading */}
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-105 ${
            isHeroHovered
              ? 'filter brightness-[0.24] saturate-[1.3] sepia-[0.35]'
              : 'filter brightness-[0.16] saturate-[0.6] sepia-[0.1]'
          }`}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        {/* Dark Copper Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070504]/90 via-[#070504]/75 to-[#070504]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070504]/50 to-[#070504]" />
      </div>

      {/* Interactive 3D Particle Network Sphere */}
      <ParticleSphereBackground className="-z-20 opacity-80" />

      <div className="relative w-full max-w-[1536px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Headline & College Student Focus */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 text-center lg:text-left space-y-6 xl:space-y-7"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1c120c]/85 border border-[#c8714d]/40 shadow-[0_0_15px_rgba(240,160,122,0.2)] backdrop-blur-md max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#f0a07a] animate-pulse flex-shrink-0" />
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#f6e9e1] font-medium break-words">
                Projects, Design & Media — All in One Place
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#f6e9e1] leading-[1.1] break-words">
              100% <br className="hidden sm:inline" />
              <span className="text-copper-gradient">Guidance & Support</span>
            </h1>

            {/* Tagline / Explainer */}
            <div className="space-y-3 text-sm sm:text-base md:text-lg text-[#b99a8b] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              <p className="break-words">
                1. Project Development <strong className="text-[#f6e9e1] font-semibold">Final-Year & Mini Projects</strong> working code and project guidance. <br/> <strong className="text-[#f6e9e1] font-semibold">2. PPT & Documentation</strong>.
              </p>
              <p className="break-words">
                3. Poster & Graphic Design <strong className="text-[#f6e9e1] font-semibold">Promotional posters, business creatives,</strong> social media posts and custom designs. <br/> <strong className="text-[#f6e9e1] font-semibold">4. Video Editing (Promotional videos, reels, event videos and creative video editing)</strong>.
              </p>
            </div>

            {/* Quick Proof Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-[#f6e9e1]/90 pt-1">
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4 text-[#f0a07a] flex-shrink-0" />
                <span>100% Viva Guidance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4 text-[#f0a07a] flex-shrink-0" />
                <span>Affordable Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4 text-[#f0a07a] flex-shrink-0" />
                <span>Quality Work, Delivered on Time</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#services"
                className="w-full sm:w-auto btn-copper-outline flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide group"
              >
                <MdMovieEdit className="w-4 h-4 text-[#f0a07a] group-hover:rotate-12 transition-transform" />
                <span>Explore Services</span>
              </a>

              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi 3 Sixtey, I want to discuss a project / media requirement.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1b2b1d] hover:bg-[#233826] border border-[#25D366]/50 text-[#25D366] text-sm font-semibold transition-all hover:scale-105 shadow-sm"
              >
                <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Floating Metallic Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end"
          >
            <FloatingHeroLogo />
          </motion.div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070504] to-transparent pointer-events-none" />
    </section>
  );
};
