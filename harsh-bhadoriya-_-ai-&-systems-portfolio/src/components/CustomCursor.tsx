import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if mobile or touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (!isVisible) setIsVisible(true);

      // Check hover targets for contextual text
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const customLabel = interactive.getAttribute('data-cursor');
        if (customLabel) {
          setCursorText(customLabel);
        } else if (interactive.tagName === 'A') {
          setCursorText('VISIT');
        } else if (interactive.tagName === 'BUTTON') {
          setCursorText('CLICK');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (trailRef.current) trailRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (trailRef.current) trailRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Silky smooth 120fps hardware-accelerated trailing lerp loop
    const animateTrail = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.2;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.2;

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Primary Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-cyan-400 pointer-events-none transition-opacity duration-200 ease-out shadow-[0_0_12px_rgba(6,182,212,0.9)] will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />

      {/* Trailing Fluid Halo / Expanded Action Ring */}
      <div
        ref={trailRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none border transition-[width,height,border-color,background-color] duration-150 ease-out flex items-center justify-center font-mono text-[9px] font-bold tracking-wider uppercase will-change-transform ${
          isHovered
            ? '-ml-8 -mt-8 w-16 h-16 border-cyan-400/80 bg-cyan-950/40 text-cyan-200 backdrop-blur-[1px] shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            : '-ml-4 -mt-4 w-8 h-8 border-cyan-500/30 bg-transparent text-transparent'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {cursorText}
      </div>
    </div>
  );
};
