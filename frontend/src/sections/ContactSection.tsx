import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BRAND } from '../lib/constants';

export const ContactSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi 3 Sixtey, I want to discuss a project or media requirement.')}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(BRAND.email)}&su=${encodeURIComponent('Project / Media Solution Inquiry - 3 Sixtey')}`;

  return (
    <section id="contact" className="relative py-24 bg-[#070504] border-t border-[#c8714d]/15 select-none">
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c120c] border border-[#c8714d]/40 text-[#f0a07a] text-xs font-semibold uppercase tracking-widest shadow-sm">
            <span>Direct Communication</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f6e9e1] tracking-tight">
            Connect <span className="text-copper-gradient">With Us</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b99a8b] leading-relaxed">
            Ready to start your capstone project, IEEE research paper implementation, or video production? Reach out via WhatsApp or email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl lg:max-w-5xl mx-auto">

          {/* Card 1: WhatsApp Chat */}
          <div className="p-8 rounded-2xl bg-[#110c08] border border-[#25D366]/40 hover:border-[#25D366] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-[0_10px_30px_rgba(37,211,102,0.1)]">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#132416] border border-[#25D366]/50 flex items-center justify-center text-[#25D366]">
                <FaWhatsapp className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#f6e9e1]">
                WhatsApp Support
              </h3>
              <p className="text-xs text-[#b99a8b] leading-relaxed">
                Fastest response for project abstracts, paper titles, and quick video edits.
              </p>
              <div className="pt-2 text-xs font-mono text-[#25D366] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>Instant Chat Available</span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:scale-[1.02]"
            >
              <FaWhatsapp className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 2: Email & Online Consult */}
          <div className="p-8 rounded-2xl bg-[#110c08] border border-[#c8714d]/30 hover:border-[#f0a07a] transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#1e140d] border border-[#c8714d]/40 flex items-center justify-center text-[#f0a07a]">
                <MdEmail className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#f6e9e1]">
                Email & Thesis Docs
              </h3>
              <p className="text-xs text-[#b99a8b] leading-relaxed">
                Send formal project syllabus requirements, college guidelines, and raw assets.
              </p>
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-mono text-[#ffc7a6] hover:underline break-all"
              >
                {BRAND.email}
              </a>
            </div>

            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-copper-outline flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold hover:scale-[1.02] transition-all cursor-pointer"
            >
              <MdEmail className="w-4 h-4 text-[#f0a07a]" />
              <span>Send Email</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
