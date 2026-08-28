import React from 'react';
import {
  Sparkles,
  ArrowRight,
  GitBranch,
  Terminal,
  Cpu,
  Layers,
  Shield,
  Download,
  Mail,
} from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { personalProfile } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 filter blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-violet-500/10 filter blur-[100px] pointer-events-none rounded-full" />

      {/* Main Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 font-mono text-xs shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>B.TECH CSE (2025–2029) • GLA UNIVERSITY</span>
        </div>

        {/* Identity & Name */}
        <div className="space-y-1.5">
          <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-slate-400 uppercase block">
            AUTHORITATIVE ENGINEERING PORTFOLIO OF
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase leading-tight">
            {personalProfile.name}
          </h1>
        </div>

        {/* Positioning Statement */}
        <div className="py-1 sm:py-2">
          <h2 className="text-xl sm:text-3xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 font-display leading-tight">
            {personalProfile.positioningHeadline}
          </h2>
        </div>

        {/* Supporting Line */}
        <p className="text-sm sm:text-base font-mono text-slate-300 tracking-wider">
          {personalProfile.supportingLine}
        </p>

        {/* Core Value Proposition Narrative */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed pt-1">
          Engineering production-ready generative AI workflows, LangGraph multi-agent orchestration,
          low-latency vector retrieval engines, and scalable containerized backends.
        </p>

        {/* CTA Button Group */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/40"
          >
            <span>Explore Flagship Systems</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#architecture"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 font-mono text-xs font-medium flex items-center gap-2 transition-all"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Interactive Multi-Agent Graph</span>
          </a>

          <a
            href="#contact"
            className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Direct Inquiries</span>
          </a>
        </div>
      </div>

      {/* 3D Interactive Neural / Distributed System Canvas (SCENE 03: THE SYSTEM) */}
      <div id="system-scene" className="mt-8">
        <Hero3DCanvas />
      </div>

      {/* Quick Architecture Proof Bar */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-sm">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
            01 / MULTI-AGENT DESIGN
          </span>
          <span className="text-sm font-bold text-white block">LangGraph & State Graphs</span>
          <span className="text-[11px] text-slate-400">Cyclic agent coordination</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-sm">
          <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider block mb-1">
            02 / GENERATIVE AI MODELS
          </span>
          <span className="text-sm font-bold text-white block">Gemini AI & RAG</span>
          <span className="text-[11px] text-slate-400">Deterministic schema outputs</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-sm">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
            03 / EMBEDDED MEMORY
          </span>
          <span className="text-sm font-bold text-white block">ChromaDB + PostgreSQL</span>
          <span className="text-[11px] text-slate-400">Vector semantic recall</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-sm">
          <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block mb-1">
            04 / CLOUD RUNTIMES
          </span>
          <span className="text-sm font-bold text-white block">Docker & Cloud Run</span>
          <span className="text-[11px] text-slate-400">Sub-second event streaming</span>
        </div>
      </div>
    </section>
  );
};
