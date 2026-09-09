"use client";

import { Check } from 'lucide-react';
import { issuerHref } from '@/constants/urls';
import { LedgerCard } from './ledger-card';
import { Stats } from './stats';
import { Reveal } from '../motion/reveal';
import { motion } from 'motion/react';
import { MagneticButton } from './magnetic-button';
import { ArrowRight } from 'lucide-react';

export function Hero({ dict }: { dict: any }) {
  return (
    <section id="top" className="relative min-h-[820px] pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center w-full py-12">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[55%_40%] gap-12 items-center relative z-10 w-full">
          <div className="order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Reveal delay={0}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-line text-[13px] font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] animate-pulse"></span>
              {dict.badgeLive} <span className="text-line">|</span> {dict.badgeVersion}
            </div>
          </Reveal>
          <h1 className="text-[40px] lg:text-[68px] font-bold font-display leading-[1.1] tracking-tight mb-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0 }} 
              className="inline-block"
            >
              {dict.h1Line1}
            </motion.span><br className="hidden lg:block"/>
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.12 }} 
              className="inline-block"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-base via-cyan to-base bg-[length:200%_auto] animate-[shimmer_6s_linear_infinite]">{dict.h1Highlight}</span>
            </motion.span><br/>
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.24 }} 
              className="inline-block"
            >
              {dict.h1Line2} <br className="block sm:hidden" /> {dict.h1Line3}
            </motion.span>
          </h1>
          <Reveal delay={0.2}>
            <p className="text-lg text-mist mb-8 max-w-[480px]">
              {dict.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto">
              <MagneticButton href={issuerHref('/dashboard')} as="a" className="w-full sm:w-auto rounded-full bg-gradient-to-r from-base to-cyan hover:opacity-90 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:outline-none text-white px-7 py-4 h-[56px] text-base font-semibold shadow-[0_8px_32px_rgba(0,82,255,0.45)] flex items-center justify-center gap-2 transition-all">
                {dict.ctaTry} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton href="#how-it-works" as="a" className="w-full sm:w-auto rounded-full px-7 py-4 h-[56px] text-base font-semibold border border-[#2A3F68] text-[#DCE6FF] hover:bg-white/5 hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:outline-none flex items-center justify-center transition-all">
                {dict.ctaHow}
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-4 text-[14px] text-mist justify-center lg:justify-start">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#22C55E]"/> {dict.trust1}</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#22C55E]"/> {dict.trust2}</span>
              {dict.trust3 && <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#22C55E]"/> {dict.trust3}</span>}
            </div>
          </Reveal>
        </div>
        
        <div className="order-2 w-[90%] lg:w-full mx-auto relative perspective-[1000px]">
          <LedgerCard dict={dict} />
        </div>
      </div>
      </div>
      
      <Stats dict={dict} />
    </section>
  );
}
