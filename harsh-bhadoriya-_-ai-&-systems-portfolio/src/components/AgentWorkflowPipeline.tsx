import React, { useState } from 'react';
import {
  Workflow,
  Sparkles,
  ShieldAlert,
  GitBranch,
  Database,
  Terminal,
  Activity,
  CheckCircle2,
  Server,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface PipelineStage {
  id: string;
  stageNumber: string;
  name: string;
  tagline: string;
  coreDisciplines: string[];
  codeOrSchemaSnippet: string;
  whyItMatters: string;
  keyOutputs: string[];
}

const WORKFLOW_STAGES: PipelineStage[] = [
  {
    id: 'schemas',
    stageNumber: '01',
    name: 'Deterministic Schema & Guardrails',
    tagline: 'Eliminating hallucinations before LLM generation starts.',
    coreDisciplines: ['Zod / Pydantic Typed Schemas', 'Structured JSON Output Mode', 'Strict Ingress Validation'],
    codeOrSchemaSnippet: `// Deterministic Agent Contract
const AgentOutputSchema = z.object({
  intent: z.enum(['GRAMMAR', 'PRONUNCIATION', 'PEDAGOGY']),
  confidenceScore: z.number().min(0).max(1),
  remediationPlan: z.array(z.string()),
  requiresHumanEscalation: z.boolean(),
});`,
    whyItMatters:
      'Production LLMs must never emit unpredictable unstructured strings. Strict contract validation prevents silent pipeline crashes.',
    keyOutputs: ['Zero parse failures', 'Type-safe client state', 'Guaranteed schema adherence'],
  },
  {
    id: 'langgraph',
    stageNumber: '02',
    name: 'Stateful LangGraph Orchestration',
    tagline: 'Cyclic multi-agent collaboration with persistent graph state.',
    coreDisciplines: ['Cyclic State Graphs', 'Conditional Edge Branching', 'Human-in-the-Loop Interrupts'],
    codeOrSchemaSnippet: `// LangGraph Cyclical Workflow
const workflow = new StateGraph<AgentState>()
  .addNode("orchestrator", orchestratorNode)
  .addNode("tutor", tutorPedagogyNode)
  .addNode("evaluator", reflectionCheckNode)
  .addConditionalEdges("evaluator", routeDecision, {
    retry: "tutor",
    dispatch: END
  });`,
    whyItMatters:
      'Linear pipelines break on complex reasoning. Cyclic graph execution allows agents to self-critique, refine, and verify outputs before user delivery.',
    keyOutputs: ['Multi-turn reflection loops', 'Isolated agent state', 'Bounded recovery cycles'],
  },
  {
    id: 'rag-memory',
    stageNumber: '03',
    name: 'Grounded Hybrid RAG & Vector Memory',
    tagline: 'Sub-150ms semantic recall with vector embeddings.',
    coreDisciplines: ['ChromaDB & pgvector', 'Reciprocal Rank Fusion', 'Metadata Pre-Filtering'],
    codeOrSchemaSnippet: `// Hybrid Context Retrieval
const context = await vectorStore.similaritySearch({
  query: userUtterance,
  k: 4,
  filter: { studentProficiency: "INTERMEDIATE", domain: "TECHNICAL_INTERVIEW" }
});`,
    whyItMatters:
      'Context windows are expensive and prone to distraction. High-precision semantic recall grounds LLM responses in verified domain truth.',
    keyOutputs: ['Relevant historical recall', 'Context window optimization', 'Domain grounded responses'],
  },
  {
    id: 'observability',
    stageNumber: '04',
    name: 'Observability & Automated Eval',
    tagline: 'Tracking latency, token costs, and safety metrics continuously.',
    coreDisciplines: ['Telemetry Tracing', 'Ragas / Evals Metrics', 'Cost & Latency Dashboards'],
    codeOrSchemaSnippet: `// Observability & Telemetry Trace
tracer.recordEvent({
  step: "agent_execution",
  durationMs: 242,
  tokensConsumed: 480,
  hallucinationRisk: 0.02,
  cacheHit: true
});`,
    whyItMatters:
      'You cannot optimize what you do not measure. Real-time telemetry surfaces latency spikes and prompt degradation instantly.',
    keyOutputs: ['Sub-second latency verification', 'Token consumption tracking', 'Audit trails'],
  },
  {
    id: 'cloud-deploy',
    stageNumber: '05',
    name: 'Containerized Production Deployment',
    tagline: 'Multi-stage Docker containers on high-speed serverless runtimes.',
    coreDisciplines: ['Docker Multi-Stage Builds', 'Google Cloud Run', 'WebSocket Streaming'],
    codeOrSchemaSnippet: `// Production Runtime Specs
FROM node:20-alpine AS runner
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server.cjs"]`,
    whyItMatters:
      'AI apps require elastic scaling with zero container cold-start penalties and fast HTTP/WebSocket chunked streaming.',
    keyOutputs: ['Scale-to-zero efficiency', 'Low cold-start latency', 'Production uptime'],
  },
];

export const AgentWorkflowPipeline: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('schemas');
  const activeStage = WORKFLOW_STAGES.find((s) => s.id === activeStageId) || WORKFLOW_STAGES[0];

  return (
    <section
      id="how-i-work"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12"
    >
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
          <Workflow className="w-4 h-4" />
          <span>[06] ENGINEERING LIFECYCLE & MULTI-AGENT WORKFLOW</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          How I Work: AI Systems Pipeline
        </h2>
        <p className="text-base text-slate-400 max-w-3xl mt-3 leading-relaxed">
          From deterministic typing and LangGraph multi-agent cycles to hybrid vector memory and
          observability—this is my repeatable blueprint for shipping production AI.
        </p>
      </div>

      {/* Interactive Horizontal / Vertical Stage Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {WORKFLOW_STAGES.map((stage) => {
          const isSelected = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              data-cursor="STAGE"
              className={`p-4 rounded-2xl text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-cyan-950/90 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-mono text-xs font-bold ${
                    isSelected ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                >
                  STAGE {stage.stageNumber}
                </span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-2">
                {stage.name}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Stage Deep Dive Showcase */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-950/90 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-2xl">
        {/* Left Explanation (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xl font-black text-cyan-400">
                {activeStage.stageNumber}
              </span>
              <span className="h-4 w-px bg-slate-700" />
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                CORE STAGE SPECIFICATION
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {activeStage.name}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-mono">
              {activeStage.tagline}
            </p>
          </div>

          {/* Why It Matters */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
              PRODUCTION SIGNIFICANCE:
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeStage.whyItMatters}
            </p>
          </div>

          {/* Disciplines */}
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Key Methodologies & Tools
            </span>
            <div className="flex flex-wrap gap-2">
              {activeStage.coreDisciplines.map((d, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Architectural Outcomes
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeStage.keyOutputs.map((out, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-black/40 p-2.5 rounded-xl border border-slate-800/80"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Code / Execution Artifact (6 cols) */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl bg-black/95 border border-slate-800 p-5 font-mono text-xs shadow-2xl overflow-hidden space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300">pipeline-spec.ts</span>
              </div>
              <span className="text-[10px] text-emerald-400">STAGE {activeStage.stageNumber} // ACTIVE</span>
            </div>

            <pre className="text-slate-200 overflow-x-auto text-[11px] sm:text-xs leading-relaxed py-2 font-mono">
              <code>{activeStage.codeOrSchemaSnippet}</code>
            </pre>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
              <span>Deterministic Execution: VALIDATED</span>
              <span className="text-cyan-400">Harsh Bhadoriya Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
