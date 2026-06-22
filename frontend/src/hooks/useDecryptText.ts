import { useEffect, useRef, useState, useCallback } from "react";

const CIPHER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>{}[]=/\\|~^";

export function useDecryptText(finalText: string, speed = 30, revealDelay = 3) {
  const [displayText, setDisplayText] = useState("");
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const startAnimation = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);

    let iteration = 0;
    const totalIterations = finalText.length * revealDelay;

    const interval = setInterval(() => {
      const revealedCount = Math.floor(iteration / revealDelay);

      const result = finalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealedCount) return finalText[index];
          return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
        })
        .join("");

      setDisplayText(result);
      iteration++;

      if (iteration > totalIterations) {
        clearInterval(interval);
        setDisplayText(finalText);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [finalText, speed, revealDelay, hasTriggered]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startAnimation]);

  return { displayText, elementRef };
}
