"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, ShieldCheck, Zap, Radio, Check } from 'lucide-react';

export function HashFlow() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const tooltips = [
    "Raw yield data files",
    "Hashing using keccak256",
    "Final Merkle Root",
    "Committed to Base L2"
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card/60 backdrop-blur-md border border-line rounded-[20px] w-full max-w-4xl mx-auto my-8 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-base/5 via-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      <div className="flex flex-col md:flex-row justify-between w-full relative z-10 gap-8 md:gap-0">
        
        {/* Step 1 */}
        <div className="flex flex-col gap-4 relative" onMouseEnter={() => setActiveTooltip(0)} onMouseLeave={() => setActiveTooltip(null)}>
          {[1, 2, 3].map((i) => (
            <button key={i} className="flex items-center gap-3 p-3 bg-abyss border border-line rounded-lg hover:border-cyan hover:shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-all cursor-pointer text-left">
              <Database className="w-4 h-4 text-mist shrink-0" />
              <div className="font-mono text-xs text-ice">yield_data_0{i}.csv</div>
            </button>
          ))}
          <AnimatePresence>
            {activeTooltip === 0 && (
              <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded text-xs whitespace-nowrap z-20 shadow-xl">
                {tooltips[0]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Step 2 */}
        <div className="flex flex-col justify-center items-center relative" onMouseEnter={() => setActiveTooltip(1)} onMouseLeave={() => setActiveTooltip(null)}>
          <svg className="hidden md:block absolute left-[-60px] top-1/2 -translate-y-1/2 w-[60px] h-[120px] pointer-events-none" viewBox="0 0 60 120">
            <path id="path1" d="M0,20 C30,20 30,60 60,60" fill="none" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
            <path id="path2" d="M0,60 C30,60 30,60 60,60" fill="none" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
            <path id="path3" d="M0,100 C30,100 30,60 60,60" fill="none" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
            
            <circle r="2" fill="var(--color-cyan)">
              <animateMotion dur="2s" repeatCount="indefinite">
                <mpath href="#path1" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--color-cyan)">
              <animateMotion dur="2s" repeatCount="indefinite">
                <mpath href="#path2" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--color-cyan)">
              <animateMotion dur="2s" repeatCount="indefinite">
                <mpath href="#path3" />
              </animateMotion>
            </circle>
          </svg>
          
          <button className="w-16 h-16 rounded-2xl bg-gradient-to-br from-base to-cyan p-[1px] relative cursor-pointer">
            <div className="w-full h-full bg-abyss rounded-2xl flex flex-col items-center justify-center relative hover:bg-abyss/80 transition-colors">
              <Zap className="w-6 h-6 text-cyan mb-1" />
              <span className="text-[9px] font-mono font-bold text-ice">keccak256</span>
            </div>
            <AnimatePresence>
              {activeTooltip === 1 && (
                <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded text-xs whitespace-nowrap z-20 shadow-xl">
                  {tooltips[1]}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col justify-center items-center relative" onMouseEnter={() => setActiveTooltip(2)} onMouseLeave={() => setActiveTooltip(null)}>
          <svg className="hidden md:block absolute left-[-60px] top-1/2 -translate-y-1/2 w-[60px] h-[20px] pointer-events-none" viewBox="0 0 60 20">
            <path id="path4" d="M0,10 L60,10" fill="none" stroke="var(--color-cyan)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow opacity-50" />
            <circle r="3" fill="var(--color-cyan)">
              <animateMotion dur="2s" repeatCount="indefinite">
                <mpath href="#path4" />
              </animateMotion>
            </circle>
          </svg>
          
          <button className="p-4 bg-abyss border border-cyan/50 rounded-xl shadow-[0_0_24px_rgba(0,212,255,0.15)] flex flex-col items-center relative cursor-pointer hover:border-cyan transition-colors">
            <ShieldCheck className="w-8 h-8 text-cyan mb-2" />
            <div className="font-mono text-sm text-ice font-bold border-b border-line pb-2 mb-2 w-full text-center">Merkle Root</div>
            <div className="font-mono text-xs text-mist bg-black/20 p-2 rounded w-full text-center">0x9f3a...c41d</div>
            <AnimatePresence>
              {activeTooltip === 2 && (
                <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded text-xs whitespace-nowrap z-20 shadow-xl">
                  {tooltips[2]}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col justify-center items-center relative" onMouseEnter={() => setActiveTooltip(3)} onMouseLeave={() => setActiveTooltip(null)}>
          <svg className="hidden md:block absolute left-[-60px] top-1/2 -translate-y-1/2 w-[60px] h-[20px] pointer-events-none" viewBox="0 0 60 20">
            <path id="path5" d="M0,10 L60,10" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash-flow_3s_linear_infinite] opacity-50" />
            <circle r="3" fill="var(--color-gold)">
              <animateMotion dur="2s" repeatCount="indefinite">
                <mpath href="#path5" />
              </animateMotion>
            </circle>
          </svg>
          
          <button className="p-4 bg-abyss border border-gold/50 rounded-xl shadow-[0_0_24px_rgba(255,197,49,0.15)] flex flex-col items-center relative cursor-pointer hover:border-gold transition-colors group">
            <Radio className="w-8 h-8 text-gold mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-mono text-sm text-ice font-bold border-b border-line pb-2 mb-2 w-full text-center">OracleConsumer</div>
            <div className="font-mono text-xs text-gold bg-gold/10 border border-gold/20 p-2 rounded w-full text-center flex items-center justify-center gap-1 transition-colors group-hover:bg-gold/20"><Check className="w-3 h-3"/> OracleVerified</div>
            <AnimatePresence>
              {activeTooltip === 3 && (
                <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded text-xs whitespace-nowrap z-20 shadow-xl">
                  {tooltips[3]}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

      </div>
    </div>
  );
}
