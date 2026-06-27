import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, Plus, X, User, Briefcase, Mail, Phone } from "lucide-react";

/* ─────────────────────────── Review Card ─────────────────────────── */
const ReviewCard = ({ review }: { review: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springCfg = { stiffness: 300, damping: 25, mass: 0.5 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), springCfg);
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [rawX, rawY, glowX, glowY]);

  const handleMouseEnter = () => scale.set(1.02);
  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    glowX.set(50);
    glowY.set(50);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="w-[350px] sm:w-[400px] shrink-0 bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 rounded-3xl p-8 transition-all duration-300 relative group [perspective:1000px]"
    >
      
      <div className="relative z-10 [transform:translateZ(20px)]">
        {/* Header Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {/* Simple circular avatar */}
            <div className="w-14 h-14 rounded-full bg-cyan-950/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-xl border border-cyan-500/20 shrink-0">
              {review.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-bold tracking-wide text-lg">
                {review.author}
              </h4>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 tracking-wider font-semibold">
                {review.role}
              </p>
            </div>
          </div>

          {/* Stars aligned to the right */}
          <div className="flex items-center gap-1 shrink-0">
            {[...Array(5)].map((_: unknown, i: number) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? "fill-cyan-400 text-cyan-400" : "fill-gray-700 text-gray-700"}`}
              />
            ))}
          </div>
        </div>

        {/* Review content */}
        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed font-medium">
          {review.text}
        </p>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────── Star Rater ─────────────────────────── */
const StarRater = ({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (r: number) => void;
}) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-white/60 font-medium">
        How would you rate your experience?
      </p>
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= (hovered || rating);
          return (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => onChange(star)}
              className="focus:outline-none transition-colors"
            >
              <Star
                className={`w-10 h-10 transition-all duration-150 ${
                  active
                    ? "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                    : "fill-white/10 text-white/20"
                }`}
              />
            </motion.button>
          );
        })}
      </div>
      <p className="text-xs text-white/40">
        {hovered || rating
          ? ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][hovered || rating]
          : "Tap a star to rate"}
      </p>
    </div>
  );
};

/* ─────────────────────────── Input Field ─────────────────────────── */
const InputField = ({
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ElementType;
}) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
      <Icon className="w-4 h-4" />
    </span>
    <input
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all duration-200"
    />
  </div>
);

/* ─────────────────────────── Success Screen ─────────────────────────── */
const SuccessScreen = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-12 gap-4"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", delay: 0.1 }}
      className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center"
    >
      <Star className="w-10 h-10 fill-cyan-400 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
    </motion.div>
    <h4 className="text-2xl font-bold text-white">Thank You!</h4>
    <p className="text-white/50 text-center text-sm max-w-xs">
      Your review has been submitted and is under review. We appreciate your feedback!
    </p>
  </motion.div>
);

/* ─────────────────────────── Modal ─────────────────────────── */
const ReviewModal = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [form, setForm] = useState({
    text: "",
    author: "",
    role: "",
    email: "",
    phone: "",
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rating) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        onSuccess();
        setTimeout(onClose, 2800);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      style={{ 
        background: "rgba(5,10,18,0.75)", 
        backdropFilter: "blur(12px)", 
        WebkitBackdropFilter: "blur(12px)" 
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
        style={{
          background: "linear-gradient(145deg, #0d1520 0%, #0a1018 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Glow accent */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 p-8">
          {submitted ? (
            <SuccessScreen />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Stars */}
              <StarRater
                rating={form.rating}
                onChange={(r) => setForm((f) => ({ ...f, rating: r }))}
              />

              {/* Divider */}
              <div className="h-px bg-white/5 my-1" />

              {/* Text area — label inside the border box */}
              <div className="relative bg-white/5 border border-white/10 rounded-2xl px-4 pt-4 pb-3 focus-within:border-cyan-500/60 transition-all duration-200">
                <p className="text-sm font-semibold text-white/70 mb-2">
                  Tell us more about your experience
                </p>
                <textarea
                  placeholder="What did you like or dislike?"
                  value={form.text}
                  onChange={set("text")}
                  maxLength={500}
                  rows={4}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none resize-none"
                />
                <span className="block text-right text-xs text-white/25 mt-1">
                  {form.text.length}/500
                </span>
              </div>

              {/* Name */}
              <InputField
                icon={User}
                type="text"
                placeholder="Your Name*"
                required
                value={form.author}
                onChange={set("author")}
              />

              {/* Role & Company */}
              <InputField
                icon={Briefcase}
                type="text"
                placeholder="Your Role & Company (e.g. CTO, Acme Corp)"
                required
                value={form.role}
                onChange={set("role")}
              />

              {/* Email */}
              <InputField
                icon={Mail}
                type="email"
                placeholder="Your Email (Optional)"
                value={form.email}
                onChange={set("email")}
              />

              {/* Phone */}
              <InputField
                icon={Phone}
                type="tel"
                placeholder="Your Phone Number (Optional)"
                value={form.phone}
                onChange={set("phone")}
              />

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !form.rating || !form.author || !form.role}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                  boxShadow: "0 0 24px rgba(6,182,212,0.35)",
                  color: "#fff",
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Submitting…
                  </span>
                ) : (
                  "Submit Review"
                )}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

/* ─────────────────────────── Main Export ─────────────────────────── */
export const ReviewCarousel = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = () => {
    fetch("http://localhost:3001/api/reviews")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setReviews(data); })
      .catch(() => {});
  };

  useEffect(() => { fetchReviews(); }, []);

  const useScrolling = reviews.length >= 4;

  return (
    <>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-grid-slate-100 dark:bg-grid-white/[0.02] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-background to-transparent z-10 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1440px] relative z-10 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4 leading-[1.2] tracking-tight">
                Trusted By Industry Leaders
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                See what our clients say about our enterprise-grade cybersecurity solutions.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-full transition-colors shrink-0 text-white"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                boxShadow: "0 0 18px rgba(6,182,212,0.3)",
              }}
            >
              <Plus className="w-4 h-4" /> Add Review
            </motion.button>
          </div>
        </div>

        {reviews.length === 0 ? (
          /* Empty state — still show Add Review CTA prominently */
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex flex-col items-center gap-3 px-12 py-8 rounded-3xl border border-dashed border-cyan-500/30 text-white/40 hover:text-cyan-400 hover:border-cyan-500/60 transition-all duration-300"
            >
              <Star className="w-10 h-10 fill-cyan-500/20 text-cyan-500/40" />
              <span className="text-sm font-semibold">Be the first to leave a review</span>
            </motion.button>
          </div>
        ) : useScrolling ? (
          <div className="flex overflow-hidden relative w-full">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 55 }}
              className="flex gap-12 px-4 w-max"
              style={{ willChange: "transform" }}
            >
              {[...reviews, ...reviews].map((review, idx) => (
                <ReviewCard key={`${review.id}-${idx}`} review={review} />
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="flex justify-center gap-12 px-4 flex-wrap">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <ReviewModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={fetchReviews}
          />
        )}
      </AnimatePresence>
    </>
  );
};
