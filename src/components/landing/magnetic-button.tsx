"use client";
import { useRef, ReactNode, useEffect } from "react";
import { motion, useSpring } from "motion/react";
import { useReducedMotion } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  magneticRadius?: number;
  magneticForce?: number;
  as?: any;
  href?: string;
}

export function MagneticButton({
  children,
  className = "",
  magneticRadius = 80,
  magneticForce = 6,
  as: Component = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const x = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < magneticRadius) {
      x.set((distanceX / magneticRadius) * magneticForce);
      y.set((distanceY / magneticRadius) * magneticForce);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove as any);
    return () => window.removeEventListener("mousemove", handleMouseMove as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Component
      ref={ref}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      <motion.div
        style={{ x, y }}
        className="w-full h-full flex items-center justify-center pointer-events-none"
      >
        {children}
      </motion.div>
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none" />
    </Component>
  );
}
