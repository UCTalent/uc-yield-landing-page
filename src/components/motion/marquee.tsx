import { ReactNode } from 'react';

export function Marquee({ children, duration = 30, reverse = false, className = "" }: { children: ReactNode; duration?: number; reverse?: boolean; className?: string }) {
  const animationClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
  
  return (
    <div className={`flex w-full overflow-hidden ${className}`}>
      <div className={`flex shrink-0 w-max ${animationClass} group-hover:[animation-play-state:paused]`} style={{ animationDuration: `${duration}s` }}>
        {children}
        {children}
      </div>
    </div>
  );
}
