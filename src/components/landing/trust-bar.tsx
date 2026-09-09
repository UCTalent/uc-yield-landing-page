import { Marquee } from '../motion/marquee';

export function TrustBar({ dict }: { dict: any }) {
  const items = dict.items.split('✦').filter((t: string) => t.trim());
  return (
    <section className="py-8 bg-black/20 border-y border-line overflow-hidden flex flex-col gap-4 text-[14px] font-display font-semibold text-mist tracking-widest mask-fade-x group relative z-10">
      <div className="w-full group">
        <Marquee duration={30}>
          {items.map((text: string, i: number) => (
            <span key={i} className="flex items-center gap-4 mx-4">{text.trim()} <span className="text-gold opacity-50 text-[10px]">✦</span></span>
          ))}
        </Marquee>
      </div>
      <div className="w-full group">
        <Marquee duration={30} reverse>
          {[...items].reverse().map((text: string, i: number) => (
            <span key={i} className="flex items-center gap-4 mx-4">{text.trim()} <span className="text-gold opacity-50 text-[10px]">✦</span></span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
