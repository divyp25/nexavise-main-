import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Shield, Activity, FileText } from "lucide-react";
import DecryptedText from "./DecryptedText";
import { CyberGlobe } from "./CyberGlobe";

export const HeroSection = () => {

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* 3D CyberGlobe Background - Shifted right on desktop */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[120%] lg:-right-[35%] z-0 pointer-events-auto flex items-center justify-center opacity-40 sm:opacity-60 lg:opacity-100">
        <CyberGlobe />
      </div>

      {/* Subtle bottom gradient for blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10 max-w-[1440px] pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="pointer-events-auto flex flex-col items-start text-left w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-6 sm:mb-8 flex-wrap"
            >
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>NEXT-GEN CYBERSECURITY HUB</span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-[1.1] tracking-tight text-gray-900 dark:text-white text-left">
              Enterprise-Grade <br />
              <DecryptedText 
                text="Cybersecurity & Compliance"
                animateOn="view"
                revealDirection="center"
                speed={100}
                maxIterations={20}
                parentClassName="inline-block pb-2"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mb-8 sm:mb-10 leading-relaxed font-medium text-left"
            >
              Comprehensive GRC advisory, VAPT testing, managed SOC, privacy regulations compliance, and active threat telemetry. 53 custom cyber services unified into one predictive portal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-start gap-3 sm:gap-4 mb-12 sm:mb-16"
            >
              <Link to="/services" className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-[14px] sm:text-[15px] hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm dark:shadow-md hover:scale-105 active:scale-95 duration-200">
                Explore 53 Services <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full"
            >
              <div className="flex flex-col items-start text-left gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-lg hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">ISO CERTIFIED</p>
                  <p className="text-gray-900 dark:text-white font-bold text-sm">27001 & 27701</p>
                </div>
              </div>

              <div className="flex flex-col items-start text-left gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-lg hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">AUDIT ATTESTED</p>
                  <p className="text-gray-900 dark:text-white font-bold text-sm">SOC 2 Type II</p>
                </div>
              </div>

              <div className="flex flex-col items-start text-left gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-lg hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6 text-gray-900 dark:text-gray-200" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">PRIVACY READY</p>
                  <p className="text-gray-900 dark:text-white font-bold text-sm">GDPR & DPDP</p>
                </div>
              </div>

              <div className="flex flex-col items-start text-left gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-lg hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">THREAT DETECTION</p>
                  <p className="text-gray-900 dark:text-white font-bold text-sm">99.9% Mitigated</p>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Right column empty, globe fills the background */}
          <div className="hidden lg:block w-full h-[800px] pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

