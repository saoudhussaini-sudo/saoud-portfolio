import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData, type ServiceItem } from "../data/services";
import { editorialEase } from "../lib/animations";
import { ArrowDownRight, CheckCircle2 } from "lucide-react";

export default function WhatIBuild() {
  const [activeRow, setActiveRow] = useState<string | null>("01");

  const toggleRow = (id: string) => {
    setActiveRow(activeRow === id ? null : id);
  };

  return (
    <section id="services" className="relative w-full py-24 md:py-36 bg-[#faf9f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: editorialEase }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#111111] uppercase">
              /WHAT I BUILD
            </span>
          </motion.div>
          <span className="font-mono text-xs tracking-widest text-[#777777] uppercase">
            SERVICES & EXPERTISE
          </span>
        </div>

        {/* Big Editorial Expandable Rows */}
        <div className="divide-y divide-black/10 border-y border-black/10">
          {servicesData.map((service: ServiceItem, idx: number) => {
            const isOpen = activeRow === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: editorialEase }}
                className={`group transition-colors duration-300 ${
                  isOpen ? "bg-white/80" : "hover:bg-black/[0.015]"
                }`}
              >
                {/* Row Header / Click Target */}
                <button
                  onClick={() => toggleRow(service.id)}
                  className="flex w-full items-start sm:items-center justify-between py-8 md:py-12 px-4 md:px-8 text-left transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 md:gap-12">
                    <span className="font-mono text-sm md:text-base font-bold text-[#888888]">
                      {service.number}
                    </span>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] group-hover:translate-x-2 transition-transform duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="hidden lg:block font-mono text-xs text-[#777777] tracking-wider max-w-xs text-right">
                      {service.shortDesc}
                    </span>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white transition-transform duration-500 ${
                        isOpen ? "rotate-90 bg-[#111111] text-white border-black" : "group-hover:scale-110"
                      }`}
                    >
                      <ArrowDownRight size={20} />
                    </div>
                  </div>
                </button>

                {/* Expandable Content Drawer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: editorialEase }}
                      className="overflow-hidden border-t border-black/5 bg-[#faf9f5]/50 px-4 md:px-8 pb-12 pt-6"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                        <div className="lg:col-span-6 space-y-4">
                          <h4 className="font-mono text-xs font-bold tracking-widest text-[#888888] uppercase">
                            OVERVIEW & APPROACH
                          </h4>
                          <p className="text-base sm:text-lg leading-relaxed text-[#333333]">
                            {service.fullDesc}
                          </p>
                        </div>

                        <div className="lg:col-span-3 space-y-3">
                          <h4 className="font-mono text-xs font-bold tracking-widest text-[#888888] uppercase">
                            CORE CAPABILITIES
                          </h4>
                          <ul className="space-y-2">
                            {service.capabilities.map((cap, cIdx) => (
                              <li key={cIdx} className="flex items-center gap-2 text-sm text-[#555555]">
                                <CheckCircle2 size={15} className="text-[#111111] shrink-0" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="lg:col-span-3 space-y-3">
                          <h4 className="font-mono text-xs font-bold tracking-widest text-[#888888] uppercase">
                            DELIVERABLES
                          </h4>
                          <ul className="space-y-2">
                            {service.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="flex items-center gap-2 text-sm text-[#555555]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#111111]" />
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
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
