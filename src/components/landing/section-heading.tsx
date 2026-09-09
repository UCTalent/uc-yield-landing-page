import { ReactNode } from 'react';
import { Reveal } from '../motion/reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} mb-16`}>
      {eyebrow && (
        <Reveal delay={0}>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-line text-xs font-semibold text-cyan mb-4 uppercase tracking-wider">
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className="text-[32px] md:text-[40px] font-bold font-display leading-[1.2] tracking-tight mb-4">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="text-mist text-lg max-w-[600px]">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
