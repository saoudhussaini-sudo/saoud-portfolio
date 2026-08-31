import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Globe, Layers, Sparkles } from "lucide-react";
import { GithubIcon } from "./Icons";
import { type ProjectCaseStudy, projectsData } from "../data/projects";
import { editorialEase } from "../lib/animations";

interface ProjectDetailProps {
  slug: string;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
}

export default function ProjectDetail({ slug, onBack, onSelectProject }: ProjectDetailProps) {
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project: ProjectCaseStudy | undefined = projectsData[projectIndex] || projectsData[0];

  const nextIndex = (projectIndex + 1) % projectsData.length;
  const nextProject = projectsData[nextIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!project) return null;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: editorialEase }}
      className="min-h-screen w-full bg-[#faf9f5] pt-24 pb-32 text-[#111111]"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-[#111111] hover:text-[#666666] transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
            <span>BACK TO ALL WORK</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#888888]">
              CASE {project.number} OF 0{projectsData.length}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <header className="space-y-6 pb-12 border-b border-black/10">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-black/5 px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-[#555555]">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#888888]">
              YEAR {project.year}
            </span>
          </div>

          <h1 className="hero-title text-[#111111] uppercase tracking-tight">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-[#555555] max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3.5 font-mono text-xs tracking-wider text-[#faf9f5] transition-transform duration-200 hover:scale-105 hover:bg-black"
              >
                <Globe size={15} />
                <span>LAUNCH LIVE DEMO</span>
                <ArrowUpRight size={14} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-6 py-3.5 font-mono text-xs tracking-wider text-[#111111] transition-all duration-200 hover:border-black hover:bg-black/5"
              >
                <GithubIcon size={15} />
                <span>SOURCE CODE</span>
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </header>

        {/* Large Media Banner */}
        <div className="my-12 overflow-hidden rounded-2xl border border-black/10 bg-[#0d0e12] shadow-2xl">
          <div className="aspect-[16/9] w-full">
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Project Metrics (if available) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-12 border-y border-black/10 py-8">
            {project.metrics.map((metric, mIdx) => (
              <div key={mIdx} className="space-y-1">
                <span className="font-mono text-xs tracking-widest text-[#888888] uppercase">
                  {metric.label}
                </span>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#111111]">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Case Study Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="font-mono text-xs font-bold tracking-widest uppercase text-[#888888]">
                01 // PROJECT OVERVIEW
              </h2>
              <p className="text-lg leading-relaxed text-[#333333]">
                {project.overview}
              </p>
            </section>

            {/* Challenge & Solution */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-black/10 py-12">
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-[#991b1b]">
                  THE PROBLEM & CHALLENGE
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#555555]">
                  {project.challenge}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-[#065f46]">
                  THE ARCHITECTURAL SOLUTION
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#555555]">
                  {project.solution}
                </p>
              </div>
            </section>

            {/* Key Features */}
            <section className="space-y-6">
              <h2 className="font-mono text-xs font-bold tracking-widest uppercase text-[#888888]">
                02 // KEY FEATURES & CAPABILITIES
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.keyFeatures.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="rounded-xl border border-black/10 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <Sparkles size={16} className="text-[#111111]" />
                      <h4 className="font-bold text-base text-[#111111]">{feat.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-[#666666]">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Development Process */}
            {project.developmentProcess && (
              <section className="space-y-6 border-t border-black/10 pt-12">
                <h2 className="font-mono text-xs font-bold tracking-widest uppercase text-[#888888]">
                  03 // DEVELOPMENT PROCESS & METHODOLOGY
                </h2>
                <div className="space-y-4">
                  {project.developmentProcess.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111111] font-mono text-xs font-bold text-white">
                        0{sIdx + 1}
                      </span>
                      <p className="text-base text-[#444444] pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Specs */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-md space-y-6">
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-[#888888]">
                TECHNICAL SPECIFICATIONS
              </h3>

              {/* Technologies */}
              <div className="space-y-3">
                <span className="font-mono text-[11px] text-[#888888] uppercase block">
                  TECH STACK & TOOLS
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-md bg-[#faf9f5] border border-black/10 px-3 py-1 font-mono text-xs font-medium text-[#111111]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture Highlights */}
              <div className="space-y-3 border-t border-black/10 pt-4">
                <span className="font-mono text-[11px] text-[#888888] uppercase block">
                  ARCHITECTURE HIGHLIGHTS
                </span>
                <ul className="space-y-2">
                  {project.architecture.map((arch, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-xs text-[#555555]">
                      <CheckCircle2 size={13} className="text-[#111111] shrink-0 mt-0.5" />
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Creator Credit */}
              <div className="border-t border-black/10 pt-4 text-xs font-mono text-[#888888]">
                <span>ARCHITECT // SYED SAOUD</span>
              </div>
            </div>
          </aside>

        </div>

        {/* Next Project Footer Bar */}
        <div className="mt-24 border-t border-black/10 pt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="font-mono text-xs tracking-widest text-[#888888] uppercase">
                NEXT CASE STUDY
              </span>
              <h3
                onClick={() => onSelectProject(nextProject.slug)}
                className="text-2xl sm:text-4xl font-extrabold text-[#111111] hover:text-[#555555] cursor-pointer transition-colors uppercase"
              >
                {nextProject.title} →
              </h3>
            </div>

            <button
              onClick={() => onSelectProject(nextProject.slug)}
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 font-mono text-xs tracking-wider text-[#faf9f5] hover:bg-black transition-all hover:scale-105"
            >
              <span>VIEW NEXT CASE</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </motion.article>
  );
}
