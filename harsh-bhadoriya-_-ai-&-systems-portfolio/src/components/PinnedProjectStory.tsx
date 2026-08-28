import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Terminal,
  Database,
  Radio,
  Zap,
  ShieldAlert,
  BookOpen,
} from 'lucide-react';
import { ProjectItem } from '../types';

interface PinnedProjectStoryProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export const PinnedProjectStory: React.FC<PinnedProjectStoryProps> = ({ onOpenCaseStudy }) => {
  // Pinned Step State for PolyTutor AI
  const [polyActiveStep, setPolyActiveStep] = useState<number>(0);
  // Pinned Step State for StadiumMind AI
  const [stadiumActiveStep, setStadiumActiveStep] = useState<number>(0);

  const polyContainerRef = useRef<HTMLDivElement>(null);
  const stadiumContainerRef = useRef<HTMLDivElement>(null);

  const polyTutorFlow = [
    {
      step: '01',
      title: 'USER SPEECH / TEXT INGRESS',
      badge: 'INPUT LAYER',
      description: 'The student speaks or types a sentence in Spanish/French. Audio is ingested with WebAudio API and converted into high-salience tokens.',
      subMetrics: 'Latency: 18ms • Phoneme Array: 42 segments',
      activeAgents: ['Microphone / Ingress Gateway'],
    },
    {
      step: '02',
      title: 'CENTRAL LANGGRAPH ORCHESTRATOR',
      badge: 'STATE ROUTING',
      description: 'Evaluates intent, student proficiency baseline, and branches execution simultaneously to specialized pedagogical sub-agents.',
      subMetrics: 'State Schema: JSON • Fork Mode: 3 Parallel Threads',
      activeAgents: ['LangGraph Supervisor', 'Router Node'],
    },
    {
      step: '03',
      title: 'SPECIALIZED AGENTS (TUTOR + GRAMMAR + PHONEME)',
      badge: 'MULTI-AGENT MESH',
      description: 'Grammar agent checks tense agreement; Pronunciation agent isolates phonetic misalignment; Tutor agent crafts conversational response.',
      subMetrics: 'Model: Gemini 2.5 • AST Validation: 100%',
      activeAgents: ['Grammar Evaluator', 'Phoneme Inspector', 'Pedagogy Synthesizer'],
    },
    {
      step: '04',
      title: 'VECTOR RETRIEVAL & LONG-TERM MEMORY (CHROMADB)',
      badge: 'PERSISTENCE',
      description: 'Student error patterns are embedded into ChromaDB. Next session instantly recalls recurring pronunciation challenges.',
      subMetrics: 'Recall Latency: 22ms • Vector Dimension: 768d',
      activeAgents: ['ChromaDB Store', 'Spaced-Repetition Engine'],
    },
  ];

  const stadiumMindFlow = [
    {
      step: '01',
      title: 'RAW IOT & TURNSTILE INGESTION',
      badge: 'STREAM INGESTION',
      description: 'High-frequency telemetry stream from 48 turnstile gates, concourse thermal sensors, and ticket scanner optical gates.',
      subMetrics: 'Ingestion Rate: 4,200 events/sec • Protocol: WebSocket',
      activeZone: 'Perimeter Gates & RFID Turnstiles',
    },
    {
      step: '02',
      title: 'REAL-TIME HEATMAP & FLOW MATRIX',
      badge: 'DYNAMIC COMPUTE',
      description: 'Stream engine computes zonal density, crowd velocity vectors, and corridor pressure gradients in sub-50ms cycles.',
      subMetrics: 'Concourse Density: 84% • Velocity Gradient: 1.2 m/s',
      activeZone: 'Concourse A & B Heatmap Aggregator',
    },
    {
      step: '03',
      title: 'PREDICTIVE BOTTLENECK SURGE MODEL',
      badge: 'AI PREDICTION',
      description: 'Temporal AI model forecasts crowd surge bottlenecks at Gate 4 and Section 108 with 12-minute forward lookahead.',
      subMetrics: 'Forecast Accuracy: 94.2% • Lead Time: 12 Minutes',
      activeZone: 'Predictive Surge Sentinel',
    },
    {
      step: '04',
      title: 'AUTONOMOUS OPERATIONAL DISPATCH & ESCALATION',
      badge: 'ACTION ENGINE',
      description: 'Dispatches dynamic LED sign rerouting, alerts field security personnel, and balances turnstile queues automatically.',
      subMetrics: 'Incident Resolution: -40% Latency • Safety Index: 99.8%',
      activeZone: 'Incident Dispatch & Autonomous Controls',
    },
  ];

