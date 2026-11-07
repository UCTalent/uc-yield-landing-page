"use client";
import { useEffect, useState, useRef } from 'react';
import { Database, Zap, Shield, Search } from 'lucide-react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, useReducedMotion } from 'motion/react';
import { Reveal } from '../motion/reveal';

const simulatedData = [
  { id: 1, name: 'CAS-SOLAR', period: '2026/01-06', hash: '0x9f…c41d', status: 'Verified ✓', color: 'text-cyan', bg: 'bg-cyan/10' },
  { id: 2, name: 'CAS-SOLAR', period: '2025/07-12', hash: '0x3a…b29f', status: 'Verified ✓', color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10' },
  { id: 3, name: 'CAS-SOLAR', period: '2026/07', hash: '0x1c…d88e', status: 'Pending ⏳', color: 'text-gold', bg: 'bg-gold/10' },
  { id: 4, name: 'CAS-SOLAR', period: '2026/07-12', hash: '0xe2…44a1', status: 'Verified ✓', color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10' },
  { id: 5, name: 'CAS-SOLAR', period: '2026/08', hash: '0x7b…11c2', status: 'Pending ⏳', color: 'text-gold', bg: 'bg-gold/10' },
];

export function LedgerCard({ dict }: { dict: any }) {
  const [feed, setFeed] = useState(simulatedData.slice(0, 3));
  const [block, setBlock] = useState(21448903);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  
  const bgTransform = useTransform(
    () => `radial-gradient(400px circle at ${((x.get() + 0.5) * 100)}% ${((y.get() + 0.5) * 100)}%, rgba(255,255,255,0.1), transparent 40%)`
  );

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0 });
    
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    let interval: NodeJS.Timeout;
    
    const startInterval = () => {
      interval = setInterval(() => {
        if (document.hidden) return;
        setFeed(prev => {
          const nextId = (prev[0].id % 5) + 1;
          const newItem = simulatedData.find(d => d.id === nextId) || simulatedData[0];
          return [newItem, prev[0], prev[1]];
        });
        setBlock(prev => prev + Math.floor(Math.random() * 3));
        setPulse(true);
        setTimeout(() => setPulse(false), 400);
      }, 4000);
    };

    startInterval();
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        startInterval();
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isInView]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Reveal delay={0.5}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-full relative"
      >
        <div className={`glass-card rounded-[20px] p-5 relative z-20 animate-float flex flex-col gap-4 overflow-hidden group transition-all duration-400 ${pulse ? '!border-cyan shadow-[0_0_15px_rgba(0,212,255,0.3)]' : ''}`}>
          <motion.div 
            className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[20px]"
            style={{ background: bgTransform }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_linear_infinite] pointer-events-none" style={{ backgroundSize: '200% 100%' }}></div>
          
          <div className="flex justify-between items-center pb-3 border-b border-line relative z-10" style={{ transform: "translateZ(30px)" }}>
            <div className="font-display font-semibold text-ice">{dict.ledgerTitle || 'Shadow Ledger'}</div>
          <div className="text-[10px] font-mono flex items-center gap-1.5 px-2 py-1 bg-abyss rounded border border-line text-mist">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></span>
            Base Sepolia
          </div>
        </div>

        <div className="flex flex-col relative z-10 min-h-[160px]" style={{ transform: "translateZ(20px)" }}>
          <AnimatePresence initial={false}>
            {feed.map((item, i) => (
              <motion.div
                key={item.id + '-' + i}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`flex items-center gap-3 py-3 border-b border-line font-mono text-[13px] ${i === 2 ? 'border-b-0' : ''}`}
              >
                {item.status.includes('OracleVerified') ? <Shield className="w-4 h-4 text-cyan shrink-0"/> : item.status.includes('Verified') ? <Zap className="w-4 h-4 text-gold shrink-0"/> : <Database className="w-4 h-4 text-gold shrink-0"/>}
                <span className="truncate w-20 text-ice">{item.name}</span>
                <span className="text-mist truncate w-20 hidden sm:block">{item.period}</span>
                <span className="text-ice">{item.hash}</span>
                <span className={`ml-auto px-2.5 py-1 ${item.bg} ${item.color} rounded-full text-[10px] font-semibold whitespace-nowrap`}>{item.status}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="pt-3 border-t border-line flex justify-between items-center relative z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan" />
            <div className="text-xs font-mono text-mist">Block <span className="text-cyan font-bold">#{block.toLocaleString()}</span></div>
          </div>
          <a href="https://sepolia.basescan.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-mist hover:text-white transition-colors">
            <Search className="w-3 h-3" /> View Explorer
          </a>
        </div>
      </div>
      
      <div className="absolute -top-3 right-0 lg:-top-5 lg:-right-5 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg font-mono text-[11px] lg:text-sm z-30 animate-float-alt text-ice" style={{ transform: "translateZ(50px)" }}>keccak256</div>
      <div className="absolute bottom-1/3 left-0 lg:-left-8 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg font-mono text-[11px] lg:text-sm z-30 animate-float-alt text-ice" style={{ animationDirection: 'reverse', transform: "translateZ(50px)" }}>Merkle root</div>
      </motion.div>
    </Reveal>
  );
}
