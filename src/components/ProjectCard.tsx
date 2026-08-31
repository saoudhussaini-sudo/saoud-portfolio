import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { GithubIcon } from "./Icons";
import { type ProjectCaseStudy } from "../data/projects";
import { editorialEase } from "../lib/animations";

interface ProjectCardProps {
  project: ProjectCaseStudy;
  index: number;
  onSelectProject: (slug: string) => void;
  onCursorChange?: (mode: "default" | "project" | "hover") => void;
}

export default function ProjectCard({
  project,
  index,
  onSelectProject,
  onCursorChange,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle Mouse Parallax inside image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    if (onCursorChange) onCursorChange("default");
  };

  const handleMouseEnter = () => {
    if (onCursorChange) onCursorChange("project");
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.85, delay: index * 0.1, ease: editorialEase }}
      className="group relative border-b border-black/10 pb-16 md:pb-24 pt-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left / Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-2 lg:order-1">
          {/* Top Project Tag & Number */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-base md:text-lg font-extrabold text-[#111111]">
              /0{project.number}
            </span>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-black/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#666666]">
                {project.category}
              </span>
              <span className="font-mono text-xs text-[#888888]">
                {project.year}
              </span>
            </div>
          </div>

          {/* Project Title & Tagline */}
          <div className="space-y-3">
            <h3
              onClick={() => onSelectProject(project.slug)}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] cursor-pointer hover:text-[#555555] transition-colors leading-[1.05]"
            >
              {project.title}
            </h3>
            <p className="text-sm md:text-base font-medium text-[#666666] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.slice(0, 4).map((tech, tIdx) => (
              <span
                key={tIdx}
                className="font-mono text-xs bg-white border border-black/10 px-3 py-1 rounded-md text-[#333333]"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="font-mono text-xs bg-white/60 border border-black/5 px-2 py-1 rounded-md text-[#888888]">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-black/5">
            <button
              onClick={() => onSelectProject(project.slug)}
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 font-mono text-xs tracking-wider text-[#faf9f5] transition-all duration-300 hover:bg-black hover:scale-105"
            >
              <span>VIEW CASE STUDY</span>
              <ArrowUpRight size={14} />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-transform duration-200 hover:scale-110 hover:border-black"
                aria-label="GitHub Repository"
              >
                <GithubIcon size={16} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-transform duration-200 hover:scale-110 hover:border-black"
                aria-label="Live Demo"
              >
                <Globe size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Right / Visual Showcase Column */}
        <div
          className="lg:col-span-7 order-1 lg:order-2 cursor-pointer"
          onClick={() => onSelectProject(project.slug)}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#0e1015] shadow-2xl transition-all duration-500 group-hover:border-black/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            
            {/* Visual Media Container with Clip-Path & Parallax */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0f14]">
              <motion.div
                style={{ x: imgX, y: imgY, scale: 1.04 }}
                className="h-full w-full"
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
              </motion.div>

              {/* Editorial Frame Watermark */}
              <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/10 pointer-events-none">
                <span className="font-mono text-[10px] tracking-widest text-white uppercase">
                  CASE 0{project.number}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
