import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { BRAND } from '../../lib/constants';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Book Order', href: '#book' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace(/^#/, '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070504]/90 backdrop-blur-xl border-b border-[rgba(240,160,122,0.18)] shadow-[0_10px_30px_rgba(0,0,0,0.7)] py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-1 bg-[#120d09] border border-[#c8714d]/40 shadow-[0_0_15px_rgba(240,160,122,0.25)] group-hover:border-[#f0a07a] group-hover:shadow-[0_0_22px_rgba(240,160,122,0.5)] transition-all duration-300 overflow-hidden flex items-center justify-center">
            <img
              src="/logo-icon.png"
              alt="3 Sixtey"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(240,160,122,0.3)] group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }}
            />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-copper-gradient">
              3 Sixtey
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-wider text-[#b99a8b] uppercase font-mono -mt-1 hidden sm:inline-block">
              Project & Media Solution
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-xs xl:text-sm font-medium text-[#f6e9e1]/80 hover:text-[#ffc7a6] transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ffc7a6] to-[#c8714d] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action: WhatsApp */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi 3 Sixtey, I want to discuss a project / media requirement.')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162218] hover:bg-[#1e3022] border border-[#25D366]/40 text-[#25D366] text-xs font-semibold transition-all hover:scale-105 shadow-sm"
          >
            <FaWhatsapp className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 rounded-xl bg-[#160f0b] border border-[#c8714d]/30 text-[#f0a07a] hover:text-white"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0705]/98 border-b border-[#c8714d]/30 backdrop-blur-2xl px-6 py-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-sm font-medium text-[#f6e9e1] hover:text-[#ffc7a6] py-1 border-b border-[#c8714d]/10"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
