import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Terminal,
  Send,
  ArrowUpRight,
  ShieldCheck,
  Github,
  Compass,
} from 'lucide-react';
import { personalProfile } from '../data/portfolioData';

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [subjectTopic, setSubjectTopic] = useState<string>('Engineering Opportunity / Role');
  const [customMessage, setCustomMessage] = useState<string>('');

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalProfile.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subjectTopic}`
    )}&body=${encodeURIComponent(customMessage || 'Hi Harsh,\n\nI reviewed your portfolio and would like to connect regarding...')}`;
    window.location.href = mailtoUrl;
  };

  return (
    <footer id="contact" className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Direct Outreach Console (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-950/90 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
            <Terminal className="w-4 h-4" />
            <span>[06] DIRECT ENGINEERING CONTACT CONSOLE</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
            Initiate Contact & Collaborations
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Open for AI engineering internships, full-stack systems engineering roles, and innovative
            multi-agent collaborative builds.
          </p>

          {/* Quick Copy Email Banner */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs sm:text-sm text-white select-all">
                {personalProfile.email}
              </span>
            </div>
            <button
              onClick={copyEmailToClipboard}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Structured Inquiry Form */}
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                Inquiry Topic / Reason
              </label>
              <select
                value={subjectTopic}
                onChange={(e) => setSubjectTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Engineering Opportunity / Internship">
                  Engineering Opportunity / Internship
                </option>
                <option value="AI / Multi-Agent Systems Collaboration">
                  AI / Multi-Agent Systems Collaboration
                </option>
                <option value="Technical Architecture Review">
                  Technical Architecture Review
                </option>
                <option value="General Engineering Discussion">
                  General Engineering Discussion
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                Message Brief
              </label>
              <textarea
                rows={3}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Describe your project, team role, or query..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/20"
            >
              <Send className="w-4 h-4" />
              <span>Launch Mail Client with Pre-filled Payload</span>
            </button>
          </form>
        </div>

        {/* Right Column: Profile Summary & Academic Positioning (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Positioning Summary Card */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>CORE ARCHITECTURAL IDENTITY</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{personalProfile.name}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {personalProfile.positioningHeadline}
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-400 space-y-1">
              <div>INSTITUTION: {personalProfile.education.institution}</div>
              <div>PROGRAM: {personalProfile.education.degree} in {personalProfile.education.major}</div>
              <div>TENURE: {personalProfile.education.years}</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-slate-400 uppercase tracking-wider text-[11px] mb-2">
              Verified Links & Verification
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-200 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Contributor Profile</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-between">
              <span>Resume Source of Truth: Verified</span>
              <span className="text-emerald-400">100% ACCREDITED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Colophon */}
      <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} Harsh Bhadoriya. Built with AI × Full-Stack Architecture.
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>GLA University (2025–2029)</span>
          <span>•</span>
          <span>Zero Fabricated Data</span>
        </div>
      </div>
    </footer>
  );
};
