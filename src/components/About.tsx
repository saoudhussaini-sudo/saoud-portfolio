import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { editorialEase } from "../lib/animations";
import { Cpu, Globe2, Sparkles, Terminal } from "lucide-react";

interface WordProps {
  children: string;
  progress: import("framer-motion").MotionValue<number>;
  range: [number, number];
  isBold?: boolean;
}

const Word = ({ children, progress, range, isBold = false }: WordProps) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative inline-block mr-[0.28em] my-[0.08em]">
      <motion.span
        style={{ opacity }}
        className={`transition-colors duration-200 ${
          isBold ? "font-extrabold text-[#111111]" : "font-medium text-[#222222]"
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const p1 = "I'm Syed Saoud Ullah Hussaini, a student and aspiring software developer from Hyderabad, India.";
  const p2 = "I enjoy building practical projects, experimenting with new technologies, and turning ideas into working products. Currently exploring Python, web development, AI, automation, and software development.";
  const p3 = "Always learning. Always building. Always curious about what's next.";

  const allWords = `${p1} \n\n ${p2} \n\n ${p3}`.split(" ");

  const focusPillars = [
    {
      icon: Terminal,
      title: "Python & Automation",
      desc: "Architecting backend scripts, automated workflows, and problem-solving tools.",
    },
    {
      icon: Globe2,
      title: "Web Development",
      desc: "Crafting modern, responsive React/Next.js interfaces with seamless state and fluid UX.",
    },
    {
      icon: Sparkles,
      title: "AI & Intelligence",
      desc: "Experimenting with modern LLM APIs, autonomous agents, and smart heuristics.",
    },
    {
      icon: Cpu,
      title: "Practical Software",
      desc: "Turning real-world problems into working, accessible software products.",
    },
  ];

  return (
    <section id="about" ref={containerRef} className="relative w-full py-24 md:py-36 bg-[#faf9f5]">
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
              /ABOUT ME
            </span>
          </motion.div>
          <span className="font-mono text-xs tracking-widest text-[#777777] uppercase">
            STUDENT & SOFTWARE DEVELOPER
          </span>
        </div>

        {/* Big Editorial Scroll Word-Reveal Paragraph */}
        <div className="max-w-5xl space-y-8">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.35] text-[#111111]">
            {allWords.map((word, i) => {
              const start = i / allWords.length;
              const end = start + 1 / allWords.length;
              const isHighlight =
                word.includes("Saoud") ||
                word.includes("Hussaini") ||
                word.includes("Python") ||
                word.includes("web") ||
                word.includes("AI") ||
                word.includes("automation") ||
                word.includes("learning") ||
                word.includes("building") ||
                word.includes("curious");

              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  isBold={isHighlight}
                >
                  {word}
                </Word>
              );
            })}
          </div>
        </div>

        {/* Core Pillars / Focus Cards */}
        <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-black/10 pt-16">
          {focusPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: editorialEase }}
                className="group relative rounded-2xl border border-black/5 bg-white p-7 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-black/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf9f5] border border-black/5 text-[#111111] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#111111] group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-[#111111]">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#666666]">
                  {pillar.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-[#999999]">
                  <span>0{idx + 1}</span>
                  <div className="h-[1px] w-6 bg-black/10" />
                  <span>CORE PILLAR</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
