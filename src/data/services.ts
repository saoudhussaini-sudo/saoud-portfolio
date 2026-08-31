export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  deliverables: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "01",
    number: "01",
    title: "WEB DEVELOPMENT",
    shortDesc: "Modern responsive websites and web applications.",
    fullDesc:
      "Crafting performant, visually refined web applications that harmonize aesthetic restraint with deep technical precision. Focused on lightning-fast load times, responsive fluid typography, seamless state transitions, and accessible interactions.",
    capabilities: [
      "Modern React / Next.js architecture",
      "Tailwind CSS & bespoke design systems",
      "Awwwards-grade motion & smooth scrolling",
      "SEO, performance & accessibility optimization",
    ],
    deliverables: [
      "Custom Web Applications",
      "Design Systems & Component Libraries",
      "Interactive Product Landing Pages",
      "Progressive Web Apps (PWA)",
    ],
  },
  {
    id: "02",
    number: "02",
    title: "SOFTWARE DEVELOPMENT",
    shortDesc: "Practical software solutions designed around real problems.",
    fullDesc:
      "Engineering robust software architectures from database schema design to RESTful APIs and distributed microservices. Prioritizing strict type safety, clean separation of concerns, and resilient error handling.",
    capabilities: [
      "Full-stack architecture & data modeling",
      "RESTful API design & integration",
      "PostgreSQL, SQL & relational database tuning",
      "Modular, testable, maintainable codebases",
    ],
    deliverables: [
      "Custom Backend APIs & Microservices",
      "Internal Business Tools & Dashboards",
      "Database Architecture & Migrations",
      "End-to-End System Integrations",
    ],
  },
  {
    id: "03",
    number: "03",
    title: "AUTOMATION",
    shortDesc: "Tools and workflows that eliminate repetitive tasks.",
    fullDesc:
      "Building smart automated pipelines, web crawlers, data transformers, and background daemons that transform tedious manual hours into instant, reliable programmatic executions.",
    capabilities: [
      "Python scripts & scheduled background cron workers",
      "Distributed web scrapers & data aggregators",
      "API webhook integration & automated data pipelines",
      "System utility tools & CLI applications",
    ],
    deliverables: [
      "Data Scraping & Extraction Engines",
      "Workflow & Notification Automations",
      "Developer CLI Productivity Tools",
      "Custom ETL Pipelines",
    ],
  },
  {
    id: "04",
    number: "04",
    title: "AI-POWERED PRODUCTS",
    shortDesc: "Applications combining software with modern AI capabilities.",
    fullDesc:
      "Integrating cutting-edge LLM APIs, prompt orchestration, autonomous agent loops, and semantic retrieval to create intelligent digital products that solve complex real-world workflows.",
    capabilities: [
      "LLM API integration (OpenAI, Claude, Gemini, DeepSeek)",
      "Autonomous tool-calling & structured JSON schema generation",
      "Vector embeddings & semantic similarity search",
      "Context-aware interactive conversational interfaces",
    ],
    deliverables: [
      "Intelligent Assistants & Agents",
      "Semantic Search & Matching Systems",
      "Automated Content & Code Synthesizers",
      "AI Pipeline Orchestrators",
    ],
  },
];
