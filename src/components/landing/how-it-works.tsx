import { CloudUpload, SquarePen, ShieldCheck, Check } from 'lucide-react';
import { Reveal } from '../motion/reveal';
import { HashFlow } from './hash-flow';
import { SpotlightCard } from './spotlight-card';
import { SectionHeading } from './section-heading';
import { CommitFlowDemo } from './commit-flow-demo';

export function HowItWorks({ dict }: { dict: any }) {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading 
          eyebrow="Workflow"
          title={dict.title}
          subtitle={dict.subtitle}
        />
        
        <CommitFlowDemo dict={dict} />
        
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
