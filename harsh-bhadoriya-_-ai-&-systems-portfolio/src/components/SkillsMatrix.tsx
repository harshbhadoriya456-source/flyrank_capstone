import React, { useState } from 'react';
import {
  Code,
  Layers,
  Sparkles,
  Database,
  Cloud,
  CheckCircle2,
  Terminal,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { SkillCategory, SkillItem } from '../types';

export const SkillsMatrix: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('ai-ml');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(
    skillCategories[2].skills[0] // Gemini AI default
  );

  const activeCategory: SkillCategory =
    skillCategories.find((c) => c.id === activeCategoryId) || skillCategories[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'languages':
        return Code;
      case 'build':
        return Layers;
      case 'ai-ml':
        return Sparkles;
      case 'data':
        return Database;
      case 'cloud-devops':
        return Cloud;
      default:
        return Terminal;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
          <Terminal className="w-4 h-4" />
          <span>[04] TECHNICAL CAPABILITIES MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Production Tech Stack & Frameworks
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
          Structured system competencies across generative AI pipelines, full-stack frameworks, relational
          data modeling, and containerized cloud runtimes.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
        {skillCategories.map((category) => {
          const Icon = getCategoryIcon(category.id);
          const isActive = activeCategoryId === category.id;

          return (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategoryId(category.id);
                setSelectedSkill(category.skills[0] || null);
              }}
              onMouseEnter={() => {
                setActiveCategoryId(category.id);
                setSelectedSkill(category.skills[0] || null);
              }}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}
                />
                <span className="text-[10px] font-mono text-slate-400">
                  {category.skills.length} TECHS
                </span>
              </div>
              <span className="font-bold text-xs sm:text-sm text-white block tracking-tight">
                {category.title}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Skills List (Left 7) + Deep Inspector (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Skills Cards Grid */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span>{activeCategory.subtitle}</span>
            <span>Click/Hover to inspect</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeCategory.skills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;

              return (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                      : 'bg-slate-950/80 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white">{skill.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        skill.level === 'Core'
                          ? 'bg-cyan-950/70 border border-cyan-500/30 text-cyan-300'
                          : skill.level === 'Advanced'
                          ? 'bg-violet-950/70 border border-violet-500/30 text-violet-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                    <span>Used in {skill.usedIn.length} system modules</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deep Skill Inspector Panel */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 p-6 backdrop-blur-md sticky top-24 shadow-2xl">
          {selectedSkill ? (
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  TECHNOLOGY PROFILE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
                  {selectedSkill.level} Competency
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {selectedSkill.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {selectedSkill.description}
              </p>

              {/* Projects Utilizing this Tech */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  System Implementations & Applied Projects
                </span>
                <div className="space-y-2">
                  {selectedSkill.usedIn.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{proj}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">PROD-READY</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              Select or hover any skill to inspect implementation details.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
