import { Button } from '@/components/ui/button';
import { issuerHref } from '@/constants/urls';
import { Reveal } from '../motion/reveal';
import { PilotVisual } from './pilot-visual';
import { Counter } from '../motion/counter';

export function Pilot({ dict }: { dict: any }) {
  return (
    <section id="pilot" className="py-20 md:py-28 bg-black/20 border-y border-line relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal>
          <div className="bg-card/60 backdrop-blur-md border border-line rounded-[20px] overflow-hidden flex flex-col md:flex-row items-stretch">
            <div className="w-full md:w-1/2 min-h-[300px] flex items-center justify-center relative p-0">
              <PilotVisual />
            </div>
            <div className="w-full md:w-1/2 p-8 lg:p-12 z-20 bg-card/80">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-line text-[13px] font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-gold"></span> {dict.chip}
              </div>
              <h3 className="text-2xl font-display font-bold mb-6">{dict.title}</h3>
              
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 py-4 border-y border-line mb-8 sm:divide-x sm:divide-line">
                <div className="sm:pr-6 sm:w-1/3">
                  <div className="text-base font-bold text-white tabular-nums flex items-end gap-1">
                    <Counter to={1.284} decimals={3} /> MWh
                  </div>
                  <div className="text-[13px] text-mist">{dict.metric1Lbl}</div>
                </div>
                <div className="sm:px-6 sm:w-1/3">
                  <div className="text-base font-mono font-bold text-white">2026/01 – 2026/06</div>
                  <div className="text-[13px] text-mist">{dict.metric2Lbl}</div>
                </div>
                <div className="sm:pl-6 sm:w-1/3">
                  <div className="text-base font-mono font-bold text-white">0x9f…c41d <span className="text-[#22C55E]">✓</span></div>
                  <div className="text-[13px] text-mist">{dict.metric3Lbl}</div>
                </div>
              </div>
              
              <blockquote className="relative italic text-ice text-lg leading-relaxed mb-8 pl-10">
                <span className="absolute top-[-20px] left-[-10px] text-[80px] text-line font-serif font-black leading-none select-none">&quot;</span>
                <span className="relative z-10">{dict.quote}</span>
              </blockquote>
              
              <a href={issuerHref('/dashboard')}>
                <Button className="rounded-full bg-base hover:bg-base/90 text-white font-semibold px-6">{dict.cta}</Button>
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="text-center mt-4">
            <p className="text-xs text-mist">{dict.disclaimer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
