import React, { useEffect, useState } from 'react';
import { Terminal, ChevronUp, ChevronDown } from 'lucide-react';

export interface SceneItem {
  id: string;
  number: string;
  name: string;
  targetId: string;
}

export const SCENES: SceneItem[] = [
  { id: 'arrival', number: '01', name: 'THE ARRIVAL', targetId: 'cinematic-hero-arrival' },
  { id: 'identity', number: '02', name: 'IDENTITY & STANCE', targetId: 'hero' },
  { id: 'system', number: '03', name: 'THE 3D SYSTEM', targetId: 'system-scene' },
  { id: 'build', number: '04', name: 'WHAT I BUILD', targetId: 'projects' },
  { id: 'think', number: '05', name: 'HOW I THINK (DSA)', targetId: 'how-i-think' },
  { id: 'work', number: '06', name: 'HOW I WORK (AI)', targetId: 'how-i-work' },
  { id: 'contact', number: '07', name: 'CONTACT & PROOF', targetId: 'contact' },
];

export const ScrollProgressHUD: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
          const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)));
          
          setScrollProgress((prev) => (prev !== roundedProgress ? roundedProgress : prev));

          // Find current scene based on scroll positions
          for (let index = 0; index < SCENES.length; index++) {
            const scene = SCENES[index];
            const el = document.getElementById(scene.targetId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
                setActiveSceneIndex(index);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToScene = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Scene Navigator"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-2 pointer-events-auto select-none"
    >
      {/* Background HUD Frame */}
      <div className="p-3 rounded-2xl bg-[#08090d]/80 border border-slate-800/90 backdrop-blur-md shadow-2xl flex flex-col items-end gap-2.5">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 pb-1.5 border-b border-slate-800 w-full justify-between">
          <div className="flex items-center gap-1 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>NAV // HUD</span>
          </div>
          <span className="text-cyan-300 font-bold">{scrollProgress}%</span>
        </div>

        {/* Scene Steps */}
        <div className="space-y-1.5 w-full">
          {SCENES.map((scene, idx) => {
            const isActive = activeSceneIndex === idx;
            return (
              <button
                key={scene.id}
                onClick={() => scrollToScene(scene.targetId)}
                data-cursor="GOTO"
                className={`group flex items-center justify-between gap-3 w-full px-2.5 py-1.5 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 shadow-md'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {scene.number}
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-wider transition-colors ${
                      isActive ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {scene.name}
                  </span>
                </div>

                {/* Status Dot / Bar */}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_rgba(6,182,212,0.9)]'
                      : 'bg-slate-700 group-hover:bg-slate-500'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Quick Nav arrows */}
        <div className="flex items-center justify-between w-full pt-1 border-t border-slate-800 text-[10px] font-mono text-slate-500">
          <button
            onClick={() => {
              const prev = Math.max(0, activeSceneIndex - 1);
              scrollToScene(SCENES[prev].targetId);
            }}
            className="p-1 hover:text-cyan-400 rounded hover:bg-slate-800 transition-colors"
            title="Previous Scene"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <span className="text-[9px] text-slate-500 font-mono">SCENE 0{activeSceneIndex + 1}/07</span>
          <button
            onClick={() => {
              const next = Math.min(SCENES.length - 1, activeSceneIndex + 1);
              scrollToScene(SCENES[next].targetId);
            }}
            className="p-1 hover:text-cyan-400 rounded hover:bg-slate-800 transition-colors"
            title="Next Scene"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
