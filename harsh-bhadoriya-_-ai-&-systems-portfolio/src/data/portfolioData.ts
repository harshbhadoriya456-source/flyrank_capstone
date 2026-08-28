import {
  PersonalProfile,
  ProjectItem,
  SkillCategory,
  ExperienceItem,
  CertificationItem,
} from '../types';

export const personalProfile: PersonalProfile = {
  name: 'HARSH BHADORIYA',
  title: 'AI × Generative AI × Full-Stack Engineer',
  positioningHeadline: 'BUILDING INTELLIGENT SYSTEMS FOR THE REAL WORLD.',
  supportingLine: 'AI • FULL-STACK • MULTI-AGENT SYSTEMS • CLOUD',
  education: {
    degree: 'B.Tech',
    major: 'Computer Science Engineering',
    institution: 'GLA University',
    years: '2025–2029',
    currentStatus: 'Undergraduate Computer Science Student',
  },
  email: 'harshbhadoriya456@gmail.com',
  github: 'https://github.com',
  achievements: [
    'AI Intern at FlyRank AI',
    'AI Intern at DecodeLabs',
    'Elite Coders Contributor',
    'Built multiple AI-powered full-stack applications',
    'Active GitHub contributor',
  ],
  areasOfInterest: [
    'Artificial Intelligence',
    'Generative AI',
    'Multi-Agent Systems',
    'Full-Stack Development',
    'Cloud Computing',
    'Open Source',
  ],
};

