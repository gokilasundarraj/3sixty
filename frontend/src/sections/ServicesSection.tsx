import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiCode, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { MdMovieEdit, MdBrush } from 'react-icons/md';
import { TbCube3dSphere } from 'react-icons/tb';
import { PiGraduationCapFill } from 'react-icons/pi';
import { SERVICES, BRAND } from '../lib/constants';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    badge: string;
    features: string[];
  };
  category: 'Project Solutions' | 'Media Solutions';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, category }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getIcon = () => {
    if (service.id.includes('video') || service.id.includes('reels')) return MdMovieEdit;
    if (service.id.includes('3d') || service.id.includes('reveals')) return TbCube3dSphere;
    if (service.id.includes('poster') || service.id.includes('logo')) return MdBrush;
    if (service.id.includes('final') || service.id.includes('mini') || service.id.includes('ieee')) return PiGraduationCapFill;
    return FiCode;
  };

  const Icon = getIcon();

  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi 3 Sixtey, I want to order "${service.title}" under ${category}. Please send details and package pricing.`
  )}`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden min-h-[420px] sm:min-h-[460px] border border-[#c8714d]/30 hover:border-[#f0a07a] transition-all duration-500 shadow-lg hover:shadow-[0_20px_50px_-10px_rgba(240,160,122,0.35)] flex flex-col justify-end p-6 sm:p-7 select-none"
      style={{
        transform: isHovered
          ? 'perspective(1000px) rotateX(-2deg) rotateY(2deg) translateY(-8px)'
          : 'none',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
      }}
    >
      {/* Background Image with Zoom and Depth Shift on Hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url('${service.image}')` }}
      />

      {/* Dark Copper Gradient Overlay with Tint Transition on Hover */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${isHovered
          ? 'bg-gradient-to-t from-[#0e0906] via-[#1b100a]/85 to-[#24150d]/50'
          : 'bg-gradient-to-t from-[#070504] via-[#070504]/80 to-[#070504]/30'
          }`}
      />

      {/* Spotlight Radial Glow following cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 260px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 199, 166, 0.18), transparent 75%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 space-y-3">
        {/* Top Header: Badge & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#ffc7a6] bg-[#22150f]/90 px-3 py-1 rounded-full border border-[#c8714d]/40 backdrop-blur-md">
            {service.badge}
          </span>
          <div className="w-10 h-10 rounded-xl bg-[#140e0b]/90 border border-[#c8714d]/40 flex items-center justify-center text-[#f0a07a] group-hover:text-white group-hover:border-[#f0a07a] group-hover:rotate-12 transition-all duration-300 backdrop-blur-md">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f6e9e1] group-hover:text-[#ffc7a6] transition-colors leading-tight">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#f0a07a] font-medium font-sans">
          {service.tagline}
        </p>

        {/* Short Description (Reveals with smooth slide-up) */}
        <p className="text-xs text-[#b99a8b] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {service.description}
        </p>

        {/* Key Features Bullet List */}
        <div className="pt-2 space-y-1">
          {service.features.slice(0, 3).map((feat, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-[#f6e9e1]/85">
              <FiCheckCircle className="w-3.5 h-3.5 text-[#f0a07a] flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Action Button: Order Now */}
        <div className="pt-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-copper flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold tracking-wide shadow-md hover:shadow-copper-sm group/btn"
          >
            <FaWhatsapp className="w-3.5 h-3.5 text-emerald-950" />
            <span>Order This Service</span>
            <FiArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'media'>('projects');

  return (
    <section id="services" className="relative py-24 bg-[#0a0705] select-none">
      <div className="max-w-100% mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c120c] border border-[#c8714d]/40 text-[#f0a07a] text-xs font-semibold uppercase tracking-widest">
            <FiCode className="w-4 h-4 text-[#ffc7a6]" />
            <span>Complete Dual Agency Capabilities</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f6e9e1] tracking-tight">
            Our Core <span className="text-copper-gradient">Services</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b99a8b] leading-relaxed">
            High-standard engineering solutions tailored for college students, combined with studio-grade video editing, 3D animation, and design for creators and businesses.
          </p>

          {/* Toggle Tab */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#120d0a] border border-[#c8714d]/30">
              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTab === 'projects'
                  ? 'btn-copper shadow-md'
                  : 'text-[#b99a8b] hover:text-[#f6e9e1]'
                  }`}
              >
                <PiGraduationCapFill className="w-4 h-4" />
                <span>Project Solutions (Students)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTab === 'media'
                  ? 'btn-copper shadow-md'
                  : 'text-[#b99a8b] hover:text-[#f6e9e1]'
                  }`}
              >
                <MdMovieEdit className="w-4 h-4" />
                <span>Media Solutions (Video & 3D)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeTab === 'projects'
            ? SERVICES.projects.map((service) => (
              <ServiceCard key={service.id} service={service} category="Project Solutions" />
            ))
            : SERVICES.media.map((service) => (
              <ServiceCard key={service.id} service={service} category="Media Solutions" />
            ))}
        </div>

      </div>
    </section>
  );
};
