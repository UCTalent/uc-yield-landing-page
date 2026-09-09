"use client";
import { Counter } from '../motion/counter';
import { Shield, Zap, Lock, Layers } from 'lucide-react';
export function Stats({ dict }: { dict: any }) {
  return (
    <div className="w-full relative z-10 bg-black/20 backdrop-blur-md border-t border-line py-8">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center">
          <Zap className="w-5 h-5 text-cyan mb-3 opacity-80" />
          <div className="font-display font-bold text-[32px] tabular-nums"><Counter from={0} to={100} duration={1.5} suffix="%" /></div>
          <div className="text-sm text-mist mt-1">{dict.statsHashing}</div>
        </div>
        <div className="flex flex-col items-center">
          <Lock className="w-5 h-5 text-cyan mb-3 opacity-80" />
          <div className="font-display font-bold text-[32px] tabular-nums"><Counter from={100} to={0} duration={1.5} /></div>
          <div className="text-sm text-mist mt-1">{dict.statsBytes}</div>
        </div>
        <div className="flex flex-col items-center">
          <Shield className="w-5 h-5 text-cyan mb-3 opacity-80" />
          <div className="font-display font-bold text-[32px] tabular-nums"><Counter from={0} to={5} duration={1.5} /></div>
          <div className="text-sm text-mist mt-1">{dict.statsRoles}</div>
        </div>
        <div className="flex flex-col items-center">
          <Layers className="w-5 h-5 text-cyan mb-3 opacity-80" />
          <div className="font-display font-bold text-[32px] tabular-nums"><Counter from={0} to={3} duration={1.5} /></div>
          <div className="text-sm text-mist mt-1">{dict.statsSteps}</div>
        </div>
      </div>
    </div>
  );
}