export const projectsData: ProjectItem[] = [
  {
    id: 'polytutor-ai',
    number: '01',
    title: 'PolyTutor AI',
    tagline: 'Multi-Agent AI Language Learning & Adaptive Mastery Platform',
    category: 'ai-system',
    highlightType: 'flagship-ai',
    featured: true,
    myRole: 'Lead AI Engineer & Full-Stack Architect',
    technologies: [
      'Gemini AI',
      'LangGraph',
      'Next.js',
      'FastAPI',
      'PostgreSQL',
      'ChromaDB',
      'Tailwind CSS',
    ],
    metricsOrHighlights: [
      'Multi-Agent LangGraph Pipeline',
      'Long-Term ChromaDB Vector Memory',
      'Dynamic Adaptive Lesson Generation',
      'Real-Time Pronunciation & Grammar Coaching',
    ],
    caseStudy: {
      problem:
        'Traditional language learning software relies on rigid multiple-choice trees and single-turn chatbot interfaces. Learners suffer from lack of personalized pedagogical continuity, disjointed grammar feedback, zero persistent semantic memory of past pronunciation errors, and synthetic conversational rigidity.',
      whatIDid: [
        'Architected a multi-agent orchestration pipeline using LangGraph and Gemini AI where distinct specialized agents collaborate on each learning turn.',
        'Designed the AI Orchestrator to route learner speech/text to dedicated sub-agents: Tutor Agent, Grammar Agent, Pronunciation Coach, and Conversation Agent.',
        'Engineered persistent learner memory using ChromaDB embeddings for vector similarity search and PostgreSQL for relational proficiency tracking.',
        'Built full-stack Next.js and FastAPI services with low-latency streaming endpoints for real-time pedagogical feedback.',
      ],
      whatCameOfIt:
        'Delivered a fully integrated multi-agent platform capable of holding contextual conversations, preserving learner mistake history across multi-day sessions, and synthesizing custom adaptive drills based on exact user weak points.',
      architectureHighlights: [
        'User Input → LangGraph AI Orchestrator with stateful memory injection.',
        'Parallel execution of Grammar correction & Pronunciation acoustic tokenization.',
        'Vector memory retrieval via ChromaDB to retrieve past mistake patterns.',
        'Consolidated pedagogical lesson synthesis returned via streaming FastAPI response.',
      ],
      keyTechnicalDecisions: [
        {
          decision: 'LangGraph Multi-Agent Architecture instead of monolithic prompt',
          rationale:
            'Decoupling pedagogical tasks into isolated agents (Grammar, Pronunciation, Conversation, Tutor) prevents hallucination drift and allows specialized system instructions for each domain.',
        },
        {
          decision: 'Dual Storage Model (PostgreSQL + ChromaDB)',
          rationale:
            'Relational storage handles structured user metrics and lesson completions, while ChromaDB vector storage handles semantic embeddings of learner phonetic errors and conversational history.',
        },
      ],
      visualOrDesignDecisions: [
        'Interactive real-time agent workflow inspector with animated token telemetry.',
        'Clean high-contrast dark cockpit interface to focus learner cognitive load on phonetic nuances.',
      ],
    },
    architectureNodes: [
      {
        id: 'user-input',
        name: 'User Input Stream',
        category: 'input',
        role: 'Learner Speech & Text Capture',
        purpose: 'Captures raw conversational audio, text prompts, and phonetic inputs from learner interface.',
        responsibilities: [
          'Capture multilingual speech input',
          'Tokenize conversational intent',
          'Pass session context metadata',
        ],
        technology: ['Next.js', 'Web Speech API', 'Audio Context'],
        connections: ['orchestrator'],
        payloadExample: {
          input: 'Learner: "Je voudrais un croissant s\'il vous plaît, mais je ne sais pas le pluriel."',
          output: '{ raw_text: "...", language: "fr-FR", confidence: 0.98 }',
        },
      },
      {
        id: 'orchestrator',
        name: 'AI Orchestrator',
        category: 'orchestrator',
        role: 'LangGraph State Machine',
        purpose: 'Coordinates agent execution graph, inspects intent, dispatches tasks, and synthesizes final output.',
        responsibilities: [
          'State management and workflow branching',
          'Parallel agent dispatching',
          'Aggregating agent responses into coherent feedback',
        ],
        technology: ['LangGraph', 'Gemini AI', 'FastAPI'],
        connections: ['tutor-agent', 'grammar-agent', 'pronunciation-agent', 'convo-agent', 'memory-engine'],
        payloadExample: {
          input: 'Dispatched task graph to 4 specialized agents in parallel',
          output: 'State consolidated; 0 syntax errors, 1 phonetic note, 1 lesson prompt queued',
        },
      },
      {
        id: 'tutor-agent',
        name: 'Tutor Agent',
        category: 'agent',
        role: 'Pedagogical Guide & Lesson Synthesizer',
        purpose: 'Analyzes learner proficiency stage and formulates tailored explanations and follow-up drills.',
        responsibilities: [
          'Formulate CEFR-aligned explanations',
          'Generate targeted micro-exercises',
          'Ensure encouraging, constructive tone',
        ],
        technology: ['Gemini AI', 'Prompt Engineering'],
        connections: ['output-stream'],
        payloadExample: {
          input: 'Input: French noun pluralization query',
          output: 'Explanation: In French, singular "un croissant" becomes "des croissants" with silent -s.',
        },
      },
      {
        id: 'grammar-agent',
        name: 'Grammar Agent',
        category: 'agent',
        role: 'Syntax & Structural Inspector',
        purpose: 'Performs deep grammatical parse, highlights structural errors, and explains syntactic rules.',
        responsibilities: [
          'Detect tense, gender, and agreement misalignments',
          'Provide side-by-side corrected phrases',
          'Flag repeated syntactic pitfalls',
        ],
        technology: ['Gemini AI', 'Deterministic Syntax Trees'],
        connections: ['output-stream'],
        payloadExample: {
          input: 'Learner phrase: "Je voudrais..."',
          output: 'Syntax check: 100% correct conditional polite form.',
        },
      },
      {
        id: 'pronunciation-agent',
        name: 'Pronunciation Agent',
        category: 'agent',
        role: 'Acoustic & Phonetic Coach',
        purpose: 'Evaluates phonetic accuracy, vowel nasality, and stress patterns against native reference models.',
        responsibilities: [
          'Phoneme-level evaluation',
          'Generate IPA phonetic cues',
          'Provide actionable vocal tract guidance',
        ],
        technology: ['Gemini AI', 'Audio Feature Extraction'],
        connections: ['output-stream'],
        payloadExample: {
          input: 'Acoustic input: /kʁwasɑ̃/',
          output: 'Nasality score: 94%. Focus on soft uvular /ʁ/ articulation.',
        },
      },
      {
        id: 'convo-agent',
        name: 'Conversation Agent',
        category: 'agent',
        role: 'Natural Dialogue Partner',
        purpose: 'Maintains immersive conversational flow in the target language simulating real-world scenarios.',
        responsibilities: [
          'Role-play dynamic contextual scenarios (e.g. bakery, travel)',
          'Adjust conversational vocabulary to learner level',
          'Encourage open-ended learner responses',
        ],
        technology: ['Gemini AI', 'LangGraph'],
        connections: ['output-stream'],
        payloadExample: {
          input: 'Role: Parisian Baker',
          output: '"Très bien! Et avec ceci, vous désirez un café chaud ou un thé?"',
        },
      },
      {
        id: 'memory-engine',
        name: 'Memory / Personalization',
        category: 'memory',
        role: 'ChromaDB & PostgreSQL Long-Term Memory',
        purpose: 'Maintains persistent vector embeddings of user errors and historical learning trajectories.',
        responsibilities: [
          'Vector similarity search over past mistake history',
          'Update spaced repetition weights in PostgreSQL',
          'Personalize agent instructions based on long-term learner profile',
        ],
        technology: ['ChromaDB', 'PostgreSQL', 'Vector Embeddings'],
        connections: ['orchestrator', 'tutor-agent'],
        payloadExample: {
          input: 'Query user history for "French nasal vowels"',
          output: '3 previous errors on /ɑ̃/ logged last week; boosting weight in current drill.',
        },
      },
      {
        id: 'output-stream',
        name: 'Personalized Learning Experience',
        category: 'output',
        role: 'Unified Interactive Output',
        purpose: 'Delivers synthesized multimodal feedback, audio coach playback, and interactive drills to learner.',
        responsibilities: [
          'Stream tokenized real-time feedback',
          'Render visual interactive coaching cards',
          'Update persistent learning dashboard',
        ],
        technology: ['Next.js', 'FastAPI WebSockets', 'Tailwind CSS'],
        connections: [],
        payloadExample: {
          input: 'Aggregated agent state payload',
          output: 'Rendered conversational UI with integrated corrections, audio breakdown, and memory progress bar.',
        },
      },
    ],
  },
  {
    id: 'stadiummind-ai',
    number: '02',
    title: 'StadiumMind AI',
    tagline: 'Intelligent AI-Powered Stadium Operations & Predictive Command Platform',
    category: 'ai-system',
    highlightType: 'command-center',
    featured: true,
    myRole: 'Systems Architect & Backend Engineer',
    technologies: [
      'Gemini AI',
      'Multi-Agent Workflows',
      'WebSockets',
      'FastAPI',
      'Docker',
      'Google Cloud Run',
      'PostgreSQL',
    ],
    metricsOrHighlights: [
      'Sub-Second Telemetry Telemetry Pipeline',
      'Predictive Ingress / Egress Flow Modeling',
      'Autonomous Sentinel Agent Anomaly Alerts',
      'Operator Decision-Support System',
    ],
    caseStudy: {
      problem:
        'Large-scale sports and entertainment arenas experience severe crowd congestion, emergency dispatch latency, unpredictable gate bottleneck surges, and fragmented siloed telemetry between security, concessions, and facility management.',
      whatIDid: [
        'Built a centralized intelligent command-center platform powered by real-time WebSocket telemetry and multi-agent AI analysis.',
        'Implemented predictive crowd modeling and bottleneck anomaly detection agents that evaluate gate throughput and concourse density in real time.',
        'Integrated Gemini AI operational reasoning to generate automated decision support actions for stadium supervisors during incident spikes.',
        'Containerized the entire infrastructure using Docker and deployed on Google Cloud Run with low-latency event broadcasting.',
      ],
      whatCameOfIt:
        'Constructed a functional, high-density operations command platform capable of monitoring simulated 60,000+ seat venue zones, predicting gate choke points 15 minutes prior to peak, and dispatching actionable mitigation routes.',
      architectureHighlights: [
        'IoT/Gate Sensor Feed → High-throughput WebSocket Stream Ingestion.',
        'Sentinel Agents evaluating density thresholds and queue velocity.',
        'Gemini Operational Agent formulating protocol-compliant mitigation strategies.',
        'Live Operator Cockpit with interactive zone drilldowns and dynamic dispatch logs.',
      ],
      keyTechnicalDecisions: [
        {
          decision: 'WebSocket Event Bus with Cloud Run Autoscaling',
          rationale:
            'Allows real-time telemetry broadcast to multiple command monitors with sub-100ms operational latency.',
        },
        {
          decision: 'Multi-Agent Predictive Triage',
          rationale:
            'Separates raw ingestion telemetry from high-level tactical AI reasoning to keep the monitoring loop deterministic and high-speed.',
        },
      ],
      visualOrDesignDecisions: [
        'Dark tactical command aesthetic with live status indicators, radar scanning elements, and zone heatmaps.',
        'Interactive live simulation allowing viewers to trigger bottlenecks and observe autonomous agent response.',
      ],
    },
    architectureNodes: [
      {
        id: 'telemetry-stream',
        name: 'Venue Telemetry Stream',
        category: 'input',
        role: 'Turnstile & Concourse Sensor Ingestion',
        purpose: 'Ingests real-time ingress counts, queue wait metrics, and concession telemetry.',
        responsibilities: ['Process 100+ events/sec', 'Validate gate sensor streams', 'Normalize zone data'],
        technology: ['WebSockets', 'FastAPI', 'Docker'],
        connections: ['stadium-orchestrator'],
      },
      {
        id: 'stadium-orchestrator',
        name: 'Operations Orchestrator',
        category: 'orchestrator',
        role: 'Real-Time Event Dispatcher',
        purpose: 'Coordinates monitoring agents, prioritizes threshold breaches, and invokes AI reasoning engines.',
        responsibilities: ['Evaluate live telemetry stream', 'Route alerts to tactical agents', 'Manage live broadcast state'],
        technology: ['FastAPI', 'Google Cloud Run'],
        connections: ['crowd-agent', 'anomaly-agent', 'dispatch-agent'],
      },
      {
        id: 'crowd-agent',
        name: 'Crowd Dynamics Agent',
        category: 'agent',
        role: 'Ingress & Egress Predictive Modeler',
        purpose: 'Calculates queue velocity and predicts bottleneck formation 15 minutes ahead.',
        responsibilities: ['Compute gate throughput velocity', 'Forecast concourse congestion', 'Identify choke points'],
        technology: ['Python', 'Statistical Time-Series', 'Gemini AI'],
        connections: ['decision-engine'],
      },
      {
        id: 'anomaly-agent',
        name: 'Safety & Anomaly Sentinel',
        category: 'agent',
        role: 'Incident & Threshold Guardian',
        purpose: 'Detects unexpected density surges, unauthorized sector access, and fire exit obstruction risks.',
        responsibilities: ['Monitor critical safety thresholds', 'Filter false alarms', 'Trigger rapid priority escalations'],
        technology: ['Gemini AI', 'FastAPI Rules Engine'],
        connections: ['decision-engine'],
      },
      {
        id: 'dispatch-agent',
        name: 'Resource Optimization Agent',
        category: 'agent',
        role: 'Staff & Asset Router',
        purpose: 'Recommends optimal redeployment of security and usher personnel across venue sectors.',
        responsibilities: ['Compute resource availability', 'Calculate fastest transit corridors', 'Generate dispatch orders'],
        technology: ['Gemini AI', 'Graph Routing'],
        connections: ['decision-engine'],
      },
      {
        id: 'decision-engine',
        name: 'Intelligent Decision Cockpit',
        category: 'output',
        role: 'Operator Command Center & Live Action Feed',
        purpose: 'Renders tactical venue overview, live anomaly alerts, and one-click operator mitigation buttons.',
        responsibilities: ['Display real-time sector health map', 'Stream AI mitigation recommendations', 'Execute operator dispatches'],
        technology: ['Next.js', 'Tailwind CSS', 'WebSockets'],
        connections: [],
      },
    ],
  },
  {
    id: 'techfest-cyborg',
    number: '03',
    title: 'TechFest Cyborg Experience',
    tagline: 'Futuristic Interactive Web Experience & Cybernetic Visual Storytelling',
    category: 'creative-ui',
    highlightType: 'creative-cyborg',
    featured: true,
    myRole: 'Creative Developer & UI/UX Designer',
    technologies: [
      'Three.js / WebGL',
      'JavaScript',
      'Tailwind CSS',
      'Motion Animations',
      'Custom Shader / Canvas',
    ],
    metricsOrHighlights: [
      'Interactive 3D / Cybernetic Visual System',
      'Human × Machine Storytelling Interface',
      'High-Performance 60 FPS Micro-Interactions',
      'Custom Holographic & Glitch FX',
    ],
    caseStudy: {
      problem:
        'Standard university tech fest websites are static, generic informational pages that fail to evoke excitement, technological awe, or the avant-garde spirit of robotics, cybernetics, and future computing.',
      whatIDid: [
        'Created a flagship creative web experience centering on a "CYBORG: The Human × Machine Convergence" conceptual theme.',
        'Designed custom interactive WebGL visualizers featuring dynamic particle geometries, cybernetic biometric HUDs, and responsive cursor physics.',
        'Developed interactive audio-visual transitions, glitch shaders, and immersive typography to guide users through festival tracks and hackathons.',
        'Optimized rendering performance to maintain a locked 60 FPS across desktop and mobile browsers.',
      ],
      whatCameOfIt:
        'Built an acclaimed flagship festival experience that set a high benchmark for creative engineering, engaging thousands of visitors through interactive visual storytelling.',
      architectureHighlights: [
        'Custom WebGL / Canvas rendering engine for dynamic particle cyber-mesh.',
        'Componentized interactive HUD elements with real-time cursor tracking.',
        'Audio-visual sensory feedback loop with smooth hardware-accelerated animations.',
      ],
      keyTechnicalDecisions: [
        {
          decision: 'Custom Particle WebGL Renderer vs Video Backgrounds',
          rationale:
            'Real-time WebGL rendering allows fluid physical responsiveness to user interaction and cursor proximity with negligible network asset weight compared to pre-rendered video.',
        },
        {
          decision: 'Cybernetic HUD Architectural System',
          rationale:
            'Structured visual elements into modular telemetry cards, crosshair coordinates, and reactive glow effects for a coherent sci-fi aesthetic.',
        },
      ],
      visualOrDesignDecisions: [
        'High-contrast cybernetic palette: Deep obsidian canvas, neon cyan `#00f0ff`, electric violet `#a855f7`, and bio-emerald `#10b981`.',
        'Precision monospace data telemetry balanced with bold futuristic display typography.',
      ],
    },
  },
  {
    id: 'brainbolt-quiz',
    number: '04',
    title: 'BrainBolt Quiz',
    tagline: 'High-Speed Interactive Knowledge & Cognitive Scoring Engine',
    category: 'interactive',
    highlightType: 'compact-app',
    featured: false,
    myRole: 'Full-Stack Developer',
    technologies: ['JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'Web Storage API'],
    metricsOrHighlights: [
      'Dynamic Adaptive Countdown Timers',
      'Contextual Multi-Stage Hint Engine',
      'Real-Time Streak & Accuracy Scoring',
    ],
    caseStudy: {
      problem:
        'Standard online quiz apps offer bland static questionnaires with sluggish feedback loops and zero incentive for cognitive speed.',
      whatIDid: [
        'Engineered an energetic, responsive quiz interface featuring millisecond-accurate countdown timers and multi-tier progressive hints.',
        'Implemented dynamic score multipliers based on answer latency and continuous answer streaks.',
        'Built stateful client-side persistence for tracking session performance and high scores.',
      ],
      whatCameOfIt:
        'Delivered a lightweight, highly responsive interactive application with instantaneous scoring feedback and engaging micro-animations.',
      architectureHighlights: [
        'Precise timer requestAnimationFrame tick loop.',
        'State-driven hint disclosure hierarchy.',
        'Instantaneous UI state transitions without layout shifts.',
      ],
      keyTechnicalDecisions: [
        {
          decision: 'Decoupled Timer State Machine',
          rationale:
            'Ensures time calculations remain accurate regardless of background tab throttling or UI re-renders.',
        },
      ],
    },
  },
  {
    id: 'spring-boot-demo',
    number: '05',
    title: 'Spring Boot REST Architecture',
    tagline: 'Enterprise-Grade Backend Services & Scalable API Demonstrator',
    category: 'backend-api',
    highlightType: 'backend-core',
    featured: false,
    myRole: 'Backend Engineer',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Maven'],
    metricsOrHighlights: [
      'Layered RESTful Controller Architecture',
      'JPA / Hibernate Entity Relationships',
      'Containerized Database Persistence',
    ],
    caseStudy: {
      problem:
        'Demonstrating robust enterprise backend patterns, type safety, relational integrity, and disciplined REST contracts in a standalone maintainable service.',
      whatIDid: [
        'Implemented a multi-tier Spring Boot application featuring structured Controller-Service-Repository separation of concerns.',
        'Configured JPA/Hibernate mapping with PostgreSQL database integration and automated schema migrations.',
        'Packaged the service with multi-stage Docker build configurations for frictionless cloud container deployment.',
      ],
      whatCameOfIt:
        'Established a clean, reproducible reference implementation for enterprise Java microservices adhering to standard RESTful patterns.',
      architectureHighlights: [
        'Spring Security / DTO validation layer.',
        'Spring Data JPA relational repositories.',
        'Docker containerized deployment pipeline.',
      ],
      keyTechnicalDecisions: [
        {
          decision: 'Strict DTO / Entity Separation',
          rationale:
            'Prevents internal database schema leakage over public REST endpoints and ensures deterministic input validation.',
        },
      ],
    },
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'LANGUAGES',
    subtitle: 'Core programming languages powering AI pipelines and backend architectures',
    skills: [
      {
        name: 'Python',
        level: 'Core',
        usedIn: ['PolyTutor AI', 'StadiumMind AI', 'FastAPI Services', 'LangGraph Agents'],
        description: 'Primary language for AI/ML pipelines, LangGraph multi-agent workflows, FastAPI asynchronous backends, and RAG architectures.',
      },
      {
        name: 'Java',
        level: 'Advanced',
        usedIn: ['Spring Boot REST Architecture', 'Object-Oriented Backend Systems'],
        description: 'Enterprise backend development, Spring Boot microservices, robust typed architecture, and algorithms.',
      },
      {
        name: 'JavaScript',
        level: 'Core',
        usedIn: ['TechFest Cyborg Website', 'Next.js Applications', 'BrainBolt Quiz', 'Three.js / WebGL'],
        description: 'Modern ES6+ frontend and backend engineering, interactive 3D WebGL interfaces, and event-driven architectures.',
      },
    ],
  },
  {
    id: 'build',
    title: 'BUILD & FRAMEWORKS',
    subtitle: 'Production-ready full-stack and modern web engineering frameworks',
    skills: [
      {
        name: 'Next.js',
        level: 'Core',
        usedIn: ['PolyTutor AI', 'Portfolio Platform', 'Modern Client Applications'],
        description: 'React framework for server-rendered interfaces, streaming endpoints, and high-performance client frontends.',
      },
      {
        name: 'FastAPI',
        level: 'Core',
        usedIn: ['PolyTutor AI Backend', 'StadiumMind AI Stream Ingestion', 'LangGraph Microservices'],
        description: 'High-performance Python async web framework with automatic OpenAPI documentation and WebSocket streaming.',
      },
      {
        name: 'Spring Boot',
        level: 'Advanced',
        usedIn: ['Enterprise Backend Demonstrator', 'RESTful API Services'],
        description: 'Enterprise Java framework for resilient microservices, dependency injection, and JPA data layers.',
      },
      {
        name: 'Tailwind CSS',
        level: 'Core',
        usedIn: ['All Projects', 'TechFest Cyborg UI', 'Stadium Operations Cockpit'],
        description: 'Utility-first CSS architecture for crafting precise, responsive, and high-contrast design systems.',
      },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI & GENERATIVE AI',
    subtitle: 'Agentic workflows, model reasoning, prompt engineering, and vector search',
    skills: [
      {
        name: 'Gemini AI',
        level: 'Core',
        usedIn: ['PolyTutor AI', 'StadiumMind AI Decision Engine', 'Pedagogical Synthesis'],
        description: 'Leveraging Google Gemini models for structured multimodal reasoning, code analysis, and agent synthesis.',
      },
      {
        name: 'LangGraph',
        level: 'Core',
        usedIn: ['PolyTutor AI Multi-Agent Mesh', 'StadiumMind Operational Graphs'],
        description: 'Stateful, multi-agent orchestration for cyclical agent graphs, branching logic, and collaborative AI pipelines.',
      },
      {
        name: 'Prompt Engineering',
        level: 'Core',
        usedIn: ['Agent Persona Calibration', 'Structured JSON Output', 'Few-Shot Grounding'],
        description: 'System-prompt design, chain-of-thought grounding, structured schema generation, and guardrail enforcement.',
      },
      {
        name: 'RAG (Retrieval-Augmented Generation)',
        level: 'Advanced',
        usedIn: ['PolyTutor AI Knowledge Base', 'Contextual Document Retrieval'],
        description: 'Retrieval pipelines combining vector similarity search with language model context windows for hallucination-free output.',
      },
      {
        name: 'ChromaDB',
        level: 'Core',
        usedIn: ['PolyTutor AI Learner Memory', 'Semantic Vector Embedding Indexing'],
        description: 'High-performance embedded vector database for semantic search, memory recall, and contextual learner indexing.',
      },
    ],
  },
  {
    id: 'data',
    title: 'DATA & DATABASES',
    subtitle: 'Relational persistence, schema design, and transactional integrity',
    skills: [
      {
        name: 'PostgreSQL',
        level: 'Core',
        usedIn: ['PolyTutor AI User System', 'StadiumMind Incident Records', 'Spring Boot Service'],
        description: 'Relational data modeling, ACID transactions, complex querying, and indexing for production workloads.',
      },
      {
        name: 'MySQL',
        level: 'Proficient',
        usedIn: ['Relational Data Projects', 'Database Coursework & Simulations'],
        description: 'Relational database architecture, normalized schemas, and query optimization.',
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'CLOUD & DEVOPS',
    subtitle: 'Containerization, serverless compute, and version control workflows',
    skills: [
      {
        name: 'Docker',
        level: 'Core',
        usedIn: ['PolyTutor AI Services', 'StadiumMind AI', 'Spring Boot Containerization'],
        description: 'Containerizing multi-service architectures with reproducible multi-stage Dockerfiles and container workflows.',
      },
      {
        name: 'Google Cloud Run',
        level: 'Advanced',
        usedIn: ['StadiumMind AI Deployment', 'Serverless Microservice Hosting'],
        description: 'Deploying containerized microservices to Google Cloud Run with automated scaling, HTTPS ingress, and monitoring.',
      },
      {
        name: 'Git & GitHub',
        level: 'Core',
        usedIn: ['All Repositories', 'Open-Source Contribution', 'Version Control'],
        description: 'Branch management, continuous integration workflows, code reviews, and open-source collaboration.',
      },
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    company: 'FlyRank AI',
    role: 'AI Intern',
    type: 'Internship',
    period: 'Recent / Active',
    description:
      'Contributing to AI-driven product development and practical Generative AI workflows.',
    keyContributions: [
      'Contributing to AI-driven product development and Generative AI pipelines.',
      'Designing practical generative workflows and structured AI model integrations.',
      'Collaborating with engineering team on real-world system features.',
    ],
    technologies: ['Generative AI', 'Python', 'Prompt Engineering', 'API Integrations'],
  },
  {
    company: 'DecodeLabs',
    role: 'AI Intern',
    type: 'Internship',
    period: 'Completed',
    description:
      'Hands-on AI internship focused on software engineering, problem solving, and real-world AI implementation.',
    keyContributions: [
      'Participated in hands-on AI software engineering tasks and algorithmic problem solving.',
      'Implemented real-world AI logic and validated model response behaviors.',
      'Earned the DecodeLabs Virtual Internship — Artificial Intelligence Certification.',
    ],
    technologies: ['Artificial Intelligence', 'Software Engineering', 'Python', 'Machine Learning'],
  },
];

export const certificationsData: CertificationItem[] = [
  {
    title: 'Gemini Certification for Students',
    issuer: 'Google',
    type: 'Official Certification',
    credentialBadge: 'GOOGLE-GEMINI-CERT',
    verificationTopic: 'Generative AI, Gemini Model Capabilities, Prompt Engineering & Multimodal Applications',
  },
  {
    title: 'Google AI Agents Intensive Course',
    issuer: 'Kaggle',
    type: 'Intensive Course',
    credentialBadge: 'KAGGLE-AGENTS-INTENSIVE',
    verificationTopic: 'Autonomous AI Agents, Multi-Agent Coordination, Tool Use, LangGraph & Decision Loops',
  },
  {
    title: 'DecodeLabs Virtual Internship — Artificial Intelligence',
    issuer: 'DecodeLabs',
    type: 'Virtual Internship',
    credentialBadge: 'DECODELABS-AI-INTERN',
    verificationTopic: 'Hands-on AI Implementation, Engineering Workflows, Machine Learning Fundamentals',
  },
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte Australia (Forage)',
    type: 'Job Simulation',
    credentialBadge: 'DELOITTE-DATA-ANALYTICS',
    verificationTopic: 'Data Analysis, Strategic Insights, Business Intelligence, Data Cleaning & Visualization',
  },
  {
    title: 'Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase (Forage)',
    type: 'Job Simulation',
    credentialBadge: 'JPMC-SWE-SIMULATION',
    verificationTopic: 'Financial Systems Engineering, Real-Time Data Feeds, TypeScript & Data Visualization',
  },
];
