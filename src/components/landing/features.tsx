import { Layers, Fingerprint, KeyRound, Puzzle } from 'lucide-react';
import { Reveal } from '../motion/reveal';
import { MerkleMini } from './merkle-mini';
import { SpotlightCard } from './spotlight-card';
import { SectionHeading } from './section-heading';

export function Features({ dict }: { dict: any }) {
  return (
    <section id="features" className="py-20 md:py-28 bg-black/20 border-y border-line relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading 
          eyebrow="Core Features"
          title={dict.title}
          subtitle={dict.subtitle}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal delay={0.1}>
            <SpotlightCard className="p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-5"><Layers className="w-6 h-6" /></div>
              <h3 className="text-xl font-display font-bold mb-3">{dict.f1Title}</h3>
              <p className="text-mist mb-4">{dict.f1Desc}</p>
              <div className="mt-auto mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-lg">
                <video
                  src="https://storage.googleapis.com/unchain-web/ucyield/2aOboQymxLWbzd4ABnhHnIqCGVO9vQ4BdrryKGQq.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-auto block rounded-xl"
                />
              </div>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.2}>
            <SpotlightCard className="p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-5"><Fingerprint className="w-6 h-6" /></div>
              <h3 className="text-xl font-display font-bold mb-3">{dict.f2Title}</h3>
              <p className="text-mist mb-4">{dict.f2Desc}</p>
              <div className="mt-auto pt-4">
                <MerkleMini />
              </div>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.3}>
            <SpotlightCard className="p-8 h-full">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-5"><KeyRound className="w-6 h-6" /></div>
              <h3 className="text-xl font-display font-bold mb-3">{dict.f3Title}</h3>
              <p className="text-mist">{dict.f3Desc}</p>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.4}>
            <SpotlightCard className="p-8 h-full">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-5"><Puzzle className="w-6 h-6" /></div>
              <h3 className="text-xl font-display font-bold mb-3">{dict.f4Title}</h3>
              <p className="text-mist">{dict.f4Desc}</p>
            </SpotlightCard>
          </Reveal>
        </div>
        
        <Reveal delay={0.5}>
          <div className="mt-8 p-4 bg-white/5 border border-dashed border-line rounded-xl text-center">
            <span className="text-mist">{dict.banner}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
