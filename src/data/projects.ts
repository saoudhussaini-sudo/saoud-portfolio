export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  id: string;
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  year: string;
  category: "Full-Stack" | "AI & Automation" | "Developer Tools" | "Creative Tech";
  tags: string[];
  techStack: string[];
  featured: boolean;
  coverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  challenge: string;
  solution: string;
  keyFeatures: ProjectFeature[];
  architecture: string[];
  metrics?: ProjectMetric[];
  developmentProcess: string[];
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "01",
    number: "01",
    slug: "ai-automation-platform",
    title: "AI AUTOMATION PLATFORM",
    subtitle: "Intelligent autonomous pipeline orchestrator and workflow engine",
    tagline: "A practical automation platform designed to simplify repetitive workflows.",
    year: "2026",
    category: "AI & Automation",
    tags: ["Python", "FastAPI", "LLM APIs", "React", "Tailwind CSS", "Redis"],
    techStack: ["Python 3.12", "FastAPI", "React", "TypeScript", "LangChain", "Redis Queue", "Tailwind CSS"],
    featured: true,
    coverImage: "/projects/automation.svg",
    liveUrl: "https://github.com/saoudhussaini-sudo",
    githubUrl: "https://github.com/saoudhussaini-sudo",
    overview:
      "A high-throughput automation orchestrator bridging natural language commands with executable system pipelines. Built for teams and individual power users seeking to eradicate repetitive manual routines across cloud services, file operations, and scheduled API extractions.",
    challenge:
      "Modern workflows require chaining together distinct services with disparate authentication methods, dynamic payload transformations, and brittle error recovery. Existing solutions often lock users into proprietary low-code platforms with prohibitive costs and rigid execution models.",
    solution:
      "Designed an extensible event-driven architecture powered by Python and Redis workers, equipped with dynamic LLM-assisted schema mapping, real-time telemetry streaming over WebSockets, and a clean editorial dashboard.",
    keyFeatures: [
      {
        title: "Autonomous Prompt-to-Pipeline",
        description: "Natural language translation into deterministic DAG task graphs with conditional branching and fallback nodes.",
      },
      {
        title: "Real-time Telemetry & Logs",
        description: "Zero-latency streaming of worker node outputs and intermediate state dumps via WebSockets.",
      },
      {
        title: "Resilient Retry Mechanisms",
        description: "Exponential backoff policies and dead-letter queues to safeguard against upstream API rate limits.",
      },
      {
        title: "Dynamic Visual Canvas",
        description: "Drag-and-drop reactive graph visualizer with live state feedback and step-by-step debugging.",
      },
    ],
    architecture: [
      "FastAPI asynchronous backend with OpenAPI spec auto-generation",
      "Redis Queue (RQ) distributed worker pool with task prioritization",
      "React + TypeScript modern reactive UI with Framer Motion transitions",
      "OAuth2 token lifecycle manager with encrypted credential vault",
    ],
    metrics: [
      { label: "Execution Latency", value: "< 140ms" },
      { label: "Manual Effort Saved", value: "85%" },
      { label: "Pipeline Reliability", value: "99.8%" },
    ],
    developmentProcess: [
      "Mapped real-world developer & admin pain points around repetitive scheduling and multi-step data transformations.",
      "Engineered core DAG execution engine in Python with strict type safety and dry-run simulation mode.",
      "Integrated modern LLM function calling to convert unstructured human directives into validated JSON configurations.",
      "Iterated on fluid editorial UI with instant feedback loops and comprehensive telemetry.",
    ],
  },
  {
    id: "02",
    number: "02",
    slug: "attendease-smart-management",
    title: "ATTENDEASE MANAGEMENT",
    subtitle: "Enterprise-grade smart attendance & resource tracking application",
    tagline: "A modern full-stack application designed around a real-world use case.",
    year: "2025",
    category: "Full-Stack",
    tags: ["React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "Analytics"],
    techStack: ["React 19", "TypeScript", "Tailwind CSS v4", "Node.js", "Express", "PostgreSQL", "Prisma"],
    featured: true,
    coverImage: "/projects/attendease.svg",
    liveUrl: "https://github.com/saoudhussaini-sudo",
    githubUrl: "https://github.com/saoudhussaini-sudo",
    overview:
      "A modern, frictionless attendance and workforce scheduling platform engineered to eliminate paper registers and clunky legacy portals. Provides real-time check-in validation, anomaly detection, and automated reporting.",
    challenge:
      "Traditional institution and enterprise tracking solutions suffer from cumbersome interfaces, inaccurate manual logging, lack of audit trails, and slow report generation across multi-department hierarchies.",
    solution:
      "Built a unified, high-performance web platform featuring lightning-fast QR and biometric verification gateways, hierarchical role-based permissions, and automated CSV/PDF compliance reporting.",
    keyFeatures: [
      {
        title: "Sub-second Verification",
        description: "Dynamic rotating QR tokens and multi-factor location geofencing preventing proxy attendance.",
      },
      {
        title: "Granular Role Hierarchy",
        description: "Custom permission sets for Administrators, Department Leads, Supervisors, and Standard Members.",
      },
      {
        title: "Automated Report Dispatch",
        description: "Scheduled cron jobs delivering attendance analytics and anomaly alerts directly to stakeholders.",
      },
      {
        title: "Offline-First Sync",
        description: "Client-side IndexedDB caching enabling intermittent connectivity check-ins with background replay.",
      },
    ],
    architecture: [
      "Modular React UI with responsive typography and accessible form controls",
      "RESTful API layer with JWT authentication and rate limiting",
      "Normalized PostgreSQL database schema with Prisma ORM migrations",
      "Automated PDF generation pipeline using headless rendering engines",
    ],
    metrics: [
      { label: "Check-in Speed", value: "0.8s" },
      { label: "Data Accuracy", value: "100%" },
      { label: "Active Users", value: "1,200+" },
    ],
    developmentProcess: [
      "Conducted domain interviews with university department coordinators and project managers.",
      "Drafted high-fidelity Figma design system adhering to strict typography and high contrast standards.",
      "Implemented transactional database queries ensuring zero double-entry conflicts during peak morning hours.",
      "Deployed to production infrastructure with automated database backups and monitoring.",
    ],
  },
  {
    id: "03",
    number: "03",
    slug: "event-horizon-astrophysics-sim",
    title: "EVENT HORIZON SIMULATION",
    subtitle: "Interactive 3D astrophysical Schwarzschild black hole & relativistic optics renderer",
    tagline: "An interactive educational tool using physics equations and Raymarching.",
    year: "2025",
    category: "Creative Tech",
    tags: ["Three.js", "WebGL", "GLSL Shaders", "React Fiber", "Mathematics"],
    techStack: ["Three.js", "React Three Fiber", "GLSL", "WebGL 2.0", "Framer Motion", "Vite"],
    featured: true,
    coverImage: "/projects/eventhorizon.svg",
    liveUrl: "https://saoudhussaini-sudo.github.io/event-horizon/",
    githubUrl: "https://github.com/saoudhussaini-sudo/event-horizon",
    overview:
      "A mathematically grounded, real-time WebGL visualization simulating gravitational lensing, accretion disk relativistic beaming, and photon sphere distortions around a supermassive black hole directly in the browser.",
    challenge:
      "Rendering general relativistic raytracing in real-time within a standard web browser without crashing WebGL contexts or dropping below 60fps on consumer devices.",
    solution:
      "Authored custom GLSL raymarching fragment shaders leveraging geodesic curved-space approximations, combined with interactive camera orbital controls and physics parameter sliders.",
    keyFeatures: [
      {
        title: "Relativistic Raymarching",
        description: "Custom shader simulating gravitational light bending around the Schwarzschild event horizon.",
      },
      {
        title: "Doppler Beaming & Blue Shift",
        description: "Physically accurate luminosity variations across the rotating accretion disk.",
      },
      {
        title: "Dynamic Control Console",
        description: "Tweak black hole mass, spin parameter, accretion disk density, and gravitational lensing index.",
      },
      {
        title: "High-DPI Adaptive LOD",
        description: "Dynamic resolution scaling ensuring fluid 60fps performance across diverse GPUs.",
      },
    ],
    architecture: [
      "Custom GLSL fragment shader executing per-pixel curved geodesic integration",
      "React Three Fiber integration for declarative camera and scene management",
      "Post-processing pipeline handling bloom, chromatic aberration, and noise grain",
    ],
    metrics: [
      { label: "Target Frame Rate", value: "60 FPS" },
      { label: "Shader Precision", value: "FP32 Highp" },
      { label: "Bundle Size", value: "< 450 KB" },
    ],
    developmentProcess: [
      "Studied astrophysical publications on Kerr and Schwarzschild metric light ray calculations.",
      "Prototyped numerical differential equations in Python and ported them to optimized GLSL shaders.",
      "Tuned procedural volumetric noise for realistic accretion gas swirls.",
      "Published as an open-source educational project featured across developer communities.",
    ],
  },
  {
    id: "04",
    number: "04",
    slug: "internscout-talent-engine",
    title: "INTERNSCOUT ENGINE",
    subtitle: "AI-driven technical opportunity scanner and intelligent matchmaker",
    tagline: "A technical tool designed to make a difficult workflow simpler.",
    year: "2025",
    category: "Developer Tools",
    tags: ["Next.js", "TypeScript", "Python", "Web Scraping", "Prisma", "Tailwind CSS"],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Python Scrapy", "Prisma", "OpenAI API"],
    featured: true,
    coverImage: "/projects/internscout.svg",
    liveUrl: "https://github.com/saoudhussaini-sudo/internscout",
    githubUrl: "https://github.com/saoudhussaini-sudo/internscout",
    overview:
      "A developer-first career intelligence engine that aggregates, cleanses, and matches global software internships against user skill profiles using semantic vector embeddings and automated resume alignment.",
    challenge:
      "Early-career engineers waste hundreds of hours manually searching fragmented job portals, battling outdated listings, and struggling to tailor applications to niche skill requirements.",
    solution:
      "Engineered automated scrapers running headless ingestion routines that parse technical specs, extract true tech-stack prerequisites, score relevance via vector cosine similarity, and provide instant alert feeds.",
    keyFeatures: [
      {
        title: "Automated Ingestion Pipeline",
        description: "Scheduled daily scrapers capturing verified listings from top tech company ATS systems.",
      },
      {
        title: "Semantic Skill Matcher",
        description: "Matches developer GitHub repos and technical proficiencies with job requirements.",
      },
      {
        title: "Tailored Resume Bullet Generator",
        description: "Suggests quantifiable project bullet points based on candidate experience.",
      },
      {
        title: "Instant Discord / Telegram Webhooks",
        description: "Instant push notifications when high-match opportunities go live.",
      },
    ],
    architecture: [
      "Next.js App Router for server-side rendering and search indexing",
      "Python-based distributed scraper with anti-bot bypass and proxy rotation",
      "Vector embeddings and similarity search module",
      "PostgreSQL database with indexed search vectors",
    ],
    metrics: [
      { label: "Listings Processed", value: "10,000+" },
      { label: "Search Speed", value: "< 80ms" },
      { label: "Matching Accuracy", value: "94%" },
    ],
    developmentProcess: [
      "Identified repetitive friction in software internship search workflows among university peers.",
      "Architected clean Next.js frontend with instant keyboard navigation and filter chips.",
      "Created resilient data validation layers filtering spam, expired links, and duplicate postings.",
      "Open-sourced on GitHub with detailed documentation for self-hosting.",
    ],
  },
];
