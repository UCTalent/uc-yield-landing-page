"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 1200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { scrollYProgress } = useScroll();
  const dashoffset = useTransform(scrollYProgress, [0, 1], [100.53, 0]); // 2 * PI * 16 = 100.53
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-1 bg-card/80 backdrop-blur-md border border-line rounded-full text-mist hover:text-white shadow-lg transition-all group"
          aria-label="Back to top"
        >
          <div className="relative flex items-center justify-center w-10 h-10">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-20" />
              {!prefersReducedMotion && (
                <motion.circle 
                  cx="20" 
                  cy="20" 
                  r="16" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeDasharray="100.53"
                  style={{ strokeDashoffset: dashoffset }}
                  className="text-cyan transition-colors"
                />
              )}
            </svg>
            <ChevronUp className="w-5 h-5 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
