export interface ExperienceItem {
  id: string;
  year: string;
  period?: string;
  title: string;
  organization: string;
  location?: string;
  category: "Milestone" | "Learning" | "AI & Automation" | "Hackathon" | "Projects";
  description: string;
  highlights?: string[];
  skills?: string[];
  link?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-01",
    year: "2026",
    period: "2026",
    title: "Building Real-World Projects",
    organization: "Production Development & Systems",
    location: "Hyderabad, India",
    category: "Projects",
    description:
      "Focused on developing larger, more complete projects with better UI, functionality, APIs, automation, and modern technologies.",
    highlights: [
      "Engineering scalable full-stack applications with refined editorial UX and fluid motion design",
      "Deploying autonomous pipelines, AI integration endpoints, and high-performance developer tools",
      "Prioritizing real-world utility, strict type safety, and clean software architecture",
    ],
    skills: ["Python", "React", "TypeScript", "Tailwind CSS", "Next.js", "APIs", "Automation"],
  },
  {
    id: "exp-02",
    year: "2025",
    period: "2025",
    title: "Hackathons & Problem Solving",
    organization: "Competitive Building & Rapid Prototyping",
    location: "India",
    category: "Hackathon",
    description:
      "Started participating in hackathon-style projects and challenging myself to turn ideas into working prototypes under time constraints.",
    highlights: [
      "Built and presented functional MVPs under intensive 24-48 hour hackathon environments",
      "Rapidly orchestrated third-party APIs, database schemas, and intuitive frontend interfaces",
    ],
    skills: ["Rapid Prototyping", "Teamwork", "Full-Stack Dev", "API Integration"],
  },
  {
    id: "exp-03",
    year: "2025",
    period: "2025",
    title: "Started Exploring AI & Automation",
    organization: "Autonomous Agents & Workflow Engines",
    location: "Hyderabad, India",
    category: "AI & Automation",
    description:
      "Began experimenting with AI APIs, automation, and intelligent applications. Started looking at ways technology could solve everyday problems instead of just being something to study.",
    highlights: [
      "Built custom scrapers, task orchestrators, and LLM prompt-to-pipeline automations",
      "Integrated OpenAI, Gemini, and open-source models into practical utility workflows",
    ],
    skills: ["AI APIs", "LLM Integration", "Python Automation", "Workflow Scripts"],
  },
  {
    id: "exp-04",
    year: "2025",
    period: "2025",
    title: "From Learning to Building",
    organization: "Applied Software Development",
    location: "Hyderabad, India",
    category: "Learning",
    description:
      "Moved beyond tutorials and started creating small projects to understand how real applications work. Explored web development, databases, APIs, Git, and different programming technologies.",
    highlights: [
      "Constructed hands-on web applications, relational database schemas, and RESTful endpoints",
      "Mastered Git version control workflows, component-driven UI architecture, and backend logic",
    ],
    skills: ["Web Development", "Databases", "REST APIs", "Git & GitHub", "JavaScript"],
  },
  {
    id: "exp-05",
    year: "2024",
    period: "2024",
    title: "Started My Coding Journey",
    organization: "Foundations & Exploration",
    location: "Hyderabad, India",
    category: "Milestone",
    description:
      "Started exploring programming and discovered an interest in building things with code. Began learning the fundamentals of programming, problem-solving, and Python.",
    highlights: [
      "Developed strong computational fundamentals, data structures, and algorithmic problem solving",
      "Built first command-line scripts and automation utilities in Python",
    ],
    skills: ["Python Fundamentals", "Problem Solving", "Logic Building", "Algorithms"],
  },
];
