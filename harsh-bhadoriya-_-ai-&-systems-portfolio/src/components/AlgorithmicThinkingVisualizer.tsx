import React, { useState, useEffect } from 'react';
import {
  Cpu,
  GitGraph,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Zap,
  Layers,
  ArrowRight,
  Clock,
  Database,
  Terminal,
} from 'lucide-react';

interface AlgorithmMode {
  id: string;
  name: string;
  category: string;
  timeComplexity: string;
  spaceComplexity: string;
  realWorldApplication: string;
  description: string;
  steps: {
    title: string;
    stateText: string;
    activeNodes: number[];
    visitedNodes: number[];
    frontierNodes: number[];
  }[];
}

const ALGORITHMS: AlgorithmMode[] = [
  {
    id: 'graph-astar',
    name: 'A* & Dijkstra Shortest Path Search',
    category: 'Graph Algorithms // Crowd Dynamics',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    realWorldApplication: 'Real-time Stadium Evacuation Routing & Dynamic Bottleneck Bypassing in StadiumMind AI',
    description: 'Heuristic-guided state exploration finding optimal evacuation corridors through high-density stadium zones.',
    steps: [
      {
        title: '01. Priority Queue Initialization',
        stateText: 'Push Source Node (Gate A: 0) into Min-Heap. Calculate Euclidean distance heuristic h(n) to target evacuation zone.',
        activeNodes: [0],
        visitedNodes: [0],
        frontierNodes: [1, 2],
      },
      {
        title: '02. Dynamic Congestion Edge Relaxation',
        stateText: 'Evaluating Zone 1 & Zone 2. Edge weight increased dynamically by +45% due to simulated bottleneck telemetry.',
        activeNodes: [1],
        visitedNodes: [0, 1],
        frontierNodes: [2, 3, 4],
      },
      {
        title: '03. Alternate Sub-graph Branching',
        stateText: 'Pruning congested Sector 1 corridor. Expanding low-friction perimeter corridor through Concourse 3.',
        activeNodes: [3],
        visitedNodes: [0, 1, 3],
        frontierNodes: [4, 5],
      },
      {
        title: '04. Optimal Path Convergence',
        stateText: 'Goal reached (South Safe Plaza). Reconstructing path backwards with total latency cost: 14.2s (optimal).',
        activeNodes: [5],
        visitedNodes: [0, 3, 5],
        frontierNodes: [],
      },
    ],
  },
  {
    id: 'sliding-window-tokens',
    name: 'Sliding Window Token Bucket Caching',
    category: 'Dynamic Data Structures // LLM Caching',
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(K) window size',
    realWorldApplication: 'Multi-Turn Context Pruning & Rate-Limiter in PolyTutor AI Multi-Agent Orchestrator',
    description: 'Maintains optimal 8k-token memory budget while preserving high-salience pedagogical concepts.',
    steps: [
      {
        title: '01. Influx Stream Ingestion',
        stateText: 'Incoming multi-agent dialogue packet (1,240 tokens). Checking memory ring buffer capacity.',
        activeNodes: [0, 1],
        visitedNodes: [0],
        frontierNodes: [2],
      },
      {
        title: '02. Relevance Scored Eviction',
        stateText: 'Evicting low-weight chit-chat tokens while pinning critical grammar mistakes into ChromaDB vector store.',
        activeNodes: [2],
        visitedNodes: [0, 1, 2],
        frontierNodes: [3],
      },
      {
        title: '03. Window Compaction & Synthesis',
        stateText: 'Consolidating conversation history into structured JSON state graph with 68% token reduction.',
        activeNodes: [3],
        visitedNodes: [0, 1, 2, 3],
        frontierNodes: [4],
      },
      {
        title: '04. Deterministic Payload Dispatch',
        stateText: 'Context passed to Gemini LLM with zero overflow risk and <120ms retrieval latency.',
        activeNodes: [4],
        visitedNodes: [0, 2, 3, 4],
        frontierNodes: [],
      },
    ],
  },
  {
    id: 'cyclic-state-machine',
    name: 'Cyclic Graph State Machine (LangGraph)',
    category: 'Multi-Agent Systems // Cyclic Traversal',
    timeComplexity: 'O(N * Iterations)',
    spaceComplexity: 'O(State Schema)',
    realWorldApplication: 'Autonomous Feedback Loops in PolyTutor AI (Tutor ⇄ Grammar ⇄ Pronunciation)',
    description: 'Guarantees convergence of autonomous agent iterations with strict fallback termination bounds.',
    steps: [
      {
        title: '01. Intent Classification & Route Fork',
        stateText: 'Orchestrator node analyzes student utterance and branches into Grammar & Pronunciation workers.',
        activeNodes: [0],
        visitedNodes: [0],
        frontierNodes: [1, 2],
      },
      {
        title: '02. Parallel Worker Evaluation',
        stateText: 'Grammar Agent parses syntax AST; Pronunciation Agent correlates phoneme audio spectrogram.',
        activeNodes: [1, 2],
        visitedNodes: [0, 1, 2],
        frontierNodes: [3],
      },
      {
        title: '03. Evaluator / Reflection Loop',
        stateText: 'Synthesizer agent checks if response meets pedagogical difficulty target (Grade 8 proficiency).',
        activeNodes: [3],
        visitedNodes: [0, 1, 2, 3],
        frontierNodes: [4],
      },
      {
        title: '04. Unified State Dispatch',
        stateText: 'State updated atomically. Student receives conversational guidance and actionable score breakdown.',
        activeNodes: [4],
        visitedNodes: [0, 1, 2, 3, 4],
        frontierNodes: [],
      },
    ],
  },
];

