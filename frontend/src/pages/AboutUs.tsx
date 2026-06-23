import { useState, useRef, useCallback } from 'react';
import { useData } from "../contexts/DataContext";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { ScrollReveal } from "../components/ScrollReveal";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import DecryptedText from "../components/DecryptedText";
import { 
  MapPin, 
  Phone, 
  ArrowRight,
  Cpu, 
  Users, 
  Heart, 
  Zap, 
  Briefcase, 
  Smile, 
  BarChart3, 
  Settings, 
  Eye, 
  Target, 
  CheckCircle2, 
  Star,
  Scale,
  Lightbulb,
  Sparkles,
  ShoppingCart,
  Landmark,
  Factory,
  Code,
  Plane,
  Calendar,
  Rocket,
  Building2,
  Clock
} from 'lucide-react';

/* ── Stagger variants for animations ── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
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

  const handleMouseEnter = () => { scale.set(1.04); };
  const handleMouseLeave = () => {
    rawX.set(0); rawY.set(0);
    glowX.set(50); glowY.set(50);
    scale.set(1);
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
  const { teamMembers, allServicesData, loading } = useData();

  if (loading) return <div className="min-h-screen bg-white dark:bg-[#0a0e14] pt-32"></div>;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0e14] text-gray-950 dark:text-white">
      <Helmet>
        <title>About Us | Nexavise Consulting</title>
      </Helmet>

      {/* About Section */}
      <section className="pt-28 sm:pt-36 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side description */}
            <div className="lg:col-span-5 text-left">
              <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-6">
                  <DecryptedText text="About Nexavise" animateOn="view" revealDirection="start" speed={60} /> <br />
                  <span className="text-cyan-600 dark:text-cyan-400">Consulting</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg mb-8">
                  Nexavise Consulting Pvt Ltd is a dynamic services provider specializing in business solutions and digital transformation services. Headquartered in Pilibhit, Uttar Pradesh, India, the company helps organizations solve complex business challenges through innovative strategies, technology solutions, and customer-focused approaches.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/services" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
                  >
                    Explore {allServicesData?.length || 53} Services <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Contact Us
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Right side stats cards row */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  
                  {/* Card 1 */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[220px]">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-4">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">2025</h4>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-2">FOUNDED</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[220px]">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-4">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-sm font-extrabold text-gray-900 dark:text-white leading-snug">Pilibhit, Uttar Pradesh</h4>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-2">HEADQUARTERS</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[220px]">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-4">
                      <Users className="h-6 w-6" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">Multiple Industries</h4>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-2">INDUSTRIES SERVED</p>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[220px]">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-4">
                      <Rocket className="h-6 w-6" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-sm font-extrabold text-gray-900 dark:text-white leading-tight">Digital Transformation</h4>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-2">OUR FOCUS</p>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#05080c] border-y border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-4">
                <DecryptedText text="Vision & Mission" animateOn="view" revealDirection="center" speed={60} />
              </h2>
              <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal delay={0.1}>
              <div className="h-full bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/30 transition-all duration-300 p-8 rounded-3xl flex flex-col items-center text-center shadow-lg relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 shrink-0 group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nexavise envisions becoming a globally recognized services partner, trusted for delivering transformative business solutions that drive sustainable growth and competitive advantage. The company aspires to be at the forefront of business innovation by leveraging deep industry expertise, advanced technologies, and a client-first approach. Its vision reflects a commitment to helping organizations navigate complexity, unlock potential, and achieve excellence in an ever-changing business environment.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="h-full bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 p-8 rounded-3xl flex flex-col items-center text-center shadow-lg relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 shrink-0 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The mission of Nexavise is centered on delivering high-value, customized services that address critical business challenges and create measurable impact for clients. The company is dedicated to supporting organizations through every phase of their transformation journey, providing solutions that are strategic, reliable, and aligned with long-term business objectives. Nexavise focuses on building lasting partnerships by understanding unique client needs and delivering services that enhance operational efficiency, customer satisfaction, and business performance.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Historical Timeline Section */}
      <section className="py-24 relative overflow-hidden bg-[#05080c] border-b border-gray-200 dark:border-white/10 text-white">
        {/* Ambient background grid & orbs */}
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
          {/* Header */}
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-16 justify-center">
              <div className="h-14 w-14 rounded-full border border-cyan-400/45 bg-cyan-950/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Clock className="h-7 w-7" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white text-center font-display">
                Historical Timeline
              </h2>
            </div>
          </ScrollReveal>

          {/* Desktop Timeline: Diagonal snake-like path */}
          <div className="relative w-full aspect-[1000/600] max-w-5xl mx-auto hidden md:block">
            {/* SVG Path */}
            <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
              {/* Segment 1 */}
              <motion.path
                d="M 50,110 C 100,110 90,180 102,180"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]"
              />
              {/* Segment 2 */}
              <motion.path
                d="M 150,228 C 150,280 320,280 402,350"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
                className="drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]"
              />
              {/* Segment 3 */}
              <motion.path
                d="M 450,398 C 450,450 600,450 672,520"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 1.2, duration: 0.6, ease: "easeInOut" }}
                className="drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]"
              />
              {/* Segment 4 */}
              <motion.path
                d="M 720,568 C 720,590 850,590 918,590"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 1.8, duration: 0.6, ease: "easeInOut" }}
                className="drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]"
              />
              {/* Arrow tip */}
              <motion.path
                d="M 906,580 L 918,590 L 906,600"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.4, duration: 0.2 }}
              />
              {/* Glowing Inlet Connection Dots */}
              <circle cx="102" cy="180" r="5" fill="#22d3ee" className="drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              <circle cx="402" cy="350" r="5" fill="#22d3ee" className="drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              <circle cx="672" cy="520" r="5" fill="#22d3ee" className="drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            </svg>

            {/* Node 1: Circle center at (150, 180), text at (220, 110) */}
            <div className="absolute left-[15%] top-[30%] flex items-center gap-6 -translate-x-12 -translate-y-12">
              <div className="relative flex items-center justify-center shrink-0">
                <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20 animate-[ping_3.5s_infinite]" />
                <div className="w-24 h-24 rounded-full border-2 border-cyan-400 bg-[#05080c] shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center relative z-10 hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-10 w-10 text-cyan-400" />
                </div>
              </div>
              <div className="border-l-2 border-cyan-500/70 pl-4 py-1 text-left max-w-[280px]">
                <div className="w-6 h-1 bg-cyan-400 mb-2 rounded-full" />
                <h3 className="text-lg font-black uppercase tracking-wider text-white mb-1">Company Founded</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                  Incorporated in Pilibhit, Uttar Pradesh, specializing in operational management and agile consulting.
                </p>
              </div>
            </div>

            {/* Node 2: Circle center at (450, 350), text at (520, 280) */}
            <div className="absolute left-[45%] top-[58.3%] flex items-center gap-6 -translate-x-12 -translate-y-12">
              <div className="relative flex items-center justify-center shrink-0">
                <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20 animate-[ping_3.5s_infinite]" />
                <div className="w-24 h-24 rounded-full border-2 border-cyan-400 bg-[#05080c] shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center relative z-10 hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-cyan-400" />
                </div>
              </div>
              <div className="border-l-2 border-cyan-500/70 pl-4 py-1 text-left max-w-[280px]">
                <div className="w-6 h-1 bg-cyan-400 mb-2 rounded-full" />
                <h3 className="text-lg font-black uppercase tracking-wider text-white mb-1">Service Expansion</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                  Deploying strategic operations across key states and expanding to comprehensive business consulting models.
                </p>
              </div>
            </div>

            {/* Node 3: Circle center at (720, 520), text at (790, 450) */}
            <div className="absolute left-[72%] top-[86.7%] flex items-center gap-6 -translate-x-12 -translate-y-12">
              <div className="relative flex items-center justify-center shrink-0">
                <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20 animate-[ping_3.5s_infinite]" />
                <div className="w-24 h-24 rounded-full border-2 border-cyan-400 bg-[#05080c] shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center relative z-10 hover:scale-110 transition-transform duration-300">
                  <Rocket className="h-10 w-10 text-cyan-400" />
                </div>
              </div>
              <div className="border-l-2 border-cyan-500/70 pl-4 py-1 text-left max-w-[280px]">
                <div className="w-6 h-1 bg-cyan-400 mb-2 rounded-full" />
                <h3 className="text-lg font-black uppercase tracking-wider text-white mb-1">Digital Transformation</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                  Scaling cloud system architectures and integrating emerging Artificial Intelligence services.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Timeline: Vertical list */}
          <div className="relative pl-8 border-l-2 border-cyan-500/30 space-y-12 md:hidden text-left max-w-lg mx-auto">
            {[
              {
                year: '2025',
                title: 'Company Founded',
                icon: Building2,
                desc: 'Incorporated in Pilibhit, Uttar Pradesh, specializing in operational management and agile consulting.',
              },
              {
                year: '2025',
                title: 'Service Expansion',
                icon: Users,
                desc: 'Deploying strategic operations across key states and expanding to comprehensive business consulting models.',
              },
              {
                year: '2025+',
                title: 'Digital Transformation Vision',
                icon: Rocket,
                desc: 'Scaling cloud system architectures and integrating emerging Artificial Intelligence services.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Glowing timeline node */}
                  <div className="absolute -left-[45px] top-1 h-8 w-8 rounded-full border border-cyan-400 bg-[#05080c] flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>

                  <div className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
                    {item.year}
                  </div>
                  <h4 className="text-lg font-extrabold uppercase text-white tracking-wide mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#05080c] border-y border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-4">
                <Briefcase className="h-4 w-4" />
                <span>Our Capabilities</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-4">
                <DecryptedText text="Service Offerings" animateOn="view" revealDirection="center" speed={60} />
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Comprehensive, robust solutions structured into six core strategic domains.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1 */}
            <ScrollReveal delay={0.05}>
              <div className="h-full bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-8 rounded-3xl shadow-sm relative group hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Business Consulting & Strategy
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Strategic planning and business transformation</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Operational efficiency and process optimization</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Change management & organizational development</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Market entry and expansion strategies</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* 2 */}
            <ScrollReveal delay={0.1}>
              <div className="h-full bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-8 rounded-3xl shadow-sm relative group hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Technology Solutions
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Digital transformation consulting</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Enterprise system integration</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Cloud migration and management</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> IT infrastructure and support services</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* 3 */}
            <ScrollReveal delay={0.15}>
              <div className="h-full bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-8 rounded-3xl shadow-sm relative group hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                  <Smile className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Customer Experience Management
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Customer service operations</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Omnichannel support solutions</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> CRM implementation and optimization</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Voice of customer analytics</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* 4 */}
            <ScrollReveal delay={0.2}>
              <div className="h-full bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-8 rounded-3xl shadow-sm relative group hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Workforce Solutions
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Talent acquisition and recruitment</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Workforce management and optimization</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Training and development programs</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> HR consulting and advisory</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* 5 */}
            <ScrollReveal delay={0.25}>
              <div className="h-full bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-8 rounded-3xl shadow-sm relative group hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Analytics & Insights
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Business intelligence and reporting</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Data analytics and visualization</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Predictive modeling and forecasting</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Performance management solutions</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* 6 */}
            <ScrollReveal delay={0.3}>
              <div className="h-full bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-8 rounded-3xl shadow-sm relative group hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Operations Excellence
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Business process outsourcing (BPO)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Back-office operations management</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Quality assurance and compliance</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" /> Continuous improvement programs</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Industry Focus */}
      <section className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#05080c] border-y border-gray-200 dark:border-white/10">
        <div className="absolute inset-0 z-[0] cyber-grid opacity-10 dark:opacity-5 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-[1440px] relative z-10 text-center mb-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-4">
              <DecryptedText text="Industries We Empower" animateOn="view" revealDirection="center" speed={60} />
            </h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full mb-6" />
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Delivering tailored business solutions and technological transformation across global sectors.
            </p>
          </ScrollReveal>
        </div>

        {/* Ticker Row 1 - Left to Right scrolling */}
        <div className="relative w-full overflow-hidden flex select-none">
          <div className="animate-marquee flex gap-6 whitespace-nowrap">
            {[...Array(4)].map((_, repeatIndex) => (
              <div key={`row1-${repeatIndex}`} className="flex gap-6 shrink-0">
                {[
                  { name: "Retail & E-commerce", icon: ShoppingCart },
                  { name: "Financial Services & Banking", icon: Landmark },
                  { name: "Healthcare & Life Sciences", icon: Heart },
                  { name: "Telecommunications", icon: Phone },
                  { name: "Manufacturing & Supply Chain", icon: Factory },
                  { name: "Technology & Software", icon: Code },
                  { name: "Hospitality & Travel", icon: Plane },
                  { name: "Energy & Utilities", icon: Zap }
                ].map((ind, idx) => {
                  const Icon = ind.icon;
                  return (
                    <div 
                      key={`ind1-${idx}`} 
                      className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 font-bold hover:border-cyan-500/40 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-cyan-500 shrink-0" />
                      <span>{ind.name}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {/* Edge fades for premium depth look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 dark:from-[#05080c] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 dark:from-[#05080c] to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
          <ScrollReveal>
            <div className="text-left mb-16 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-4">
                <DecryptedText text="Our Core Values" animateOn="view" revealDirection="start" speed={60} />
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl leading-relaxed">
                The guiding principles that define our commitment to excellence, integrity, and client success.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Excellence", desc: "Striving for the highest quality in every deliverable and interaction.", icon: Star },
              { title: "Integrity", desc: "Unwavering ethical standards and transparency in all our dealings.", icon: Scale },
              { title: "Innovation", desc: "Continuous learning and pioneering new ways to solve old problems.", icon: Lightbulb },
              { title: "Collaboration", desc: "Working as a unified force with our clients and within our teams.", icon: Users },
              { title: "Client-Centricity", desc: "Focusing on long-term value creation and meaningful partnerships.", icon: Sparkles },
              { title: "Agility", desc: "Adapting swiftly to changing market dynamics and technological shifts.", icon: Zap }
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 0.05}>
                  <div className="h-full p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 hover:border-cyan-500/40 hover:shadow-lg dark:hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col items-start text-left relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">{val.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
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
