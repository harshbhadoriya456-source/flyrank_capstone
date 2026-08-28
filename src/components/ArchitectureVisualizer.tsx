import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  Cpu,
  Database,
  ArrowRight,
  Play,
  CheckCircle,
  Activity,
  GitFork,
  Radio,
  Layers,
  ShieldAlert,
  Server,
  Zap,
} from 'lucide-react';
import { ArchitectureNode, ProjectItem } from '../types';
import { projectsData } from '../data/portfolioData';

interface ArchitectureVisualizerProps {
  initialProjectId?: string;
}

export const ArchitectureVisualizer: React.FC<ArchitectureVisualizerProps> = ({
  initialProjectId = 'polytutor-ai',
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('orchestrator');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const activeProject: ProjectItem =
    projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];
  const nodes = activeProject.architectureNodes || [];
  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0] || null;

  // Run interactive multi-agent simulation step sequence
  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 1200);
    setTimeout(() => setSimStep(3), 2600);
    setTimeout(() => setSimStep(4), 4000);
    setTimeout(() => {
      setIsSimulating(false);
      setSimStep(0);
    }, 5500);
  };

  const getNodeIcon = (category: ArchitectureNode['category']) => {
    switch (category) {
      case 'input':
        return Radio;
      case 'orchestrator':
        return Cpu;
      case 'agent':
        return Bot;
      case 'memory':
        return Brain;
      case 'storage':
        return Database;
      case 'output':
        return Sparkles;
      default:
        return Layers;
    }
  };

  const getCategoryColor = (category: ArchitectureNode['category']) => {
    switch (category) {
      case 'input':
        return 'text-sky-400 border-sky-500/40 bg-sky-950/30';
      case 'orchestrator':
        return 'text-cyan-300 border-cyan-400/60 bg-cyan-950/40 shadow-lg shadow-cyan-500/20';
      case 'agent':
        return 'text-violet-300 border-violet-500/40 bg-violet-950/30';
      case 'memory':
        return 'text-emerald-300 border-emerald-500/40 bg-emerald-950/30';
      case 'output':
        return 'text-amber-300 border-amber-500/40 bg-amber-950/30';
      default:
        return 'text-slate-300 border-slate-700 bg-slate-900';
    }
  };

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
            <GitFork className="w-4 h-4" />
            <span>[03] TECHNICAL ARCHITECTURE INSPECTOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Multi-Agent Systems & Dataflow Engineering
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
            Direct inspection of distributed AI pipelines, LangGraph state machines, vector memory graphs,
            and real-time streaming architectures.
          </p>
        </div>

        {/* Project Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => {
              setSelectedProjectId('polytutor-ai');
              setSelectedNodeId('orchestrator');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              selectedProjectId === 'polytutor-ai'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>01 — PolyTutor AI</span>
          </button>
          <button
            onClick={() => {
              setSelectedProjectId('stadiummind-ai');
              setSelectedNodeId('stadium-orchestrator');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              selectedProjectId === 'stadiummind-ai'
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>02 — StadiumMind AI</span>
          </button>
        </div>
      </div>

      {/* Main Architecture Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Graph Diagram (Left / Top 7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-950/80 border border-slate-800 p-5 sm:p-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">
                {activeProject.title} // Interactive Node Graph
              </span>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-all ${
                isSimulating
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 cursor-wait'
                  : 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? `Pipelining (Step ${simStep}/4)...` : 'Simulate Packet Flow'}</span>
            </button>
          </div>

          {/* Simulation Progress Ribbon */}
          {isSimulating && (
            <div className="mb-4 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono text-cyan-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 animate-spin text-cyan-400" />
                <span>
                  {simStep === 1 && 'Step 1: Capturing and tokenizing inbound input payload...'}
                  {simStep === 2 && 'Step 2: AI Orchestrator dispatching tasks to parallel sub-agents...'}
                  {simStep === 3 && 'Step 3: Querying ChromaDB Vector memory & running specialized reasoning...'}
                  {simStep === 4 && 'Step 4: Consolidating unified pedagogical output stream!'}
                </span>
              </div>
              <span className="text-cyan-400 font-bold">{simStep * 25}%</span>
            </div>
          )}

          {/* Node Graph Hierarchy */}
          <div className="space-y-4">
            {/* Layer 1: Input */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                Stage 01: Ingress Layer
              </span>
              {nodes
                .filter((n) => n.category === 'input')
                .map((node) => {
                  const Icon = getNodeIcon(node.category);
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`w-full max-w-md p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/50 shadow-md shadow-cyan-500/20'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-sky-400" />
                          <span className="font-semibold text-xs text-white">{node.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-sky-400 px-2 py-0.5 rounded bg-sky-950/50">
                          {node.role}
                        </span>
                      </div>
                    </button>
                  );
                })}
              <div className="h-6 w-px bg-gradient-to-b from-sky-400/60 to-cyan-400/60 my-1" />
            </div>

            {/* Layer 2: Orchestrator */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
                Stage 02: Core AI Orchestrator & State Machine
              </span>
              {nodes
                .filter((n) => n.category === 'orchestrator')
                .map((node) => {
                  const Icon = getNodeIcon(node.category);
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`w-full max-w-lg p-3.5 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/70 shadow-xl shadow-cyan-500/30 ring-1 ring-cyan-400'
                          : 'border-cyan-500/40 bg-slate-900/80 hover:border-cyan-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider block">
                              LangGraph Mesh Coordinator
                            </span>
                            <span className="font-bold text-sm text-white">{node.name}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-900/40 border border-cyan-500/30">
                          PARALLEL DISPATCH
                        </span>
                      </div>
                    </button>
                  );
                })}
              <div className="h-6 w-px bg-gradient-to-b from-cyan-400/60 to-violet-400/60 my-1" />
            </div>

            {/* Layer 3: Sub-Agents Grid */}
            <div>
              <div className="text-center mb-2">
                <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">
                  Stage 03: Specialized Execution Agents
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {nodes
                  .filter((n) => n.category === 'agent')
                  .map((node) => {
                    const Icon = getNodeIcon(node.category);
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-violet-400 bg-violet-950/60 shadow-lg shadow-violet-500/20 ring-1 ring-violet-400'
                            : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5 text-violet-400" />
                            <span className="font-semibold text-xs text-white">{node.name}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{node.role}</p>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Layer 4: Memory & Storage Layer */}
            {nodes.filter((n) => n.category === 'memory' || n.category === 'storage').length > 0 && (
              <div className="pt-2">
                <div className="text-center mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                    Stage 04: Vector Semantic Memory & Persistent Layer
                  </span>
                </div>
                {nodes
                  .filter((n) => n.category === 'memory' || n.category === 'storage')
                  .map((node) => {
                    const Icon = getNodeIcon(node.category);
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-950/60 shadow-lg shadow-emerald-500/20'
                            : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-emerald-400" />
                            <div>
                              <span className="font-semibold text-xs text-white block">{node.name}</span>
                              <span className="text-[10px] text-slate-400">{node.role}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30">
                            ChromaDB + PostgreSQL
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            )}

            {/* Layer 5: Output */}
            <div className="flex flex-col items-center pt-2">
              <div className="h-4 w-px bg-gradient-to-b from-emerald-400/60 to-amber-400/60 mb-1" />
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1.5">
                Stage 05: Consolidated Synthesized Output
              </span>
              {nodes
                .filter((n) => n.category === 'output')
                .map((node) => {
                  const Icon = getNodeIcon(node.category);
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`w-full max-w-md p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-400 bg-amber-950/50 shadow-lg shadow-amber-500/20'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-amber-400" />
                          <span className="font-semibold text-xs text-white">{node.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-950/40">
                          {node.role}
                        </span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Node Deep Inspection Panel (Right / 5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-950/90 border border-slate-800 p-6 backdrop-blur-md sticky top-24 shadow-2xl">
          {activeNode ? (
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border uppercase tracking-wider ${getCategoryColor(activeNode.category)}`}>
                  {activeNode.category} COMPONENT
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  ID: {activeNode.id}
                </span>
              </div>

              {/* Title & Role */}
              <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                {activeNode.name}
              </h3>
              <p className="text-xs font-mono text-cyan-400 mb-4">
                ROLE: {activeNode.role}
              </p>

              {/* Purpose */}
              <div className="mb-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Purpose & System Objective
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeNode.purpose}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  System Responsibilities
                </span>
                <ul className="space-y-1.5">
                  {activeNode.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack Tags */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Integrated Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.technology.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulated Payload Inspector */}
              {activeNode.payloadExample && (
                <div className="p-3 rounded-xl bg-black/70 border border-slate-800 font-mono text-[11px]">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">
                    Live Payload Sample
                  </span>
                  <div className="text-sky-300 mb-1">
                    <span className="text-slate-500">IN:</span> {activeNode.payloadExample.input}
                  </div>
                  <div className="text-emerald-300">
                    <span className="text-slate-500">OUT:</span> {activeNode.payloadExample.output}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              Select any architecture node on the graph to inspect technical details.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
