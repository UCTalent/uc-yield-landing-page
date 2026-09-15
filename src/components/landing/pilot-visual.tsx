
import Image from 'next/image';
import { Counter } from '../motion/counter';

export function PilotVisual() {
  return (
    <div className="w-full h-full min-h-[300px] relative flex items-center justify-center overflow-hidden">
      {/* Background image placeholder - user must provide the actual WebP */}
      <div className="absolute inset-0 bg-[#0A1428]">
        <Image 
          src="/pilot-solar.webp"
          alt="Solar pilot facility"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-cover opacity-40 mix-blend-luminosity"
        />
      </div>
      
      {/* Duotone overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-b from-transparent to-card/90 z-10"></div>
      
      {/* Floating metric chip */}
      <div className="absolute bottom-8 left-8 z-20 bg-black/40 backdrop-blur-md border border-line rounded-2xl p-4 shadow-2xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-cyan/20 border border-cyan/30 flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse"></span>
        </div>
        <div>
          <div className="font-mono text-xl font-bold text-ice tabular-nums flex items-end gap-1">
            <Counter from={1.250} to={1.284} duration={3} decimals={3} />
            <span className="text-sm text-mist mb-0.5">MWh</span>
          </div>
          <div className="text-xs text-mist font-semibold uppercase tracking-wider">Energy Generated</div>
        </div>
      </div>
    </div>
  );
}