export const AlgorithmicThinkingVisualizer: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmMode>(ALGORITHMS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= selectedAlgo.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedAlgo]);

  const activeStep = selectedAlgo.steps[currentStepIndex];

  // Visual Graph Nodes coordinates (6 nodes in a responsive grid/network)
  const nodePositions = [
    { id: 0, label: 'SOURCE / INGRESS', x: '12%', y: '50%' },
    { id: 1, label: 'SECTOR ALPHA', x: '35%', y: '25%' },
    { id: 2, label: 'SECTOR BETA', x: '35%', y: '75%' },
    { id: 3, label: 'ROUTING NODE', x: '65%', y: '30%' },
    { id: 4, label: 'CONGESTION BYPASS', x: '65%', y: '70%' },
    { id: 5, label: 'TARGET GOAL', x: '88%', y: '50%' },
  ];

  return (
    <section
      id="how-i-think"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12"
    >
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
          <Cpu className="w-4 h-4" />
          <span>[05] COMPUTATIONAL THINKING & PROBLEM SOLVING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          How I Think: Algorithmic Architecture
        </h2>
        <p className="text-base text-slate-400 max-w-3xl mt-3 leading-relaxed">
          I don't just write prompts; I engineer discrete data structures, graph traversals, and
          deterministic state systems to solve real computational bottlenecks.
        </p>
      </div>

      {/* Main Interactive Algorithm Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Algorithm Selector & Complexity Proof (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            SELECT ALGORITHMIC PARADIGM
          </span>

          <div className="space-y-3">
            {ALGORITHMS.map((algo) => (
              <button
                key={algo.id}
                onClick={() => {
                  setSelectedAlgo(algo);
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                }}
                data-cursor="SELECT"
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  selectedAlgo.id === algo.id
                    ? 'bg-cyan-950/80 border-2 border-cyan-500/60 shadow-xl shadow-cyan-500/10'
                    : 'bg-slate-950/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-sm text-white">{algo.name}</h4>
                  <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {algo.timeComplexity}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  {algo.category}
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {algo.realWorldApplication}
                </p>
              </button>
            ))}
          </div>

          {/* Theoretical & Practical Metrics Card */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-slate-400 uppercase tracking-wider text-[11px] pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>COMPLEXITY PROOF</span>
              <span className="text-emerald-400">OPTIMAL</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">TIME COMPLEXITY:</span>
              <span className="text-cyan-300 font-bold">{selectedAlgo.timeComplexity}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">SPACE COMPLEXITY:</span>
              <span className="text-violet-300 font-bold">{selectedAlgo.spaceComplexity}</span>
            </div>

            <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-400 leading-relaxed font-sans">
              <strong className="text-white font-mono block mb-1">PRODUCTION RATIONALE:</strong>
              {selectedAlgo.description}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Graph Execution Engine (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Visual Execution Canvas */}
          <div className="relative rounded-3xl bg-[#0a0d15] border border-cyan-500/30 p-6 sm:p-8 min-h-[380px] shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Canvas Controls */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  REAL-TIME STATE TRAVERSAL SIMULATION
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedAlgo.name}
                </h3>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  data-cursor="PLAY"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Play className={`w-3.5 h-3.5 ${isPlaying ? 'fill-white' : ''}`} />
                  <span>{isPlaying ? 'PAUSE' : 'SIMULATE'}</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setIsPlaying(false);
                  }}
                  data-cursor="RESET"
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all"
                  title="Reset Algorithm"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Graph Node Diagram */}
            <div className="relative my-8 h-48 sm:h-56 w-full">
              {/* Connection Edges SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="15%" y1="50%" x2="35%" y2="25%" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="15%" y1="50%" x2="35%" y2="75%" stroke="#334155" strokeWidth="2" />
                <line x1="35%" y1="25%" x2="65%" y2="30%" stroke="#334155" strokeWidth="2" />
                <line x1="35%" y1="75%" x2="65%" y2="70%" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="65%" y1="30%" x2="88%" y2="50%" stroke="#334155" strokeWidth="2" />
                <line x1="65%" y1="70%" x2="88%" y2="50%" stroke="#334155" strokeWidth="2" />

                {/* Highlight Active Path */}
                {activeStep.visitedNodes.includes(0) && activeStep.visitedNodes.includes(1) && (
                  <line x1="15%" y1="50%" x2="35%" y2="25%" stroke="#06b6d4" strokeWidth="3" />
                )}
                {activeStep.visitedNodes.includes(0) && activeStep.visitedNodes.includes(3) && (
                  <line x1="15%" y1="50%" x2="65%" y2="30%" stroke="#06b6d4" strokeWidth="3" />
                )}
                {activeStep.visitedNodes.includes(3) && activeStep.visitedNodes.includes(5) && (
                  <line x1="65%" y1="30%" x2="88%" y2="50%" stroke="#06b6d4" strokeWidth="3" />
                )}
              </svg>

              {/* Render Nodes */}
              {nodePositions.map((node) => {
                const isActive = activeStep.activeNodes.includes(node.id);
                const isVisited = activeStep.visitedNodes.includes(node.id);
                const isFrontier = activeStep.frontierNodes.includes(node.id);

                return (
                  <div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300"
                    style={{ left: node.x, top: node.y }}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-cyan-500 text-black scale-110 shadow-[0_0_24px_rgba(6,182,212,0.8)]'
                          : isVisited
                          ? 'bg-cyan-950 border-2 border-cyan-400 text-cyan-300'
                          : isFrontier
                          ? 'bg-amber-950/80 border border-amber-400/80 text-amber-300 animate-pulse'
                          : 'bg-slate-900 border border-slate-700 text-slate-500'
                      }`}
                    >
                      N{node.id}
                    </div>
                    <span className="text-[9px] font-mono mt-1.5 text-slate-400 whitespace-nowrap bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800">
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Current Step Description & Telemetry */}
            <div className="relative z-10 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  STEP 0{currentStepIndex + 1} OF 0{selectedAlgo.steps.length} — {activeStep.title}
                </span>
                <div className="flex items-center gap-1.5">
                  {selectedAlgo.steps.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        setCurrentStepIndex(sIdx);
                        setIsPlaying(false);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        currentStepIndex === sIdx
                          ? 'w-6 bg-cyan-400'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      title={`Jump to step ${sIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                {activeStep.stateText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
