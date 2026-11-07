import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { CodeWindow } from './code-window';
import { Reveal } from '../motion/reveal';
import { ArchitectureStrip } from './architecture-strip';
import { SectionHeading } from './section-heading';
import { Link } from '@/i18n/routing';
import { LEDGER_BASESCAN_URL } from '@/constants/urls';

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
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">commitBatch</span>
                <Badge variant="outline" className="text-mist border-line">OpenZeppelin</Badge>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="border-l-2 border-line pl-6 hover:border-cyan transition-colors mb-8">
              <div className="font-display font-bold mb-3 flex flex-wrap items-center gap-2">
                Verification
                {dict.oracleBadge && <Badge variant="outline" className="text-[10px] uppercase border-cyan/30 text-cyan bg-cyan/5">{dict.oracleBadge}</Badge>}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">VERIFIER_ROLE</span>
                <span className="font-mono text-[13px] px-2.5 py-1 bg-white/5 border border-line rounded-md">markVerified</span>
              </div>
              {dict.oracleFootnote && <p className="text-xs text-mist/60 mt-1">{dict.oracleFootnote}</p>}
            </div>
          </Reveal>
          
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <Link href="/docs" className={buttonVariants({ variant: 'outline', className: 'rounded-full border-[#2A3F68] text-[#DCE6FF] hover:bg-white/5' })}>
                {dict.readDocs}
              </Link>
              <a 
                href={LEDGER_BASESCAN_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", className: "rounded-full border-[#2A3F68] text-[#DCE6FF] hover:bg-white/5" })}
              >
                {dict.viewContract}
              </a>
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
