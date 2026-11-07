import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Reveal } from '../motion/reveal';
import { SectionHeading } from './section-heading';
import { Link } from '@/i18n/routing';
import { LEDGER_BASESCAN_URL } from '@/constants/urls';

export function FAQ({ dict }: { dict: any }) {
  return (
    <section id="faq" className="py-20 md:py-28 bg-black/20 border-t border-line relative z-10">
      <div className="max-w-[760px] mx-auto px-6">
        <SectionHeading title={dict.title} />
        <Reveal delay={0.1}>
          <Accordion className="flex flex-col gap-3">
            {[1,2,3,4,5,6].map((num, i) => (
              <Reveal key={num} delay={0.1 + i * 0.06}>
                <AccordionItem value={`item-${num}`} className="border border-line rounded-2xl bg-card/60 px-6 data-[state=open]:bg-white/5 data-[state=open]:border-cyan/40 overflow-hidden">
                  <AccordionTrigger className="text-[17px] font-bold hover:no-underline py-5 text-left text-ice">{dict[`q${num}`]}</AccordionTrigger>
                  <AccordionContent keepMounted hiddenUntilFound className="text-mist text-base pb-5 leading-relaxed">
                    {dict[`a${num}`]}
                    {num === 4 && (
                      <div className="mt-3"><Link href="/docs/ucyield-verified" className="text-cyan text-sm hover:underline hover:text-white transition-colors">UCYield Verified →</Link></div>
                    )}
                    {num === 6 && (
                      <div className="mt-3 flex flex-wrap gap-4"><Link href="/docs/independent-verification" className="text-cyan text-sm hover:underline hover:text-white transition-colors">Independent verification →</Link><a href={LEDGER_BASESCAN_URL} target="_blank" rel="noopener noreferrer" className="text-cyan text-sm hover:underline hover:text-white transition-colors">ShadowLedgerV3 on Basescan ↗</a></div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
