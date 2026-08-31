import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { personalData } from "../data/personal";
import { editorialEase } from "../lib/animations";
import MagneticButton from "./MagneticButton";

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yHeadline = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scalePortrait = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  // Cursor 3D Tilt Effect on Desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springTiltConfig = { stiffness: 200, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springTiltConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springTiltConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] w-full overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <motion.div
        style={{ opacity: opacityHero }}
        className="mx-auto flex max-w-7xl flex-col justify-between px-6 md:px-12"
      >
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: editorialEase }}
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#666666]"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{personalData.availability}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: editorialEase }}
            className="flex items-center gap-6 font-mono text-xs tracking-widest uppercase text-[#666666]"
          >
            <span>{personalData.location}</span>
            <span>{personalData.year}</span>
          </motion.div>
        </div>

        {/* Main Editorial Hero Grid */}
        <div className="grid grid-cols-1 gap-12 pt-12 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* Left Column: Big Headline & Bio */}
          <div className="flex flex-col justify-between lg:col-span-7 xl:col-span-8">
            <motion.div style={{ y: yHeadline }} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: editorialEase }}
              >
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#888888] uppercase block mb-3">
                  PORTFOLIO 2026 // CREATIVE DEVELOPER
                </span>
                <h1 className="hero-title font-extrabold text-[#111111] uppercase tracking-tight">
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: editorialEase }}
                      className="block"
                    >
                      SYED SAOUD
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden text-[#555555]">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, delay: 0.1, ease: editorialEase }}
                      className="block"
                    >
                      ULLAH HUSSAINI
                    </motion.span>
                  </span>
                </h1>
              </motion.div>

              <motion.div
                style={{ y: ySubtitle }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: editorialEase }}
                className="pt-4"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 backdrop-blur-sm">
                  <Sparkles size={14} className="text-[#111111]" />
                  <span className="font-mono text-xs font-bold tracking-widest text-[#111111] uppercase">
                    SOFTWARE DEVELOPER & BUILDER
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Concise Bio & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: editorialEase }}
              className="mt-12 max-w-xl space-y-8 border-t border-black/10 pt-8"
            >
              <p className="text-base font-normal leading-relaxed text-[#444444] md:text-lg">
                {personalData.shortBio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton>
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onExploreClick) onExploreClick();
                      else document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group inline-flex items-center gap-3 rounded-full bg-[#111111] px-7 py-4 font-mono text-xs tracking-wider text-[#faf9f5] transition-all duration-300 hover:bg-black hover:shadow-lg"
                  >
                    <span>EXPLORE SELECTED WORK</span>
                    <ArrowDown
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-y-1"
                    />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/50 px-6 py-4 font-mono text-xs tracking-wider text-[#111111] backdrop-blur-sm transition-all duration-300 hover:border-black hover:bg-white"
                  >
                    <span>LET'S TALK</span>
                    <ArrowUpRight size={14} />
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Portrait Showcase with 3D Tilt & Parallax */}
          <div className="lg:col-span-5 xl:col-span-4">
            <motion.div
              style={{ y: yPortrait, scale: scalePortrait }}
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none"
            >
              <motion.div
                style={{ rotateX, rotateY, perspective: 1200 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.2, ease: editorialEase }}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-[#141416] p-3 shadow-2xl transition-all duration-500 hover:border-black/30"
              >
                {/* Visual Image Treatment */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#18191f]">
                  <img
                    src={imageError ? "/portrait-placeholder.svg" : personalData.avatarUrl}
                    alt={personalData.name}
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover grayscale contrast-105 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Overlay Metadata */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                    <div className="space-y-0.5 text-white">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-white/60">
                        HYDERABAD // IN
                      </p>
                      <p className="text-sm font-bold tracking-tight text-white">
                        SAOUD HUSSAINI
                      </p>
                    </div>
                    <div className="rounded-full bg-white/20 px-2.5 py-1 backdrop-blur-md">
                      <span className="font-mono text-[10px] text-white">BUILDER</span>
                    </div>
                  </div>
                </div>

                {/* Subtle outer footer caption */}
                <div className="mt-3 flex items-center justify-between px-2 text-[11px] font-mono text-white/50">
                  <span>DEV.PORTRAIT // 01</span>
                  <span>ONLINE</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
