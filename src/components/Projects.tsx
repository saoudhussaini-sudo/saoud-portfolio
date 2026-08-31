import { useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "../data/projects";
import { editorialEase } from "../lib/animations";
import ProjectCard from "./ProjectCard";

interface ProjectsProps {
  onSelectProject: (slug: string) => void;
  onCursorChange?: (mode: "default" | "project" | "hover") => void;
}

export default function Projects({ onSelectProject, onCursorChange }: ProjectsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  const filterOptions = ["ALL", "AI & Automation", "Full-Stack", "Creative Tech", "Developer Tools"];

  const filteredProjects = selectedFilter === "ALL"
    ? projectsData
    : projectsData.filter((p) => p.category === selectedFilter);

  return (
    <section id="work" className="relative w-full py-24 md:py-36 bg-[#faf9f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-8 mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: editorialEase }}
            >
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#111111] uppercase block mb-3">
                /SELECTED WORK
              </span>
              <h2 className="section-title text-[#111111] uppercase">
                FEATURED PROJECTS
              </h2>
            </motion.div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 ${
                  selectedFilter === opt
                    ? "bg-[#111111] text-[#faf9f5] shadow-sm"
                    : "bg-white text-[#666666] hover:bg-black/5 hover:text-[#111111] border border-black/10"
                }`}
              >
                {opt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Showcases */}
        <div className="space-y-4">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelectProject={onSelectProject}
              onCursorChange={onCursorChange}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
