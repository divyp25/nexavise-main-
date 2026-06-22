import { useState, useRef, useCallback } from 'react';
import { useData } from "../contexts/DataContext";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "../components/ScrollReveal";
import { Shield, Users, Award, GraduationCap, Target, Flag, Globe } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

/* ── Stagger variants for back-face details ── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const TeamMemberCard = ({ member }: { member: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  /* ── Mouse position relative to card ── */
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useMotionValue(50); // % of card width
  const glowY = useMotionValue(50);

  /* Spring-smoothed tilt */
  const springCfg = { stiffness: 280, damping: 28, mass: 0.6 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), springCfg);
  const scale   = useSpring(1, { stiffness: 300, damping: 25 });

  /* Image parallax depth */
  const imgX = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), springCfg);
  const imgY = useSpring(useTransform(rawY, [-0.5, 0.5], [-8, 8]), springCfg);

  /* Neon glow opacity (only on hover) */
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width  - 0.5;
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
    glowX.set(((e.clientX - rect.left) / rect.width)  * 100);
    glowY.set(((e.clientY - rect.top)  / rect.height) * 100);
  }, [rawX, rawY, glowX, glowY]);

  const handleMouseEnter = () => { scale.set(1.04); setHovered(true); };
  const handleMouseLeave = () => {
    rawX.set(0); rawY.set(0);
    glowX.set(50); glowY.set(50);
    scale.set(1); setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="max-w-[340px] mx-auto w-full aspect-[3/4] sm:aspect-[4/5] [perspective:1000px] cursor-pointer relative rounded-3xl"
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-cyan-500/50 transition-colors flex flex-col group [transform-style:preserve-3d]"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Mouse tracking neon glow border/background */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl z-0"
            style={{
              background: `radial-gradient(120px circle at ${glowX.get()}% ${glowY.get()}%, rgba(6, 182, 212, 0.15), transparent 80%)`,
            }}
          />
          
          {/* Border light sweep overlay */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none z-10" />

          {/* Image Container with depth parallax */}
          <div className="flex-1 relative overflow-hidden [transform-style:preserve-3d]">
            <motion.img 
              src={member.image_url || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&q=80'} 
              alt={member.name}
              style={{
                x: imgX,
                y: imgY,
                scale: 1.1,
              }}
              className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent opacity-60 pointer-events-none z-10" />
          </div>

          <div className="p-6 pb-8 bg-white dark:bg-[#0a0e14] relative z-20 shrink-0 text-left [transform:translateZ(20px)]">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1 group-hover:text-cyan-500 transition-colors">
              {member.name}
            </h3>
            <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">
              {member.role}
            </p>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-50 dark:bg-[#0d131b] border border-cyan-500/50 rounded-3xl overflow-hidden shadow-xl p-8 flex flex-col justify-center items-center text-center backdrop-blur-md bg-opacity-80 [transform-style:preserve-3d]"
          style={{ transform: "rotateY(180deg) translateZ(1px)" }}
        >
          {/* Glowing back design elements */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur opacity-30 z-0 pointer-events-none" />
          
          <AnimatePresence>
            {isFlipped && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 flex flex-col justify-center items-center text-center w-full h-full"
              >
                <motion.h3 
                  variants={itemVariants} 
                  className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2"
                >
                  {member.name}
                </motion.h3>
                <motion.p 
                  variants={itemVariants}
                  className="text-sm font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-6"
                >
                  {member.role}
                </motion.p>
                <motion.div 
                  variants={itemVariants}
                  className="w-12 h-1 bg-cyan-500/30 mb-6 rounded-full shrink-0" 
                />
                <motion.p 
                  variants={itemVariants}
                  className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm overflow-y-auto custom-scrollbar pr-2 max-h-[150px]"
                >
                  {member.bio}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};

export const AboutUs = () => {
  const { aboutInfo, teamMembers, loading } = useData();

  if (loading) return <div className="min-h-screen bg-white dark:bg-[#0a0e14] pt-32"></div>;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0e14]">
      <Helmet>
        <title>About Us | Nexavise</title>
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-gray-50 dark:bg-[#05080c] border-b border-gray-200 dark:border-white/10">
        <div className="absolute inset-0 z-[0] cyber-grid opacity-20 dark:opacity-10 pointer-events-none" />
        <div className="orb orb-cyan w-[800px] h-[800px] top-[-300px] right-[-200px] z-[0] opacity-30 dark:opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] relative z-10 text-center">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-4 sm:mb-6">
              {aboutInfo?.title || 'About Nexavise'}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {aboutInfo?.description || 'We are dedicated to providing the highest level of enterprise cybersecurity solutions globally.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24 bg-[#03060a] border-b border-gray-200 dark:border-white/10 relative overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Header Content */}
            <div className="lg:col-span-6 text-left flex flex-col justify-center">
              <ScrollReveal>
                <span className="text-cyan-500 dark:text-cyan-400 font-bold uppercase tracking-widest text-xs mb-4 block">
                  OUR JOURNEY
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-6">
                  Building a Safer <br />
                  Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Tomorrow</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
                  From a small team of passionate hackers to a trusted cybersecurity partner for global enterprises. Here's how we evolved over the years.
                </p>
              </ScrollReveal>
            </div>

            {/* Radar Animation Graphic */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end relative">
              <ScrollReveal className="relative w-80 h-80 sm:w-[450px] sm:h-[450px] flex items-center justify-center">
                {/* Background glow orb */}
                <div className="absolute w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

                {/* Center Image Container */}
                <motion.div
                  className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden flex items-center justify-center z-20 border border-cyan-500/30"
                  animate={{
                    scale: [1, 1.03, 1],
                    boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.2)",
                      "0 0 40px rgba(6, 182, 212, 0.5)",
                      "0 0 20px rgba(6, 182, 212, 0.2)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <img
                    src="/shield_radar.jpg"
                    alt="Shield Defense System"
                    className="w-full h-full object-cover scale-110"
                  />
                </motion.div>
              </ScrollReveal>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-8 md:pl-0 space-y-12 mb-24">
            {/* Self-drawing line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] hidden md:block z-0">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-b from-cyan-500/10 via-cyan-500/40 to-cyan-500/10 origin-top"
              />
            </div>
            
            {/* Self-drawing line (Mobile) */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] block md:hidden z-0">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-b from-cyan-500/10 via-cyan-500/40 to-cyan-500/10 origin-top"
              />
            </div>
            
            {/* 2023 - 2025 */}
            <div className="relative flex flex-col md:flex-row md:justify-end items-start md:items-center">
              {/* Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
                className="absolute left-[-7px] md:left-1/2 md:-translate-x-0 md:-ml-2 w-4 h-4 rounded-full bg-white border-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10"
              />
              {/* Card */}
              <div className="w-full md:w-[45%] text-left">
                <motion.div
                  initial={{ opacity: 0, x: 50, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14]/80 border border-gray-200 dark:border-cyan-500/10 hover:border-cyan-500/30 transition-colors shadow-xl relative group overflow-hidden">
                    {/* Cyan edge glow */}
                    <div className="absolute top-0 bottom-0 right-0 w-[4px] bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    <div className="flex gap-4 items-start mb-4">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-cyan-500 mb-1">2023 – 2025</h3>
                        <p className="text-gray-900 dark:text-white font-bold text-sm">
                          Achieved ISO 27001, surpassed 504+ customers & completed NSE public listing.
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm pl-14">
                      Expanding our impact and strengthening digital resilience worldwide.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2017 - 2022 */}
            <div className="relative flex flex-col md:flex-row md:justify-start items-start md:items-center">
              {/* Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
                className="absolute left-[-7px] md:left-1/2 md:-translate-x-0 md:-ml-2 w-4 h-4 rounded-full bg-white border-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10"
              />
              {/* Card */}
              <div className="w-full md:w-[45%] text-left">
                <motion.div
                  initial={{ opacity: 0, x: -50, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14]/80 border border-gray-200 dark:border-cyan-500/10 hover:border-cyan-500/30 transition-colors shadow-xl relative group overflow-hidden">
                    {/* Cyan edge glow */}
                    <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    <div className="flex gap-4 items-start mb-4">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-cyan-500 mb-1">2017 – 2022</h3>
                        <p className="text-gray-900 dark:text-white font-bold text-sm">
                          Incorporated TechDefence Labs, launched 24x7 SOC & secured 400+ consulting clients.
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm pl-14">
                      Built the foundation of trust, innovation, and round-the-clock protection.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2012 - 2016 */}
            <div className="relative flex flex-col md:flex-row md:justify-end items-start md:items-center">
              {/* Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
                className="absolute left-[-7px] md:left-1/2 md:-translate-x-0 md:-ml-2 w-4 h-4 rounded-full bg-white border-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10"
              />
              {/* Card */}
              <div className="w-full md:w-[45%] text-left">
                <motion.div
                  initial={{ opacity: 0, x: 50, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14]/80 border border-gray-200 dark:border-cyan-500/10 hover:border-cyan-500/30 transition-colors shadow-xl relative group overflow-hidden">
                    {/* Cyan edge glow */}
                    <div className="absolute top-0 bottom-0 right-0 w-[4px] bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    <div className="flex gap-4 items-start mb-4">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-cyan-500 mb-1">2012 – 2016</h3>
                        <p className="text-gray-900 dark:text-white font-bold text-sm">
                          Conducted 500+ bootcamps, built R&D division & trained 55,000+ students.
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm pl-14">
                      Invested in knowledge, research and future cybersecurity leaders.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2008 - 2011 */}
            <div className="relative flex flex-col md:flex-row md:justify-start items-start md:items-center">
              {/* Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
                className="absolute left-[-7px] md:left-1/2 md:-translate-x-0 md:-ml-2 w-4 h-4 rounded-full bg-white border-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10"
              />
              {/* Card */}
              <div className="w-full md:w-[45%] text-left">
                <motion.div
                  initial={{ opacity: 0, x: -50, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14]/80 border border-gray-200 dark:border-cyan-500/10 hover:border-cyan-500/30 transition-colors shadow-xl relative group overflow-hidden">
                    {/* Cyan edge glow */}
                    <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    <div className="flex gap-4 items-start mb-4">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-cyan-500 mb-1">2008 – 2011</h3>
                        <p className="text-gray-900 dark:text-white font-bold text-sm">
                          Solved 26/11 cyber trail, launched HACKTRACK workshops & partnered with IIT Bombay.
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm pl-14">
                      Took the first steps in real-world cyber defense and impact.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2007 */}
            <div className="relative flex flex-col md:flex-row md:justify-end items-start md:items-center">
              {/* Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
                className="absolute left-[-7px] md:left-1/2 md:-translate-x-0 md:-ml-2 w-4 h-4 rounded-full bg-white border-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10"
              />
              {/* Card */}
              <div className="w-full md:w-[45%] text-left">
                <motion.div
                  initial={{ opacity: 0, x: 50, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14]/80 border border-gray-200 dark:border-cyan-500/10 hover:border-cyan-500/30 transition-colors shadow-xl relative group overflow-hidden">
                    {/* Cyan edge glow */}
                    <div className="absolute top-0 bottom-0 right-0 w-[4px] bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    <div className="flex gap-4 items-start mb-4">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                        <Flag className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-cyan-500 mb-1">2007</h3>
                        <p className="text-gray-900 dark:text-white font-bold text-sm">
                          Started cybersecurity consulting with Cyber Cell Ahmedabad & Sunny Vaghela recognized as Gujarat's IT Expert.
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm pl-14">
                      A single mission to secure the digital world began.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>

          {/* Bottom Stats */}
          <ScrollReveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0a0e14]/80 border border-gray-200 dark:border-cyan-500/10 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center flex flex-col items-center">
                  <Shield className="w-8 h-8 text-cyan-500 mb-4" />
                  <span className="text-4xl font-black text-gray-900 dark:text-white mb-2">17+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Years of Excellence</span>
                </div>
                <div className="text-center flex flex-col items-center">
                  <Users className="w-8 h-8 text-cyan-500 mb-4" />
                  <span className="text-4xl font-black text-gray-900 dark:text-white mb-2">504+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Happy Clients</span>
                </div>
                <div className="text-center flex flex-col items-center">
                  <Award className="w-8 h-8 text-cyan-500 mb-4" />
                  <span className="text-4xl font-black text-gray-900 dark:text-white mb-2">26+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Industry Awards</span>
                </div>
                <div className="text-center flex flex-col items-center">
                  <Globe className="w-8 h-8 text-cyan-500 mb-4" />
                  <span className="text-4xl font-black text-gray-900 dark:text-white mb-2">24/7</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Cyber Defense</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-4">
                Our Leadership
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Meet the experts who drive our vision and secure the future of our clients.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers?.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.1}>
                <TeamMemberCard member={member} />
              </ScrollReveal>
            ))}
          </div>
          
          {(!teamMembers || teamMembers.length === 0) && (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              No team members found. Add some in the Admin Dashboard!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
