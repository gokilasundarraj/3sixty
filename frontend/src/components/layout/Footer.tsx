import React from 'react';
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { BRAND } from '../../lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050403] border-t border-[rgba(240,160,122,0.18)] text-[#f6e9e1] pt-16 pb-12 overflow-hidden select-none">
      {/* Ambient glow in footer background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#f0a07a]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#c8714d]/15">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl p-1 bg-[#120d09] border border-[#c8714d]/40 flex items-center justify-center">
                <img
                  src="/logo-icon.png"
                  alt="3 Sixtey"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.png';
                  }}
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-copper-gradient">
                  3 Sixtey
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-[#b99a8b] font-mono">
                  Project & Media Solution
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#152419] border border-[#25D366]/40 text-[#25D366] flex items-center justify-center hover:scale-110 transition-all"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(BRAND.email)}&su=${encodeURIComponent('Project / Media Solution Inquiry - 3 Sixtey')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send Email via Gmail"
                className="w-9 h-9 rounded-full bg-[#1c130d] border border-[#c8714d]/40 text-[#f0a07a] flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
              >
                <MdEmail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* College Project Solutions */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#ffc7a6] uppercase tracking-wider mb-4">
              Project Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-[#b99a8b]">
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  Final Year Projects
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  Mini Projects (2nd & 3rd Year)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  Website & APP Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  Documentation & PPT Formatting
                </a>
              </li>
            </ul>
          </div>

          {/* Media Solutions */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#ffc7a6] uppercase tracking-wider mb-4">
              Media Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-[#b99a8b]">
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  Video Editing & Viral Reels
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  Event Posters & Flex Banners (300 DPI)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  Vector Logo & Brand Identity Systems
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  AI video Editing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  Social Media Management
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
                  Cinematic Metallic Logo Reveals
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact & Working Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#ffc7a6] uppercase tracking-wider">
              Quick Contact
            </h4>
            <div className="space-y-3 text-xs text-[#b99a8b]">
              <div className="flex items-start gap-2.5">
                <FaWhatsapp className="w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" />
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi 3 Sixtey, I want to discuss a project or media requirement.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MdEmail className="w-4 h-4 text-[#f0a07a] mt-0.5 flex-shrink-0" />
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(BRAND.email)}&su=${encodeURIComponent('Project / Media Solution Inquiry - 3 Sixtey')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f6e9e1] transition-colors"
                >
                  {BRAND.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MdLocationOn className="w-4 h-4 text-[#f0a07a] mt-0.5 flex-shrink-0" />
                <span>{BRAND.address} (Serving Students Worldwide)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#b99a8b]">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>

          {/* REQUIRED EXACT ATTRIBUTION */}
          <p className="text-center font-medium text-[#f6e9e1] py-1 px-4 rounded-full bg-[#18110c] border border-[#c8714d]/30">
            This website created by Gokilasundarraj
          </p>

          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
              Privacy & Security
            </a>
            <a href="#services" className="hover:text-[#ffc7a6] transition-colors">
              Terms of Guidance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
