import { useState } from "react";
import { motion } from "framer-motion";
import { technologiesData, type TechnologyItem } from "../data/technologies";
import { editorialEase } from "../lib/animations";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<TechnologyItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "Language", "Frontend", "Backend & Data", "Tools & AI"];

  const filteredTech = selectedCategory === "ALL"
    ? technologiesData
    : technologiesData.filter((t) => t.category === selectedCategory);

  return (
    <section id="tech-stack" className="relative w-full py-24 md:py-36 bg-[#f5f4ef] border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-8 mb-12 gap-6">
          <div>
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#111111] uppercase block mb-3">
              /TECH STACK
            </span>
            <h2 className="section-title text-[#111111] uppercase">
              TOOLS & TECHNOLOGIES
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#111111] text-[#faf9f5] shadow-sm"
                    : "bg-white/80 text-[#666666] hover:bg-white hover:text-[#111111] border border-black/5"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Editorial List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List Column */}
          <div className="lg:col-span-8 divide-y divide-black/10 border-y border-black/10">
            {filteredTech.map((tech, idx) => {
              const isHovered = hoveredTech?.id === tech.id;
              const hasHover = hoveredTech !== null;
              const isDimmed = hasHover && !isHovered;

              return (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.03, ease: editorialEase }}
                  onMouseEnter={() => setHoveredTech(tech)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onClick={() => setHoveredTech(tech)}
                  className={`group relative flex flex-col sm:flex-row sm:items-center justify-between py-6 px-4 transition-all duration-300 cursor-pointer select-none rounded-xl ${
                    isHovered
                      ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] translate-x-2"
                      : isDimmed
                      ? "opacity-35"
                      : "opacity-100 hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs font-semibold text-[#888888]">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111] transition-transform duration-300 group-hover:translate-x-1">
                      {tech.name}
                    </h3>
                  </div>

                  <div className="mt-3 sm:mt-0 flex items-center gap-4">
                    <span className="rounded-full bg-black/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#666666]">
                      {tech.category}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#111111]">
                      {tech.level}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className={`text-[#111111] transition-all duration-300 ${
                        isHovered ? "translate-x-1 -translate-y-1 opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Sticky Preview / Inspector Panel */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-xl min-h-[380px] flex flex-col justify-between">
              {hoveredTech ? (
                <motion.div
                  key={hoveredTech.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <span className="font-mono text-xs tracking-widest text-[#888888] uppercase">
                      INSPECTOR // {hoveredTech.category}
                    </span>
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: hoveredTech.accent }}
                    />
                  </div>

                  <div>
                    <h4 className="text-3xl font-extrabold text-[#111111]">
                      {hoveredTech.name}
                    </h4>
                    <p className="font-mono text-xs tracking-wider text-[#111111] font-semibold mt-1">
                      PROFICIENCY: {hoveredTech.level}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-[#555555] bg-[#faf9f5] p-4 rounded-xl border border-black/5">
                    {hoveredTech.tagline}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#888888] pt-4">
                    <Sparkles size={14} className="text-[#111111]" />
                    <span>PRODUCTION VERIFIED & TESTED</span>
                  </div>
                </motion.div>
              ) : (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center p-6 text-[#888888]">
                  <div className="h-12 w-12 rounded-full border border-dashed border-black/20 flex items-center justify-center mb-4">
                    <Sparkles size={18} className="text-[#666666]" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#444444] font-semibold">
                    HOVER OVER ANY TECHNOLOGY
                  </p>
                  <p className="text-xs text-[#888888] mt-2 max-w-[200px]">
                    Inspect capabilities, real-world applications, and stack synergy.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
