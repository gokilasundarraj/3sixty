import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/common/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgress } from './components/common/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { ServicesSection } from './sections/ServicesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FeedbackSection } from './sections/FeedbackSection';
import { BookOrderSection } from './sections/BookOrderSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

export function App() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070504] text-[#f6e9e1] font-sans overflow-x-hidden selection:bg-[#c8714d] selection:text-white">
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <TestimonialsSection />
        <FeedbackSection />
        <BookOrderSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
