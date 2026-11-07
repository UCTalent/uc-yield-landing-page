"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudUpload, ShieldCheck, CheckCircle, Play, Lock } from 'lucide-react';
import { Reveal } from '../motion/reveal';

const LOG_SCRIPT = [
  { step: 1, time: 500, text: "[RELAYER] Preparing data payload (Hash: 0x9f...c41d)" },
  { step: 1, time: 1500, text: "[ON-CHAIN] Transmitting transaction to Base Sepolia..." },
  { step: 2, time: 2500, text: "[INDEXER] RecordCommitted #20 finalized." },
  { step: 2, time: 3500, text: "[VERIFIER] Recomputing root from source data..." },
  { step: 2, time: 4800, text: "[VERIFIER] Root matches on-chain recordRoot. Receipt signed." },
  { step: 3, time: 6000, text: "[SHADOW-LEDGER] markVerified(id, root, receiptHash)..." },
  { step: 3, time: 7500, text: "[SUCCESS] Status: Verified (simulated run, no real tx)." },
];

export function CommitFlowDemo({ dict }: { dict?: any }) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  // Auto scroll logs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setStep(1);
    setLogs([]);

    let maxTime = 0;
    
    LOG_SCRIPT.forEach((log) => {
      if (log.time > maxTime) maxTime = log.time;
      setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'})}] ${log.text}`]);
        if (log.step > step) {
          setStep(log.step as 1 | 2 | 3);
        }
      }, log.time);
    });

    setTimeout(() => {
      setIsRunning(false);
    }, maxTime + 2000);
  };

  return (
    <div className="w-full flex flex-col gap-8 relative mt-12 mb-12">
      {/* Simulation Controls */}
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-2">Commit &amp; verify simulation</h3>
          <p className="text-sm text-mist max-w-lg">A scripted walkthrough of the Phase 1 flow: commit on Base Sepolia, then UCYield recomputes and marks the record Verified.</p>
        </div>
        <button 
          onClick={runSimulation}
          disabled={isRunning}
          className={`px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
            isRunning ? 'bg-white/10 text-mist cursor-not-allowed' : 'bg-cyan text-abyss hover:bg-cyan/90 shadow-[0_0_20px_rgba(0,212,255,0.3)]'
          }`}
        >
          {isRunning ? (
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan animate-pulse"></span> Running...</span>
          ) : (
            <><Play className="w-4 h-4" /> Run Simulation</>
          )}
        </button>
      </div>

      {/* Nodes Pipeline */}
      <div className="relative bg-card/40 border border-line rounded-2xl p-8 md:p-12 backdrop-blur-md overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-30"></div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0 z-10">
          
          {/* Connector Lines (Desktop) */}
          <div className="hidden md:flex absolute top-[40px] left-[15%] right-[15%] h-[2px] -translate-y-1/2 z-0 justify-between">
            {/* Step 1 to 2 */}
            <div className="relative h-full w-[calc(50%-48px)] bg-line">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-cyan shadow-[0_0_10px_#00D4FF]"
                initial={{ width: "0%" }}
                animate={{ width: step >= 2 ? "100%" : "0%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
            {/* Step 2 to 3 */}
            <div className="relative h-full w-[calc(50%-48px)] bg-line">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-[#22C55E] shadow-[0_0_10px_#22C55E]"
                initial={{ width: "0%" }}
                animate={{ width: step >= 3 ? "100%" : "0%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Node 1: Commit */}
          <div className="relative z-10 flex flex-col items-center w-full md:w-auto">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 mb-4 ${
              step >= 1 ? 'bg-cyan/10 border-cyan text-cyan shadow-[0_0_30px_rgba(0,212,255,0.2)]' : 'bg-base/50 border-line text-mist'
            }`}>
              <CloudUpload className="w-8 h-8" />
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 bg-cyan text-abyss text-[10px] font-bold px-2 py-0.5 rounded-full"
                >
                  Active
                </motion.div>
              )}
            </div>
            <h4 className="font-display font-bold text-ice">{dict?.step1Title || "Data Commit"}</h4>
            <p className="text-xs text-mist text-center mt-1">Canonicalize + hash</p>
          </div>

          {/* Node 2: Commit */}
          <div className="relative z-10 flex flex-col items-center w-full md:w-auto">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 mb-4 ${
              step === 2 ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E] shadow-[0_0_30px_rgba(34,197,94,0.2)]' : 
              step > 2 ? 'bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]' : 'bg-base/50 border-line text-mist'
            }`}>
              <ShieldCheck className="w-8 h-8" />
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[#22C55E] text-abyss text-[10px] font-bold px-2 py-0.5 rounded-full"
                >
                  On-chain
                </motion.div>
              )}
            </div>
            <h4 className="font-display font-bold text-ice">{dict?.step2Title || "Commit"}</h4>
            <p className="text-xs text-mist text-center mt-1">commitBatch on Base Sepolia</p>
          </div>

          {/* Node 3: Underwrite */}
          <div className="relative z-10 flex flex-col items-center w-full md:w-auto">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 mb-4 ${
              step === 3 ? 'bg-gold/10 border-gold text-gold shadow-[0_0_30px_rgba(250,204,21,0.2)]' : 'bg-base/50 border-line text-mist'
            }`}>
              <CheckCircle className="w-8 h-8" />
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gold text-abyss text-[10px] font-bold px-2 py-0.5 rounded-full"
                >
                  Done
                </motion.div>
              )}
            </div>
            <h4 className="font-display font-bold text-ice">{dict?.step3Title || "Verify"}</h4>
            <p className="text-xs text-mist text-center mt-1">Recompute + markVerified</p>
          </div>

        </div>
      </div>

      {/* Terminal Window */}
      <Reveal delay={0.2}>
        <div className="bg-black/80 border border-line rounded-xl overflow-hidden shadow-2xl backdrop-blur-lg">
          <div className="flex items-center px-4 py-3 bg-white/5 border-b border-line gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]/80"></div>
              <div className="w-3 h-3 rounded-full bg-[#EAB308]/80"></div>
              <div className="w-3 h-3 rounded-full bg-[#22C55E]/80"></div>
            </div>
            <div className="ml-4 flex items-center gap-2 font-mono text-[11px] text-mist">
              <Lock className="w-3 h-3" /> Blockchain Verification Terminal
            </div>
            <div className="ml-auto flex items-center gap-2">
               {isRunning && <span className="text-[10px] font-mono text-cyan animate-pulse">● SIMULATION</span>}
            </div>
          </div>
          <div ref={scrollContainerRef} className="p-4 font-mono text-[13px] h-[180px] overflow-y-auto leading-relaxed scroll-smooth">
            {logs.length === 0 && !isRunning && (
              <div className="text-mist/50 h-full flex items-center justify-center italic">
                Waiting for simulation to start...
              </div>
            )}
            <AnimatePresence>
              {logs.map((log, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-1"
                >
                  <span className="text-mist">{log.substring(0, 10)}</span>
                  <span className={
                    log.includes('[SUCCESS]') || log.includes('VERIFIED') ? 'text-[#22C55E]' :
                    log.includes('[INDEXER]') || log.includes('[VERIFIER]') ? 'text-cyan' :
                    log.includes('[RELAYER]') ? 'text-gold' : 'text-ice'
                  }>
                    {log.substring(10)}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
