"use client";
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from 'motion/react';

export function MerkleMini() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const leaves = ['hash(A)', 'hash(B)', 'hash(C)', 'hash(D)'];
  const midNodes = ['hash(A+B)', 'hash(C+D)'];
  const root = 'Merkle Root';

  useEffect(() => {
    if (prefersReducedMotion || isHovering) return;
    
    let step = 0;
    const interval = setInterval(() => {
      const sequence = [0, 1, 2, null];
      setHoveredNode(sequence[step]);
      step = (step + 1) % sequence.length;
    }, 1500); // 6s total for 4 steps
    
    return () => clearInterval(interval);
  }, [isHovering, prefersReducedMotion]);

  return (
    <div 
      className="bg-abyss border border-line rounded-[20px] p-8 w-full max-w-md mx-auto relative mt-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="text-center font-display font-semibold text-ice mb-8">Merkle Tree Structure</div>
      
      <div className="flex flex-col items-center gap-8 relative z-10 w-full">
        {/* Root */}
        <motion.div 
          onHoverStart={() => setHoveredNode(0)}
          onHoverEnd={() => setHoveredNode(null)}
          className={`px-6 py-3 rounded-xl border ${hoveredNode !== null ? 'border-cyan bg-cyan/10' : 'border-line bg-card'} font-mono text-sm transition-all cursor-pointer z-10`}
        >
          {root}
        </motion.div>

        {/* Connecting Lines Level 1 */}
        <div className="absolute top-[44px] w-full h-[40px] pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M50,0 L25,100" fill="none" stroke={hoveredNode === 1 || hoveredNode === 0 ? "var(--color-cyan)" : "var(--color-line)"} strokeWidth="2" />
            <path d="M50,0 L75,100" fill="none" stroke={hoveredNode === 2 || hoveredNode === 0 ? "var(--color-cyan)" : "var(--color-line)"} strokeWidth="2" />
          </svg>
        </div>

        {/* Middle Nodes */}
        <div className="flex justify-around w-[80%] z-10">
          {midNodes.map((node, i) => (
            <motion.div 
              key={i}
              onHoverStart={() => setHoveredNode(i + 1)}
              onHoverEnd={() => setHoveredNode(null)}
              className={`px-4 py-2 rounded-lg border ${hoveredNode === i + 1 || hoveredNode === 0 ? 'border-cyan bg-cyan/10' : 'border-line bg-card'} font-mono text-xs transition-all cursor-pointer`}
            >
              {node}
            </motion.div>
          ))}
        </div>

        {/* Connecting Lines Level 2 */}
        <div className="absolute top-[124px] w-[80%] h-[40px] pointer-events-none left-[10%]">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M20,0 L5,100" fill="none" stroke={hoveredNode === 1 || hoveredNode === 0 ? "var(--color-cyan)" : "var(--color-line)"} strokeWidth="2" />
            <path d="M20,0 L35,100" fill="none" stroke={hoveredNode === 1 || hoveredNode === 0 ? "var(--color-cyan)" : "var(--color-line)"} strokeWidth="2" />
            <path d="M80,0 L65,100" fill="none" stroke={hoveredNode === 2 || hoveredNode === 0 ? "var(--color-cyan)" : "var(--color-line)"} strokeWidth="2" />
            <path d="M80,0 L95,100" fill="none" stroke={hoveredNode === 2 || hoveredNode === 0 ? "var(--color-cyan)" : "var(--color-line)"} strokeWidth="2" />
          </svg>
        </div>

        {/* Leaves */}
        <div className="flex justify-between w-full z-10">
          {leaves.map((leaf, i) => (
            <motion.div 
              key={i}
              className={`px-3 py-2 rounded border ${
                (hoveredNode === 1 && i < 2) || (hoveredNode === 2 && i >= 2) || hoveredNode === 0
                  ? 'border-base bg-base/10 text-cyan' 
                  : 'border-line bg-card/50 text-mist'
              } font-mono text-[10px] transition-all cursor-default text-center w-[22%]`}
            >
              {leaf}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
