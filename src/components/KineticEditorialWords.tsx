import React, { useEffect, useRef } from 'react';

interface KineticEditorialWordsProps {
  primaryWord: string;
  subText: string;
  accentColor?: string;
}

export const KineticEditorialWords: React.FC<KineticEditorialWordsProps> = ({
  primaryWord,
  subText,
  accentColor = 'text-cyan-400',
}) => {
  const streamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (streamRef.current) {
            const scrollY = window.scrollY;
            const offset = (scrollY * 0.12) % 400;
            streamRef.current.style.transform = `translate3d(${-offset}px, 0, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative py-12 sm:py-16 overflow-hidden select-none my-12 border-y border-slate-800/80 bg-gradient-to-r from-[#06080d] via-slate-950/60 to-[#06080d]">
      {/* Background Kinetic Stream (Outlined, Hardware-Accelerated translate3d, Zero Re-renders) */}
      <div
        ref={streamRef}
        className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-widest text-transparent whitespace-nowrap leading-none font-display pointer-events-none opacity-20 will-change-transform"
        style={{
          WebkitTextStroke: '1px rgba(148, 163, 184, 0.4)',
        }}
      >
        {primaryWord} • {primaryWord} • {primaryWord} • {primaryWord} • {primaryWord}
      </div>

      {/* Foreground Crisp Statement in Protected Frosted Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-none">
        <div className="p-4 sm:px-8 sm:py-5 rounded-2xl bg-[#08090d]/90 border border-slate-800 backdrop-blur-md shadow-2xl space-y-1.5 max-w-xl mx-auto pointer-events-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className={`font-mono text-[11px] tracking-[0.25em] uppercase ${accentColor} font-semibold`}>
              ARCHITECTURAL PRINCIPLE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase leading-tight">
            {primaryWord}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed max-w-md mx-auto">
            {subText}
          </p>
        </div>
      </div>
    </div>
  );
};
