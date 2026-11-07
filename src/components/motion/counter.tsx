"use client";
import { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

export function Counter({ from = 0, to = 100, duration = 1.2, suffix = "", decimals = 0 }: { from?: number; to: number; duration?: number; suffix?: string; decimals?: number }) {
  // Start at the final value so SSR / no-JS readers never see the placeholder `from`.
  const [count, setCount] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(to);
      return;
    }

    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentValue = easeProgress * (to - from) + from;
        setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.floor(currentValue));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(to);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration, prefersReducedMotion, decimals]);

  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}</span>;
}
