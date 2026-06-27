import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Building2, Users, Rocket, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

/* ──────────────────────────────────────────────────────────────
   Types & data
   ────────────────────────────────────────────────────────────── */
export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const DEFAULT_MILESTONES: TimelineMilestone[] = [
  {
    year: '2020',
    title: 'Company Founded',
    description:
      'Incorporated in Pilibhit, Uttar Pradesh, specializing in operational management and agile consulting.',
    icon: Building2,
  },
  {
    year: '2022',
    title: 'Service Expansion',
    description:
      'Deploying strategic operations across key states and expanding to comprehensive business consulting models.',
    icon: Users,
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    description:
      'Scaling cloud system architectures and integrating emerging Artificial Intelligence services.',
    icon: Rocket,
  },
];

/* Rail horizontal position — shared by the line AND every node so they
   stay perfectly aligned across breakpoints.
   mobile/tablet: left rail · desktop (lg+): centered rail            */
const RAIL = 'left-9 -translate-x-1/2 lg:left-1/2';

/* ──────────────────────────────────────────────────────────────
   Animation variants
   ────────────────────────────────────────────────────────────── */
const cardVariants: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 90, damping: 18, mass: 0.6 },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 14, delay: 0.05 },
  },
};

const yearVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.15 } },
};

/* ──────────────────────────────────────────────────────────────
   Single timeline item
   ────────────────────────────────────────────────────────────── */
function TimelineItem({
  milestone,
  index,
}: {
  milestone: TimelineMilestone;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Activate when the item's centre reaches the middle of the viewport,
  // so events light up one-by-one as the rail is drawn past them.
  const inView = useInView(ref, {
    once: true,
    margin: '-30% 0px -30% 0px',
  });

  const Icon = milestone.icon;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ staggerChildren: 0.12, delayChildren: index * 0.05 }}
      className="relative flex items-center gap-5 py-8 sm:gap-8 sm:py-10 lg:grid lg:grid-cols-[1fr_5rem_1fr] lg:gap-0"
    >
      {/* ── Glowing node on the rail ───────────────────────────── */}
      <div
        className={`absolute top-1/2 z-20 -translate-y-1/2 ${RAIL}`}
        aria-hidden
      >
        {/* soft pulsing halo */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/30 blur-[2px]"
          animate={
            inView
              ? { scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }
              : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* core dot */}
        <motion.span
          variants={{
            hidden: { scale: 0 },
            show: {
              scale: 1,
              transition: { type: 'spring', stiffness: 260, damping: 14 },
            },
          }}
          className={`relative block h-4 w-4 rounded-full border-2 transition-colors duration-500 ${
            inView
              ? 'border-cyan-300 bg-cyan-400 shadow-[0_0_14px_4px_rgba(34,211,238,0.7)]'
              : 'border-cyan-700 bg-[#050B12]'
          }`}
        />
      </div>

      {/* ── Left column: icon container + year ─────────────────── */}
      <div className="order-2 ml-12 flex shrink-0 flex-col items-center lg:order-1 lg:ml-0 lg:items-end lg:pr-12">
        <motion.div
          variants={iconVariants}
          className="group/icon relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-50/60 text-cyan-600 shadow-[0_0_18px_rgba(34,211,238,0.18)] backdrop-blur-sm transition-all duration-500 dark:bg-cyan-500/5 dark:text-cyan-300 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
        >
          {/* faint inner ring */}
          <span className="pointer-events-none absolute inset-[6px] rounded-full border border-cyan-400/20" />
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" strokeWidth={1.5} />
        </motion.div>

        <motion.span
          variants={yearVariants}
          className="mt-3 font-mono text-sm font-bold tracking-[0.2em] text-cyan-600 dark:text-cyan-300 sm:text-base lg:text-lg"
        >
          {milestone.year}
        </motion.span>
      </div>

      {/* ── Center spacer (rail gutter on desktop only) ────────── */}
      <div className="hidden lg:order-2 lg:block" aria-hidden />

      {/* ── Right column: glassmorphism card ───────────────────── */}
      <motion.div
        variants={cardVariants}
        className="group order-3 flex-1 rounded-2xl border border-cyan-400/20 bg-white/70 p-5 shadow-[0_8px_30px_rgba(2,8,20,0.10)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_0_28px_rgba(34,211,238,0.25)] dark:bg-white/[0.03] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] sm:p-6 lg:order-3 lg:pl-8"
      >
        <span className="mb-3 block h-[2px] w-8 rounded-full bg-gradient-to-r from-cyan-400 to-transparent" />
        <h3 className="mb-2 font-display text-lg font-black uppercase tracking-wide text-slate-900 transition-colors duration-300 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300 sm:text-xl lg:text-2xl">
          {milestone.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          {milestone.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────────────────────── */
export default function HistoricalTimeline({
  milestones = DEFAULT_MILESTONES,
  heading = 'Historical Timeline',
}: {
  milestones?: TimelineMilestone[];
  heading?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked draw: the glowing fill grows from top→bottom as the
  // section scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  });
  const drawProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section className="relative overflow-hidden py-24 text-slate-900 dark:text-white">
      {/* Ambient background: grid + cyan orb */}
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-10 dark:opacity-[0.07]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px] dark:bg-cyan-500/[0.07]" />

      <div className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16 flex items-center justify-center gap-4 sm:mb-20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/45 bg-cyan-50 text-cyan-600 shadow-[0_0_20px_rgba(34,211,238,0.18)] dark:bg-cyan-500/10 dark:text-cyan-300 dark:shadow-[0_0_22px_rgba(34,211,238,0.3)]">
              <Clock className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h2 className="text-center font-display text-3xl font-black uppercase tracking-wider md:text-5xl">
              {heading}
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* faint static track */}
          <div
            className={`absolute top-0 bottom-0 z-0 w-[2px] bg-slate-200 dark:bg-cyan-400/10 ${RAIL}`}
            aria-hidden
          />
          {/* glowing animated fill — drawn on scroll */}
          <motion.div
            style={{ scaleY: drawProgress }}
            className={`absolute top-0 bottom-0 z-10 w-[2px] origin-top bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.8)] ${RAIL}`}
            aria-hidden
          />

          {milestones.map((m, i) => (
            <TimelineItem key={m.year + m.title} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
