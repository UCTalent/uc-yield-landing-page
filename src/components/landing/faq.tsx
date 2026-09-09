import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Reveal } from '../motion/reveal';
import { SectionHeading } from './section-heading';

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
                  <AccordionContent className="text-mist text-base pb-5 leading-relaxed">
                    {dict[`a${num}`]}
                    {num === 4 && (
                      <div className="mt-3"><a href="https://docs.chain.link/cre" target="_blank" rel="noopener noreferrer" className="text-cyan text-sm hover:underline hover:text-white transition-colors">See Chainlink CRE docs →</a></div>
                    )}
                    {num === 6 && (
                      <div className="mt-3"><a href="https://sepolia.basescan.org" target="_blank" rel="noopener noreferrer" className="text-cyan text-sm hover:underline hover:text-white transition-colors">Verify on Basescan →</a></div>
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
