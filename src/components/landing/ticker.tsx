import { Marquee } from '../motion/marquee';

export function Ticker() {
  return (
    <section className="py-6 overflow-hidden flex flex-col gap-4 border-b border-line mask-fade-x group relative z-10">
      <div className="w-full group">
        <Marquee duration={40} className="py-2 group-hover:[animation-play-state:paused]">
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-cyan transition-colors cursor-default">RecordCommitted · CAS-SOLAR · 0x9f…c41d · <span className="text-[#22C55E]">✓</span></span>
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-gold transition-colors cursor-default">RecordVerified · CAS-SOLAR · #12 · <span className="text-cyan">✓</span></span>
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-cyan transition-colors cursor-default">RecordCommitted · CAS-SOLAR · 0x1c…d88e · <span className="text-[#22C55E]">✓</span></span>
        </Marquee>
      </div>
      <div className="w-full group">
        <Marquee duration={40} reverse className="py-2 group-hover:[animation-play-state:paused]">
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-cyan transition-colors cursor-default">RecordCommitted · CAS-SOLAR · 0x1c…d88e · <span className="text-[#22C55E]">✓</span></span>
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-gold transition-colors cursor-default">RecordCommitted · CAS-SOLAR · 0x3a…b29f · <span className="text-mist">pending verify</span></span>
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-cyan transition-colors cursor-default">RecordVerified · CAS-SOLAR · #19 · <span className="text-cyan">✓</span></span>
        </Marquee>
      </div>
    </section>
  );
}
