import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth mouse tracking with Framer Motion for better performance
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Springs for smooth movement
  const springConfig = { damping: 25, stiffness: 800, mass: 0.05 };
  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);

  const ringSpringConfig = { damping: 25, stiffness: 600, mass: 0.15 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  // Spotlight config - slightly slower and smoother follow for the glow effect
  const spotlightConfig = { damping: 30, stiffness: 400, mass: 0.2 };
  const spotlightX = useSpring(mouseX, spotlightConfig);
  const spotlightY = useSpring(mouseY, spotlightConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Spotlight Glow Effect (Press/Illumination Effect) */}
      <motion.div
        className="fixed top-0 left-0 w-[40rem] h-[40rem] -ml-[20rem] -mt-[20rem] rounded-full pointer-events-none z-[1]"
        style={{
          x: spotlightX,
          y: spotlightY,
          background: 'radial-gradient(circle, hsla(185, 100%, 45%, 0.12) 0%, transparent 60%)',
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-primary/60 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'hsla(185, 100%, 45%, 0.15)' : 'transparent',
          borderColor: isHovering ? 'hsla(185, 100%, 45%, 0.2)' : 'hsla(185, 100%, 45%, 0.6)',
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