  return (
    <div className="space-y-32">
      {/* ------------------------------------------------------------- */}
      {/* PINNED MOMENT 01: POLYTUTOR AI MULTI-AGENT STORY */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={polyContainerRef}
        className="relative rounded-3xl bg-gradient-to-b from-[#0e121d] via-[#090b12] to-[#06080d] border border-cyan-500/30 p-6 sm:p-12 shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Sticky Left Storyboard (5 cols) */}
          <div className="lg:w-5/12 space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-cyan-400">01</span>
              <span className="h-4 w-px bg-slate-700" />
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                MULTI-AGENT PINNED DEEP DIVE
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
                PolyTutor AI
              </h3>
              <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wider">
                Autonomous Multi-Agent Language Coach & Adaptive Pedagogical Engine
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Interact with the step progression below to observe how student speech flows through
              the LangGraph supervisor, specialized diagnostic sub-agents, and ChromaDB vector persistence.
            </p>

            {/* Step Selection Buttons */}
            <div className="space-y-2 pt-2">
              {polyTutorFlow.map((flow, idx) => (
                <button
                  key={idx}
                  onClick={() => setPolyActiveStep(idx)}
                  data-cursor="STEP"
                  className={`w-full p-3.5 rounded-xl text-left font-mono text-xs transition-all flex items-center justify-between ${
                    polyActiveStep === idx
                      ? 'bg-cyan-950/80 border-2 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-cyan-400 font-bold">{flow.step}</span>
                    <span className="truncate">{flow.title}</span>
                  </div>
                  <span className="text-[10px] text-cyan-300/80 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                    {flow.badge}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => onOpenCaseStudy('polytutor-ai')}
              data-cursor="CASE STUDY"
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/20"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Full PolyTutor Case Study (01 Problem → 03 Outcome)</span>
            </button>
          </div>

          {/* Dynamic Right Interactive Agent State Canvas (7 cols) */}
          <div className="lg:w-7/12 w-full space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-black/80 border border-cyan-500/30 font-mono text-xs space-y-6 shadow-2xl relative overflow-hidden">
              {/* Header Telemetry */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Terminal className="w-4 h-4" />
                  <span>AGENT GRAPH TRACE // STEP 0{polyActiveStep + 1}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE EXECUTION</span>
                </div>
              </div>

              {/* Visualized Stage Card */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    {polyTutorFlow[polyActiveStep].title}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {polyTutorFlow[polyActiveStep].description}
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 space-y-1.5">
                  <div className="text-[10px] text-cyan-400 uppercase tracking-wider">
                    REAL-TIME METRIC STREAM
                  </div>
                  <div className="text-xs text-white font-mono">
                    {polyTutorFlow[polyActiveStep].subMetrics}
                  </div>
                </div>

                {/* Active Agents Pills */}
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                    Active Orchestration Nodes:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {polyTutorFlow[polyActiveStep].activeAgents.map((agent, aIdx) => (
                      <span
                        key={aIdx}
                        className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-400/50 text-cyan-200 text-xs font-mono flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{agent}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Step Controls */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  disabled={polyActiveStep === 0}
                  onClick={() => setPolyActiveStep(Math.max(0, polyActiveStep - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-30 text-slate-300 text-xs"
                >
                  ← Previous Node
                </button>
                <span className="text-slate-500 text-[11px]">
                  Node {polyActiveStep + 1} of {polyTutorFlow.length}
                </span>
                <button
                  disabled={polyActiveStep === polyTutorFlow.length - 1}
                  onClick={() =>
                    setPolyActiveStep(Math.min(polyTutorFlow.length - 1, polyActiveStep + 1))
                  }
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs disabled:opacity-30"
                >
                  Next Node →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PINNED MOMENT 02: STADIUMMIND AI OPERATIONS COMMAND STORY */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={stadiumContainerRef}
        className="relative rounded-3xl bg-gradient-to-b from-[#100e1e] via-[#0b0914] to-[#06080d] border border-violet-500/30 p-6 sm:p-12 shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Sticky Left Storyboard (5 cols) */}
          <div className="lg:w-5/12 space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-violet-400">02</span>
              <span className="h-4 w-px bg-slate-700" />
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300">
                OPERATIONAL PIPELINE STORY
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
                StadiumMind AI
              </h3>
              <p className="text-xs font-mono text-violet-400 mt-1 uppercase tracking-wider">
                Real-Time Stadium Operations Command Engine & Predictive Crowd Surge Mitigator
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Experience the end-to-end telemetry pipeline: from high-frequency IoT turnstile signals
              to real-time velocity matrices, predictive surge sentinels, and automated mitigation.
            </p>

            {/* Step Selection Buttons */}
            <div className="space-y-2 pt-2">
              {stadiumMindFlow.map((flow, idx) => (
                <button
                  key={idx}
                  onClick={() => setStadiumActiveStep(idx)}
                  data-cursor="STEP"
                  className={`w-full p-3.5 rounded-xl text-left font-mono text-xs transition-all flex items-center justify-between ${
                    stadiumActiveStep === idx
                      ? 'bg-violet-950/80 border-2 border-violet-400 text-white shadow-lg'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-violet-400 font-bold">{flow.step}</span>
                    <span className="truncate">{flow.title}</span>
                  </div>
                  <span className="text-[10px] text-violet-300/80 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                    {flow.badge}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => onOpenCaseStudy('stadiummind-ai')}
              data-cursor="CASE STUDY"
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-600/20"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Full StadiumMind Case Study (01 Problem → 03 Outcome)</span>
            </button>
          </div>

          {/* Dynamic Right Interactive Pipeline Canvas (7 cols) */}
          <div className="lg:w-7/12 w-full space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-black/80 border border-violet-500/30 font-mono text-xs space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-violet-400">
                  <Activity className="w-4 h-4" />
                  <span>COMMAND TELEMETRY // STAGE 0{stadiumActiveStep + 1}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE INGESTION</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    {stadiumMindFlow[stadiumActiveStep].title}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {stadiumMindFlow[stadiumActiveStep].description}
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 space-y-1.5">
                  <div className="text-[10px] text-violet-400 uppercase tracking-wider">
                    TELEMETRY SPECS
                  </div>
                  <div className="text-xs text-white font-mono">
                    {stadiumMindFlow[stadiumActiveStep].subMetrics}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                    Target Sector Zone:
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-violet-950/60 border border-violet-400/50 text-violet-200 text-xs font-mono inline-flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-violet-400" />
                    <span>{stadiumMindFlow[stadiumActiveStep].activeZone}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  disabled={stadiumActiveStep === 0}
                  onClick={() => setStadiumActiveStep(Math.max(0, stadiumActiveStep - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-30 text-slate-300 text-xs"
                >
                  ← Previous Stage
                </button>
                <span className="text-slate-500 text-[11px]">
                  Stage {stadiumActiveStep + 1} of {stadiumMindFlow.length}
                </span>
                <button
                  disabled={stadiumActiveStep === stadiumMindFlow.length - 1}
                  onClick={() =>
                    setStadiumActiveStep(Math.min(stadiumMindFlow.length - 1, stadiumActiveStep + 1))
                  }
                  className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs disabled:opacity-30"
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
