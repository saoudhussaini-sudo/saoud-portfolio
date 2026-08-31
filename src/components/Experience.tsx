import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData, type ExperienceItem } from "../data/experience";
import { editorialEase } from "../lib/animations";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("exp-01");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "Projects", "Hackathon", "AI & Automation", "Learning", "Milestone"];

  const filteredExperience = activeCategory === "ALL"
    ? experienceData
    : experienceData.filter((e) => e.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="relative w-full py-24 md:py-36 bg-[#faf9f5]">
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
                /EXPERIENCE
              </span>
              <h2 className="section-title text-[#111111] uppercase">
                CAREER & MILESTONES
              </h2>
            </motion.div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#111111] text-[#faf9f5] shadow-sm"
                    : "bg-white text-[#666666] hover:bg-black/5 hover:text-[#111111] border border-black/10"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Rows */}
        <div className="divide-y divide-black/10 border-y border-black/10">
          {filteredExperience.map((item: ExperienceItem, idx: number) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: editorialEase }}
                className={`transition-colors duration-300 ${
                  isExpanded ? "bg-white" : "hover:bg-black/[0.015]"
                }`}
              >
                {/* Main Row Header */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="flex w-full flex-col md:flex-row md:items-center justify-between py-8 px-4 md:px-8 text-left transition-all gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                    <span className="font-mono text-xs md:text-sm font-bold text-[#888888] sm:w-36 shrink-0">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111]">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-[#666666] mt-1">
                        {item.organization} {item.location ? `• ${item.location}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <span className="rounded-full bg-black/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#666666]">
                      {item.category}
                    </span>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white transition-transform duration-300 ${
                        isExpanded ? "rotate-180 bg-[#111111] text-white border-black" : ""
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </button>

                {/* Expandable Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: editorialEase }}
                      className="overflow-hidden border-t border-black/5 bg-[#faf9f5]/60 px-4 md:px-8 pb-8 pt-6"
                    >
                      <div className="space-y-4 max-w-4xl">
                        <p className="text-base text-[#444444] leading-relaxed">
                          {item.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-2 pt-2">
                          <span className="font-mono text-[11px] font-bold text-[#888888] tracking-widest uppercase block">
                            KEY HIGHLIGHTS
                          </span>
                          <ul className="space-y-1.5">
                            {item.highlights.map((high, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2.5 text-sm text-[#555555]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#111111] mt-2 shrink-0" />
                                <span>{high}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills and link */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/5">
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="rounded-md bg-white border border-black/10 px-2.5 py-1 font-mono text-[11px] text-[#333333]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#111111] hover:underline"
                            >
                              <span>EXPLORE REPO</span>
                              <ArrowUpRight size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
