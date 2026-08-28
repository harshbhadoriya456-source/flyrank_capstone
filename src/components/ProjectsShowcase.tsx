import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  BookOpen,
  Terminal,
  Activity,
  Zap,
  Play,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { PolyTutorLiveDemo } from './PolyTutorLiveDemo';
import { StadiumOperationsCockpit } from './StadiumOperationsCockpit';
import { TechFestCyborgExperience } from './TechFestCyborgExperience';

interface ProjectsShowcaseProps {
  onOpenCaseStudy: (project: ProjectItem) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onOpenCaseStudy }) => {
  // BrainBolt Mini interactive state
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizTimer, setQuizTimer] = useState<number>(15);

  const polyTutor = projectsData.find((p) => p.id === 'polytutor-ai')!;
  const stadiumMind = projectsData.find((p) => p.id === 'stadiummind-ai')!;
  const techFest = projectsData.find((p) => p.id === 'techfest-cyborg')!;
  const brainBolt = projectsData.find((p) => p.id === 'brainbolt-quiz')!;
  const springBoot = projectsData.find((p) => p.id === 'spring-boot-demo')!;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-28">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
          <Terminal className="w-4 h-4" />
          <span>[02] FLAGSHIP ENGINEERING SYSTEMS & CREATIVE BUILDS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          Featured Production Projects
        </h2>
        <p className="text-base text-slate-400 max-w-3xl mt-3 leading-relaxed">
          Deep technical architectures spanning stateful multi-agent systems, real-time stadium operations
          cockpits, and cybernetic creative interfaces.
        </p>
      </div>

      {/* PROJECT 01: POLYTUTOR AI */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0e121d] to-[#08090d] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Metadata */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-cyan-400">
                {polyTutor.number}
              </span>
              <span className="h-4 w-px bg-slate-700" />
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                FLAGSHIP AI SYSTEM
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              {polyTutor.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {polyTutor.tagline}
            </p>

            {/* Role */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-semibold">MY ROLE: </span>
              {polyTutor.myRole}
            </div>

            {/* Highlights */}
            <div className="space-y-1.5 pt-2">
              {polyTutor.metricsOrHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {polyTutor.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenCaseStudy(polyTutor)}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs font-mono flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Full Case Study (01 Problem → 03 Outcome)</span>
              </button>
              <a
                href="#architecture"
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <span>Inspect Agent Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Live PolyTutor Simulator */}
          <div className="lg:col-span-6">
            <PolyTutorLiveDemo />
          </div>
        </div>
      </div>

      {/* PROJECT 02: STADIUMMIND AI */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0e111d] to-[#08090d] border border-violet-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Metadata */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-violet-400">
                {stadiumMind.number}
              </span>
              <span className="h-4 w-px bg-slate-700" />
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-violet-950/70 border border-violet-500/30 text-violet-300">
                OPERATIONS COMMAND ENGINE
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              {stadiumMind.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {stadiumMind.tagline}
            </p>

            {/* Role */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-violet-400 font-semibold">MY ROLE: </span>
              {stadiumMind.myRole}
            </div>

            {/* Highlights */}
            <div className="space-y-1.5 pt-2">
              {stadiumMind.metricsOrHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {stadiumMind.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-violet-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => onOpenCaseStudy(stadiumMind)}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs font-mono flex items-center gap-2 transition-all shadow-lg shadow-violet-600/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Full Case Study (01 Problem → 03 Outcome)</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Stadium Command Cockpit */}
          <div className="lg:col-span-7">
            <StadiumOperationsCockpit />
          </div>
        </div>
      </div>

      {/* PROJECT 03: TECHFEST CYBORG EXPERIENCE */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0d101a] to-[#07080d] border border-cyan-500/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-cyan-400">
                {techFest.number}
              </span>
              <span className="h-4 w-px bg-slate-700" />
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                FLAGSHIP CREATIVE UI/UX
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              {techFest.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {techFest.tagline}
            </p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-semibold">MY ROLE: </span>
              {techFest.myRole}
            </div>

            <div className="space-y-1.5 pt-2">
              {techFest.metricsOrHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {techFest.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenCaseStudy(techFest)}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs font-mono flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Creative Case Study</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <TechFestCyborgExperience />
          </div>
        </div>
      </div>

      {/* SECONDARY PROJECTS: BRAINBOLT & SPRING BOOT DEMO (Balanced Proportions) */}
      <div>
        <div className="mb-6 flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              TECHNICAL APPLICATIONS & ENTERPRISE CODEBASES
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              Targeted Interactive & Backend Systems
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BrainBolt Quiz */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono text-amber-400 font-bold">{brainBolt.number} // APP</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  Interactive Quiz
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{brainBolt.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{brainBolt.tagline}</p>

              {/* Mini Interactive BrainBolt Feature */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-4 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Timer: 12.4s</span>
                  </span>
                  <span className="text-amber-300">Score: {quizScore} pts</span>
                </div>
                <p className="text-white text-xs mb-3">
                  Q: What data structure powers LangGraph's cyclical multi-agent memory state?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setQuizScore(150);
                      setQuizAnswered(true);
                    }}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-700 hover:border-emerald-400 text-slate-200 text-left text-[11px]"
                  >
                    A) Stateful Graph State
                  </button>
                  <button
                    onClick={() => {
                      setQuizScore(0);
                      setQuizAnswered(true);
                    }}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-700 hover:border-slate-500 text-slate-400 text-left text-[11px]"
                  >
                    B) Plain Text File
                  </button>
                </div>
                {quizAnswered && (
                  <div className="mt-2 text-emerald-400 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Correct! Multi-tier scoring calculated in real-time.</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {brainBolt.technologies.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded bg-slate-900 text-[11px] font-mono text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenCaseStudy(brainBolt)}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-all text-center"
            >
              View BrainBolt Case Study →
            </button>
          </div>

          {/* Spring Boot Demo */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">{springBoot.number} // BACKEND</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  REST Architecture
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{springBoot.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{springBoot.tagline}</p>

              {/* Clean Backend Service Representation */}
              <div className="p-4 rounded-xl bg-black/70 border border-slate-800 mb-4 font-mono text-[11px] space-y-1.5 text-slate-300">
                <div className="text-emerald-400 flex items-center justify-between">
                  <span>GET /api/v1/services/health</span>
                  <span className="text-emerald-300">200 OK (3ms)</span>
                </div>
                <div className="text-slate-400">
                  › Layered Controller → Service → JPA Repository → PostgreSQL
                </div>
                <div className="text-slate-400">
                  › Dockerized Multi-Stage Container Image
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {springBoot.technologies.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded bg-slate-900 text-[11px] font-mono text-emerald-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenCaseStudy(springBoot)}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-all text-center"
            >
              View Spring Boot Case Study →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
