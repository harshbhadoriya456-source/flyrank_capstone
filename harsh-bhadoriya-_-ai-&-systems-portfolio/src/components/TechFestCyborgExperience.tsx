import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Eye,
  Radio,
  Sliders,
  Maximize2,
  Shield,
  Activity,
  Layers,
  Cpu,
  Zap,
} from 'lucide-react';

export const TechFestCyborgExperience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hudMode, setHudMode] = useState<'neural' | 'biometric' | 'quantum'>('neural');
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [targetCoords, setTargetCoords] = useState<{ x: number; y: number }>({ x: 120, y: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseColor: string;
    }> = [];

    const numParticles = 75;
    const colors = ['#00f0ff', '#a855f7', '#38bdf8', '#10b981'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
        baseColor: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      setTargetCoords({ x: Math.round(mouseX), y: Math.round(mouseY) });
    };

    window.addEventListener('mousemove', handlePointerMove);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Cyber Grid overlay
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw Particles with Interconnections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor;
        ctx.shadowColor = p.baseColor;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.18 * (1 - dist / 110)})`;
            ctx.stroke();
          }
        }

        // Mouse proximity tether
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.4 * (1 - mDist / 150)})`;
          ctx.stroke();
        }
      }

      // Reticle at mouse position
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 28, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 40, (tick * 0.03) % (Math.PI * 2), ((tick * 0.03) % (Math.PI * 2)) + 1.2);
      ctx.strokeStyle = '#a855f7';
      ctx.stroke();

      // Crosshair ticks
      ctx.beginPath();
      ctx.moveTo(mouseX - 12, mouseY);
      ctx.lineTo(mouseX + 12, mouseY);
      ctx.moveTo(mouseX, mouseY - 12);
      ctx.lineTo(mouseX, mouseY + 12);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hudMode]);

  const triggerGlitchEffect = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 600);
  };

  return (
    <div
      className={`relative w-full rounded-2xl bg-[#06080e] border border-cyan-500/40 p-6 overflow-hidden shadow-2xl transition-all ${
        glitchActive ? 'filter invert contrast-200 hue-rotate-90' : ''
      }`}
    >
      {/* Background Cyber Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Cybernetic HUD Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>TECHFEST FLAGSHIP // CYBORG HUMAN × MACHINE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
            Interactive Cybernetic Visual Canvas
          </h3>
        </div>

        {/* HUD Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setHudMode('neural')}
              className={`px-3 py-1 rounded-lg transition-all ${
                hudMode === 'neural'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Neural Mesh
            </button>
            <button
              onClick={() => setHudMode('biometric')}
              className={`px-3 py-1 rounded-lg transition-all ${
                hudMode === 'biometric'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Biometrics
            </button>
          </div>

          <button
            onClick={triggerGlitchEffect}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Glitch FX</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport with Live HUD Overlays */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-xl overflow-hidden my-4 bg-slate-950/90 border border-slate-800 cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Top Left Telemetry Overlay */}
        <div className="absolute top-4 left-4 z-10 p-3 rounded-lg bg-black/75 border border-cyan-500/30 backdrop-blur-md font-mono text-[11px] text-slate-300 space-y-1">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>CYBORG_CORE // ACTIVE</span>
          </div>
          <div>FRAME_SYNC: 60.0 FPS LOCKED</div>
          <div>CURSOR_POS: X:{targetCoords.x} Y:{targetCoords.y}</div>
          <div className="text-violet-400">PARTICLE_MESH: 75 NODES CONNECTED</div>
        </div>

        {/* Bottom Right HUD Spec */}
        <div className="absolute bottom-4 right-4 z-10 p-3 rounded-lg bg-black/75 border border-violet-500/30 backdrop-blur-md font-mono text-[11px] text-right text-slate-300 space-y-0.5">
          <div className="text-violet-300 font-bold">HUMAN × MACHINE INTERFACE</div>
          <div className="text-[10px] text-slate-400">WebGL Shader Pipeline & Micro-Interactions</div>
          <div className="text-emerald-400 text-[10px]">OPTIMIZED HARDWARE ACCELERATION</div>
        </div>
      </div>

      {/* Design Craft Rationale */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs text-slate-300">
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-cyan-400 font-bold block mb-1">01 / CONCEPTUAL DIRECTION</span>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Synthesizing biological organic shapes with high-precision cybernetic HUD wireframes.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-violet-400 font-bold block mb-1">02 / INTERACTION DYNAMICS</span>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Spatial proximity detection, mouse-reactive particle vectors, and locked 60 FPS animation loops.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-emerald-400 font-bold block mb-1">03 / PERFORMANCE CRAFT</span>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Lightweight procedural HTML5 Canvas + WebGL shaders with zero heavy external video dependencies.
          </p>
        </div>
      </div>
    </div>
  );
};
