import React from 'react';
import {
  Briefcase,
  Award,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Compass,
} from 'lucide-react';
import {
  experienceData,
  certificationsData,
  personalProfile,
} from '../data/portfolioData';

export const ExperienceAndCertifications: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
          <Briefcase className="w-4 h-4" />
          <span>[05] VERIFIED EXPERIENCE & CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Industry Internships & Certifications
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
          Authoritative professional history, hands-on engineering internships, and specialized technical
          accreditations from Google, Kaggle, DecodeLabs, and top financial/consulting simulations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Experience + Education (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              <Briefcase className="w-4 h-4" />
              <span>Engineering Internships</span>
            </div>

            <div className="space-y-4">
              {experienceData.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 mr-2">
                        {exp.type}
                      </span>
                      <h3 className="text-lg font-bold text-white inline-block">
                        {exp.role} — <span className="text-cyan-300">{exp.company}</span>
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Contributions */}
                  <div className="space-y-1.5 mb-4">
                    {exp.keyContributions.map((item, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-900">
                    {exp.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-900 text-[11px] font-mono text-slate-300 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Institutional Background */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-violet-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Engineering Foundation</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-violet-500/30 backdrop-blur-sm">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {personalProfile.education.degree} in {personalProfile.education.major}
                  </h3>
                  <span className="text-sm font-mono text-violet-300">
                    {personalProfile.education.institution}
                  </span>
                </div>
                <span className="text-xs font-mono text-violet-300 bg-violet-950/50 px-2.5 py-1 rounded-lg border border-violet-500/30">
                  {personalProfile.education.years}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Focused coursework & practical implementation in Algorithms, Multi-Agent Systems,
                Distributed Cloud Architecture, and Software Engineering.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Certifications + Achievements + Interests (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Verified Certifications */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              <Award className="w-4 h-4" />
              <span>Authoritative Certifications</span>
            </div>

            <div className="space-y-3">
              {certificationsData.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-xs sm:text-sm text-white">{cert.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 shrink-0">
                      {cert.issuer}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                    {cert.verificationTopic}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{cert.type}</span>
                    <span className="text-cyan-400">{cert.credentialBadge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Achievements</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <ul className="space-y-2 font-mono text-xs text-slate-300">
                {personalProfile.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">›</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Areas of Interest */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              <Compass className="w-4 h-4" />
              <span>Areas of Interest</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {personalProfile.areasOfInterest.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
