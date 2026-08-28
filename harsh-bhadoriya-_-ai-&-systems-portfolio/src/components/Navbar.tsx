import React, { useState, useEffect } from 'react';
import { Terminal, Shield, GitBranch, ArrowUpRight, Mail, Menu, X } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '[01] ARRIVAL', href: '#cinematic-hero-arrival' },
    { label: '[02] IDENTITY', href: '#hero' },
    { label: '[03] PROJECTS', href: '#projects' },
    { label: '[04] HOW I THINK', href: '#how-i-think' },
    { label: '[05] HOW I WORK', href: '#how-i-work' },
    { label: '[06] ARCHITECTURE', href: '#architecture' },
    { label: '[07] CONTACT', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090d]/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Identity */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center font-mono text-cyan-400 font-bold text-xs shadow-md group-hover:border-cyan-400 transition-all">
            HB
          </div>
          <div>
            <span className="font-bold text-sm sm:text-base text-white tracking-tight block leading-tight font-display">
              HARSH BHADORIYA
            </span>
            <span className="text-[10px] font-mono text-cyan-400/90 tracking-wider block">
              AI & SYSTEMS ARCHITECT
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-950/80 border border-slate-800/90 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-slate-900 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Live System Telemetry / Quick Action */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GLA Univ (2025–2029)</span>
          </div>

          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs transition-all flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d14]/95 border-b border-cyan-500/20 px-6 py-5 space-y-3 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-cyan-300 border-b border-slate-800/60"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between text-slate-400">
            <span>B.Tech CSE @ GLA University</span>
            <span className="text-emerald-400">AVAILABLE FOR ROLES</span>
          </div>
        </div>
      )}
    </nav>
  );
};
