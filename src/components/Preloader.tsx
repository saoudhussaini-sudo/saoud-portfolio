import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { editorialEase } from "../lib/animations";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Smooth non-linear progress increment
      const step = Math.floor(Math.random() * 12) + 6;
      current += step;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 900);
        }, 300);
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: editorialEase },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#111111] p-6 text-[#faf9f5] md:p-12"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between text-xs tracking-widest uppercase opacity-60">
            <span className="font-mono">HYDERABAD, IN</span>
            <span className="font-mono">©2026</span>
          </div>

          {/* Center Brand Identity */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: editorialEase }}
              className="space-y-2"
            >
              <p className="font-mono text-xs tracking-[0.25em] text-[#999999] uppercase">
                SOFTWARE DEVELOPER & BUILDER
              </p>
              <h1 className="heading-display text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                SYED SAOUD
              </h1>
            </motion.div>
          </div>

          {/* Bottom Progress Counter & Indicator */}
          <div className="flex items-end justify-between border-t border-white/10 pt-6">
            <div className="space-y-1">
              <span className="font-mono text-xs tracking-widest text-[#888888] uppercase">
                INITIALIZING PORTFOLIO
              </span>
              <div className="h-[2px] w-36 overflow-hidden bg-white/10 sm:w-64">
                <motion.div
                  className="h-full bg-[#faf9f5]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="font-mono text-3xl font-light tracking-tighter sm:text-5xl">
              {progress.toString().padStart(3, "0")}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
