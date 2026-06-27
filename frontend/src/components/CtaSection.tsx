import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Iso27001, 
  Iso9001, 
  Iso5001, 
  Iso14001, 
  Iso9001_2015, 
  StartupIndia,
  Hipaa,
  Dpd,
  Soc2,
  Cobit,
  CheckPoint
} from './CertificationBadges';

// Unified list of logos metadata
const logosList = [
  { id: 'msme', name: 'MSME India' },
  { id: 'dpiit', name: 'DPIIT Startup India' },
  { id: 'invest-up', name: 'Invest UP' },
  { id: 'iso27001', name: 'ISO 27001' },
  { id: 'startup-india-hash', name: 'Startup India' },
  { id: 'hipaa', name: 'HIPAA Compliance' },
  { id: 'dpd', name: 'DPD Partner' },
  { id: 'soc2', name: 'SOC 2 Type 2' },
  { id: 'cobit', name: 'COBIT Certified' },
  { id: 'checkpoint', name: 'Check Point Partner' }
];

export const CtaSection = () => {
  const [animationType, setAnimationType] = useState<'marquee' | 'grid'>('marquee');
  const { theme } = useTheme();

  // Helper function to render logos with dynamic sizing based on display layout
  const getLogoComponent = (id: string, isHighlighted: boolean) => {
    const isoSize = isHighlighted ? 175 : 80;
    const startupHashSize = isHighlighted ? 250 : 110;
    const isDark = theme === 'dark';

    switch (id) {
      case 'msme':
        return (
          <img 
            src="/msme_new.svg" 
            alt="MSME India" 
            className={`${
              isHighlighted ? 'max-h-[110px] sm:max-h-[140px]' : 'max-h-[50px] sm:max-h-[65px]'
            } w-auto object-contain transition-all duration-300 ${
              isDark ? 'brightness-0 invert' : 'grayscale hover:grayscale-0'
            }`} 
          />
        );
      case 'dpiit':
        return (
          <img 
            src="/startup_india_new.svg" 
            alt="Startup India DPIIT" 
            className={`${
              isHighlighted ? 'max-h-[90px] sm:max-h-[120px]' : 'max-h-[42px] sm:max-h-[55px]'
            } w-auto object-contain scale-[1.2] transition-all duration-300 ${
              isDark ? 'brightness-0 invert' : 'grayscale hover:grayscale-0'
            }`} 
          />
        );
      case 'invest-up':
        return (
          <img 
            src="/new_logo.svg" 
            alt="Invest UP" 
            className={`${
              isHighlighted ? 'max-h-[110px] sm:max-h-[140px]' : 'max-h-[50px] sm:max-h-[65px]'
            } w-auto object-contain transition-all duration-300 ${
              isDark ? 'brightness-0 invert' : 'grayscale hover:grayscale-0'
            }`} 
          />
        );
      case 'iso27001':
        return <Iso27001 size={isoSize} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      case 'iso9001':
        return <Iso9001 size={isoSize} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      case 'iso5001':
        return <Iso5001 size={isoSize} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      case 'iso14001':
        return <Iso14001 size={isoSize} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      case 'iso9001-2015':
        return <Iso9001_2015 size={isoSize} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      case 'startup-india-hash':
        return <StartupIndia size={startupHashSize} className="grayscale hover:grayscale-0 transition-all duration-300 mt-1" />;
      case 'hipaa':
        return <Hipaa size={isHighlighted ? 200 : 100} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      case 'dpd':
        return <Dpd size={isHighlighted ? 200 : 100} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      case 'soc2':
        return <Soc2 size={isHighlighted ? 175 : 80} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      case 'cobit':
        return <Cobit size={isHighlighted ? 175 : 80} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      case 'checkpoint':
        return <CheckPoint size={isHighlighted ? 175 : 80} className="grayscale hover:grayscale-0 hover:text-cyan-500 transition-all duration-300" />;
      default:
        return null;
    }
  };

  // Framer Motion Variants for Staggered Grid
  const gridContainerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "spring" as const, stiffness: 120, damping: 14 } 
    }
  };

  return (
    <section className="py-16 sm:py-24">
      {/* Styles for subtle bouncing animation of tooltips and marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-subtle {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2.5s infinite ease-in-out;
        }
        @keyframes marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-scroll { animation: none; }
        }
      `}} />

      {/* Container for main CTA box */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Main CTA Box */}
        <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/5 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-left shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-gray-200 mb-4 sm:mb-6 tracking-tight">
            Looking for a custom project quote?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mb-8 sm:mb-10 leading-relaxed">
            Submit your system architecture size, regulatory requirements, or penetration testing scope target, and receive a proposal within 4 hours.
          </p>
          <a 
            href="mailto:nexaviseconsulting@gmail.com"
            className="inline-block text-center w-full sm:w-auto px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-base sm:text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm dark:shadow-md"
          >
            Talk to an Expert
          </a>
        </div>
      </div>

      {/* Certifications Section - Full Screen Width */}
      <div className="mt-20 pt-16 border-t border-gray-200 dark:border-white/5 text-center w-full font-display">
        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-[0.2em] mb-8 px-4">
          Our Official Certifications
        </h3>

        {/* Toggle Switcher */}
        <div className="flex justify-center mb-10 px-4">
          <div className="inline-flex rounded-full p-1 bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 shadow-inner">
            <button
              onClick={() => setAnimationType('marquee')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                animationType === 'marquee'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Slider Carousel
            </button>
            <button
              onClick={() => setAnimationType('grid')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                animationType === 'grid'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Interactive Grid
            </button>
          </div>
        </div>

        {/* Interactive Views Wrapper */}
        <div className="relative overflow-hidden w-full py-4 min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {animationType === 'marquee' ? (
              <motion.div
                key="slider-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full relative py-6 flex flex-col items-center"
              >
                {/* Edge Gradient Blurs */}
                <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-48 bg-gradient-to-r from-white dark:from-[#0a0e14] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-48 bg-gradient-to-l from-white dark:from-[#0a0e14] to-transparent z-10 pointer-events-none" />

                {/* Slider Track Container */}
                <div className="w-full overflow-hidden relative h-[210px] flex items-center">
                  {/* Sliding Row — two identical groups; the track translates
                      exactly one group width (-50%) for a seamless loop. The
                      trailing gap (pr-*) equals the inner gap so spacing across
                      the seam matches the spacing between items. */}
                  <div className="animate-marquee-scroll">
                    {[0, 1].map((copy) => (
                      <div
                        key={`marquee-group-${copy}`}
                        aria-hidden={copy === 1}
                        className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
                      >
                        {logosList.map((logo, idx) => (
                          <div
                            key={`marquee-card-${copy}-${logo.id}-${idx}`}
                            className="relative shrink-0 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300 w-44 h-28 sm:w-60 sm:h-36 hover:scale-105"
                          >
                            {getLogoComponent(logo.id, true)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="w-full container mx-auto px-4 sm:px-6 max-w-6xl"
              >
                <motion.div
                  variants={gridContainerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center items-center"
                >
                  {logosList.map((logo) => (
                    <motion.div
                      key={logo.id}
                      variants={gridItemVariants}
                      whileHover={{ y: -6, scale: 1.04 }}
                      className="flex flex-col items-center justify-center p-4 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-150 dark:border-white/5 rounded-2xl h-[135px] shadow-sm hover:shadow-md hover:border-cyan-500/30 dark:hover:border-cyan-500/20 transition-all duration-300"
                    >
                      <div className="flex items-center justify-center h-full w-full">
                        {getLogoComponent(logo.id, false)}
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 mt-3 uppercase tracking-widest">
                        {logo.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
