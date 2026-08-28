export type ProjectCategory = 'ai-system' | 'fullstack-cloud' | 'creative-ui' | 'backend-api' | 'interactive';

export interface ArchitectureNode {
  id: string;
  name: string;
  category: 'input' | 'orchestrator' | 'agent' | 'memory' | 'storage' | 'output';
  role: string;
  purpose: string;
  responsibilities: string[];
  technology: string[];
  connections: string[];
  payloadExample?: {
    input: string;
    output: string;
  };
}

export interface CaseStudyData {
  problem: string;
  whatIDid: string[];
  whatCameOfIt: string;
  architectureHighlights: string[];
  keyTechnicalDecisions: {
    decision: string;
    rationale: string;
  }[];
  visualOrDesignDecisions?: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  highlightType: 'flagship-ai' | 'command-center' | 'creative-cyborg' | 'compact-app' | 'backend-core';
  featured: boolean;
  myRole: string;
  technologies: string[];
  metricsOrHighlights: string[];
  caseStudy: CaseStudyData;
  architectureNodes?: ArchitectureNode[];
  githubUrl?: string;
  demoUrl?: string;
  isEditableOutcomePlaceholder?: boolean;
}

export interface SkillItem {
  name: string;
  level: 'Core' | 'Advanced' | 'Proficient';
  usedIn: string[];
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  period: string;
  description: string;
  keyContributions: string[];
  technologies: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
  type: 'Official Certification' | 'Job Simulation' | 'Intensive Course' | 'Virtual Internship';
  credentialBadge: string;
  verificationTopic: string;
}

export interface PersonalProfile {
  name: string;
  title: string;
  positioningHeadline: string;
  supportingLine: string;
  education: {
    degree: string;
    major: string;
    institution: string;
    years: string;
    currentStatus: string;
  };
  email: string;
  github: string;
  achievements: string[];
  areasOfInterest: string[];
}
