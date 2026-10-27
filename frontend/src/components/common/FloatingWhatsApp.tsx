import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { BRAND } from '../../lib/constants';

interface FloatingWhatsAppProps {
  selectedService?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ selectedService }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const serviceText = selectedService || 'College Project & Media Solutions';
  const defaultMsg = `Hi 3 Sixtey, I am interested in ${serviceText}. Please share details and pricing.`;
  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:block px-3 py-1.5 rounded-lg bg-[#0e0a08]/95 border border-[rgba(240,160,122,0.3)] text-[#f6e9e1] text-xs font-medium shadow-xl backdrop-blur-md animate-fade-in pointer-events-none">
          Chat with us on WhatsApp
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Floating WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)]"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
          <FaWhatsapp className="relative z-10 w-7 h-7" />
        </a>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
