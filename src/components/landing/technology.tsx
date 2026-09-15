import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeWindow } from './code-window';
import { Reveal } from '../motion/reveal';
import { ArchitectureStrip } from './architecture-strip';
import { SectionHeading } from './section-heading';

export function Technology({ dict }: { dict: any }) {
  return (
    <section id="technology" className="py-20 md:py-28 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <SectionHeading 
              title={dict.title}
              align="left"
            />
          
          <Reveal delay={0.1}>
            <div className="border-l-2 border-line pl-6 hover:border-cyan transition-colors mb-6">
              <div className="font-display font-bold mb-3">Deterministic Hashing Engine</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">canonicalize()</span>
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">keccak256</span>
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">Merkle root</span>
              </div>
              <p className="text-sm text-mist">{dict.purity}</p>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="border-l-2 border-line pl-6 hover:border-cyan transition-colors mb-6">
              <div className="font-display font-bold mb-3">Shadow Ledger Registry</div>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">AccessControl</span>
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">commitData</span>
                <Badge variant="outline" className="text-mist border-line">OpenZeppelin</Badge>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="border-l-2 border-line pl-6 hover:border-cyan transition-colors mb-8">
              <div className="font-display font-bold mb-3 flex flex-wrap items-center gap-2">
                Oracle Verification Network
                {dict.oracleBadge && <Badge variant="outline" className="text-[10px] uppercase border-cyan/30 text-cyan bg-cyan/5">{dict.oracleBadge}</Badge>}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">OracleConsumer</span>
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">markOracleVerified</span>
                <Badge variant="outline" className="text-mist border-line">Chainlink CRE</Badge>
              </div>
              {dict.oracleFootnote && <p className="text-xs text-mist/60 mt-1">{dict.oracleFootnote}</p>}
            </div>
          </Reveal>
          
          <Reveal delay={0.4}>
            <div className="flex gap-4">
              <Button asChild variant="outline" className="rounded-full border-[#2A3F68] text-[#DCE6FF] hover:bg-white/5">
                <a href="https://sepolia.basescan.org/address/0x0DC94FAe3DD2D9852d63C996976cbb80B2F4FDD7" target="_blank" rel="noopener noreferrer">
                  {dict.viewContract}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
        
          <Reveal delay={0.4} className="w-full">
            <CodeWindow dict={dict} />
          </Reveal>
        </div>
        <Reveal delay={0.5} className="w-full">
          <ArchitectureStrip />
        </Reveal>
      </div>
    </section>
  );
}
