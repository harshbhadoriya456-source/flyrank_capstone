import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicArrivalIntro } from './components/CinematicArrivalIntro';
import { StoryBackgroundAnimation } from './components/StoryBackgroundAnimation';
import { HeroSection } from './components/HeroSection';
import { PinnedProjectStory } from './components/PinnedProjectStory';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { AlgorithmicThinkingVisualizer } from './components/AlgorithmicThinkingVisualizer';
import { AgentWorkflowPipeline } from './components/AgentWorkflowPipeline';
import { ArchitectureVisualizer } from './components/ArchitectureVisualizer';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceAndCertifications } from './components/ExperienceAndCertifications';
import { ContactFooter } from './components/ContactFooter';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressHUD } from './components/ScrollProgressHUD';
import { KineticEditorialWords } from './components/KineticEditorialWords';
import { ProjectItem } from './types';
import { projectsData } from './data/portfolioData';

export default function App() {
  const [selectedCaseStudyProject, setSelectedCaseStudyProject] = useState<ProjectItem | null>(null);

  const handleOpenCaseStudyById = (projectId: string) => {
    const found = projectsData.find((p) => p.id === projectId);
    if (found) {
      setSelectedCaseStudyProject(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Precision Interactive Cursor for Desktop */}
      <CustomCursor />

      {/* Persistent Dynamic Story Background Animation across entire narrative */}
      <StoryBackgroundAnimation />

      {/* Floating Vertical Futuristic HUD Navigator */}
      <ScrollProgressHUD />

      {/* Persistent Engineering Navbar */}
      <Navbar />

      {/* ============================================================== */}
      {/* SCENE 01: THE CINEMATIC ARRIVAL (3D HYPERSONIC JET & AIRSPACE) */}
      {/* ============================================================== */}
      <CinematicArrivalIntro
        onExploreClick={() => {
          const el = document.getElementById('hero');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Kinetic Transition Word */}
      <KineticEditorialWords
        primaryWord="BUILD."
        subText="Architecting deterministic multi-agent systems and real-time operations engines."
        accentColor="text-cyan-400"
      />

      {/* ============================================================== */}
      {/* SCENE 02 & 03: IDENTITY & 3D DISTRIBUTED INTELLIGENT SYSTEM */}
      {/* ============================================================== */}
      <HeroSection />

      {/* ============================================================== */}
      {/* SCENE 04: WHAT I BUILD (PINNED SCROLL STORYTELLING & SHOWCASE) */}
      {/* ============================================================== */}
      <div id="scene-journey" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PinnedProjectStory onOpenCaseStudy={handleOpenCaseStudyById} />
      </div>

      {/* Flagship Production Projects & Live Simulators */}
      <ProjectsShowcase onOpenCaseStudy={(project) => setSelectedCaseStudyProject(project)} />

      {/* Kinetic Transition Word */}
      <KineticEditorialWords
        primaryWord="THINK."
        subText="Graph traversals, sliding window token caching, and discrete state machines."
        accentColor="text-violet-400"
      />

      {/* ============================================================== */}
      {/* SCENE 05: HOW I THINK (DSA & COMPUTATIONAL THINKING) */}
      {/* ============================================================== */}
      <AlgorithmicThinkingVisualizer />

      {/* Interactive Multi-Agent Architecture Inspector */}
      <ArchitectureVisualizer />

      {/* Kinetic Transition Word */}
      <KineticEditorialWords
        primaryWord="CREATE."
        subText="Grounded RAG vectors, structured contracts, and real-time observability."
        accentColor="text-emerald-400"
      />

      {/* ============================================================== */}
      {/* SCENE 06: HOW I WORK (AI SYSTEMS LIFECYCLE & PIPELINE) */}
      {/* ============================================================== */}
      <AgentWorkflowPipeline />

      {/* Categorized Technical Capabilities Matrix */}
      <SkillsMatrix />

      {/* Real Experience, Certifications & Authoritative Credentials */}
      <ExperienceAndCertifications />

      {/* Kinetic Transition Word */}
      <KineticEditorialWords
        primaryWord="DEPLOY."
        subText="Scalable containerized cloud runtimes with sub-second streaming latency."
        accentColor="text-cyan-300"
      />

      {/* ============================================================== */}
      {/* SCENE 07: CONTACT & RESOLUTION */}
      {/* ============================================================== */}
      <ContactFooter />

      {/* Structured 3-Part Case Study Deep Dive Modal */}
      <CaseStudyModal
        project={selectedCaseStudyProject}
        onClose={() => setSelectedCaseStudyProject(null)}
      />
    </div>
  );
}
