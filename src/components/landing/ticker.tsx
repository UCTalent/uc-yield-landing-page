import { Marquee } from '../motion/marquee';

export function Ticker() {
  return (
    <section className="py-6 overflow-hidden flex flex-col gap-4 border-b border-line mask-fade-x group relative z-10">
      <div className="w-full group">
        <Marquee duration={40} className="py-2 group-hover:[animation-play-state:paused]">
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-cyan transition-colors cursor-default">DataCommitted · CAS-SOLAR · 0x9f…c41d · <span className="text-[#22C55E]">✓</span></span>
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-gold transition-colors cursor-default">CommitmentOracleVerified · CAS-SOLAR · #402 · <span className="text-cyan">✓</span></span>
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-cyan transition-colors cursor-default">DataCommitted · AGRI-01 · 0x1c…d88e · <span className="text-[#22C55E]">✓</span></span>
        </Marquee>
      </div>
      <div className="w-full group">
        <Marquee duration={40} reverse className="py-2 group-hover:[animation-play-state:paused]">
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-cyan transition-colors cursor-default">DataCommitted · AGRI-01 · 0x1c…d88e · <span className="text-[#22C55E]">✓</span></span>
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-gold transition-colors cursor-default">Oracle attested · Consumer Contract · <span className="text-mist">pending</span></span>
          <span className="font-mono text-[12.5px] px-4 py-2 border border-line rounded-xl bg-card mx-3 hover:border-cyan transition-colors cursor-default">CommitmentOracleVerified · CAS-SOLAR · #415 · <span className="text-cyan">✓</span></span>
        </Marquee>
      </div>
    </section>
  );
}
