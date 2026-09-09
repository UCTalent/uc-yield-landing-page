import { CloudUpload, SquarePen, ShieldCheck, Check } from 'lucide-react';
import { Reveal } from '../motion/reveal';
import { HashFlow } from './hash-flow';
import { SpotlightCard } from './spotlight-card';
import { SectionHeading } from './section-heading';

export function HowItWorks({ dict }: { dict: any }) {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading 
          eyebrow="Workflow"
          title={dict.title}
          subtitle={dict.subtitle}
        />
        
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] -translate-y-1/2 overflow-hidden z-0">
            <div className="w-full h-full border-t-2 border-dashed border-line"></div>
            <div className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent animate-[flow-x_3s_linear_infinite]"></div>
          </div>

          <Reveal delay={0.1} className="flex-1 z-10">
            <SpotlightCard className="h-full p-7 bg-card/60 backdrop-blur-sm">
              <div className="absolute top-4 right-6 font-mono text-5xl font-bold opacity-5">01</div>
              <div className="w-12 h-12 rounded-xl bg-base/10 border border-base/30 text-cyan flex items-center justify-center mb-6 shadow-[0_0_16px_rgba(0,212,255,0.2)]">
                <CloudUpload className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{dict.step1Title}</h3>
              <p className="text-[15px] text-mist leading-relaxed">{dict.step1Desc}</p>
              <div className="mt-6 bg-black/20 border border-line rounded-lg p-3">
                <div className="h-1 bg-abyss-2 rounded-full overflow-hidden"><div className="w-[60%] h-full bg-cyan"></div></div>
                <div className="font-mono text-[13px] text-cyan mt-2">0x9f...c41d</div>
              </div>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.2} className="flex-1 z-10">
            <SpotlightCard className="h-full p-7 bg-card/60 backdrop-blur-sm">
              <div className="absolute top-4 right-6 font-mono text-5xl font-bold opacity-5">02</div>
              <div className="w-12 h-12 rounded-xl bg-base/10 border border-base/30 text-cyan flex items-center justify-center mb-6 shadow-[0_0_16px_rgba(0,212,255,0.2)]">
                <SquarePen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{dict.step2Title}</h3>
              <p className="text-[15px] text-mist leading-relaxed">{dict.step2Desc}</p>
              <div className="mt-6 bg-black/20 border border-line rounded-lg p-3 flex items-center">
                <button className="bg-base text-white px-3 py-1 rounded text-xs font-semibold">Sign</button>
                <span className="ml-2 px-2.5 py-1 bg-[#22C55E]/10 text-[#22C55E] rounded-full text-xs font-semibold">Block confirmed</span>
              </div>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.3} className="flex-1 z-10">
            <SpotlightCard className="h-full p-7 bg-card/60 backdrop-blur-sm">
              <div className="absolute top-4 right-6 font-mono text-5xl font-bold opacity-5">03</div>
              <div className="w-12 h-12 rounded-xl bg-base/10 border border-base/30 text-cyan flex items-center justify-center mb-6 shadow-[0_0_16px_rgba(0,212,255,0.2)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{dict.step3Title}</h3>
              <p className="text-[15px] text-mist leading-relaxed">{dict.step3Desc}</p>
              <div className="mt-6 bg-black/20 border border-line rounded-lg p-3">
                <span className="text-cyan flex items-center text-sm font-semibold font-mono"><Check className="w-4 h-4 mr-2"/> OracleVerified</span>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
        
        <Reveal delay={0.4}>
          <div className="mt-20">
            <h3 className="text-2xl font-display font-bold text-center mb-8 text-white">Data Hashing Pipeline</h3>
            <HashFlow />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
