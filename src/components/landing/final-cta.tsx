import { issuerHref } from '@/constants/urls';
import { Reveal } from '../motion/reveal';
import { MagneticButton } from './magnetic-button';
import { ArrowRight, Check } from 'lucide-react';

export function FinalCTA({ dict }: { dict: any }) {
  return (
    <section id="cta" className="py-24 md:py-32 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal>
          <div className="bg-gradient-to-br from-base to-cyan rounded-[28px] p-10 lg:p-16 text-center relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute inset-0 bg-abyss opacity-10"></div>

            
            {/* Grid */}
            <div className="absolute inset-0" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M100 0L0 100M0 0l100 100\" stroke=\"rgba(255,255,255,0.06)\" stroke-width=\"1\" fill=\"none\"/></svg>')" }}></div>
            
            {/* Orbs */}
            <div className="absolute top-[-10%] left-[10%] w-32 h-32 bg-white/20 blur-3xl rounded-full animate-float"></div>
            <div className="absolute bottom-[-10%] right-[10%] w-40 h-40 bg-white/20 blur-3xl rounded-full animate-float-alt"></div>

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-white text-[32px] lg:text-[44px] font-bold font-display mb-4">{dict.title}</h2>
              <p className="text-white/90 text-lg mb-2 max-w-xl mx-auto">{dict.subtitle}</p>
              {dict.subline && <p className="text-white text-md font-medium mb-10 max-w-xl mx-auto flex items-center justify-center gap-2"><Check className="w-5 h-5 text-cyan"/> {dict.subline}</p>}
              <MagneticButton href={issuerHref('/dashboard')} as="a" className="rounded-full bg-white text-base text-abyss font-semibold px-8 py-4 h-[56px] shadow-[0_8px_32px_rgba(255,255,255,0.25)] flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                {dict.btn} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-white/80 text-sm font-medium">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-white"/> Testnet Free</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-white"/> No Custody</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-white"/> 3 Minutes Setup</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
