import React from 'react';
import { X, CheckCircle, Code2, Cpu, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#0b0e17] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
            <span>PROJECT CASE STUDY // {project.number}</span>
            <span>•</span>
            <span>ROLE: {project.myRole}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            {project.title}
          </h2>
          <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
            {project.tagline}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3-Part Case Study Framework */}
        <div className="space-y-8">
          {/* 01 - PROBLEM */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-red-500/20">
            <div className="flex items-center gap-2 font-mono text-xs text-red-400 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>01 — THE PROBLEM</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>

          {/* 02 - WHAT I DID */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-cyan-500/20">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>02 — WHAT I DID (ENGINEERING & ARCHITECTURE)</span>
            </div>
            <ul className="space-y-2.5">
              {caseStudy.whatIDid.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 03 - WHAT CAME OF IT */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-emerald-500/20">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>03 — WHAT CAME OF IT (SYSTEM OUTCOME)</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {caseStudy.whatCameOfIt}
            </p>
          </div>

          {/* Architecture Highlights & Key Decisions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Architecture Highlights */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-violet-400 uppercase tracking-wider mb-3">
                <Cpu className="w-4 h-4" />
                <span>Architecture Highlights</span>
              </div>
              <ul className="space-y-2">
                {caseStudy.architectureHighlights.map((arch, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-violet-400 font-mono">›</span>
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Technical Decisions */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-3">
                <Code2 className="w-4 h-4" />
                <span>Key Technical Decisions</span>
              </div>
              <div className="space-y-3">
                {caseStudy.keyTechnicalDecisions.map((techDec, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="font-semibold text-white block mb-0.5">
                      {techDec.decision}
                    </span>
                    <span className="text-slate-400 leading-relaxed block">
                      {techDec.rationale}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual/Design Decisions if present */}
          {caseStudy.visualOrDesignDecisions && caseStudy.visualOrDesignDecisions.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Visual & Interface Decisions</span>
              </div>
              <ul className="space-y-2">
                {caseStudy.visualOrDesignDecisions.map((vis, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-amber-400 font-mono">›</span>
                    <span>{vis}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Source: Authoritative Resume of Harsh Bhadoriya
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-all"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
