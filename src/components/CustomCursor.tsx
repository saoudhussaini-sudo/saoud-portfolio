import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export type CursorMode = "default" | "hover" | "project" | "text" | "hidden";

interface CustomCursorProps {
  cursorText?: string;
  cursorMode?: CursorMode;
}

export default function CustomCursor({ cursorText = "", cursorMode = "default" }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 35, stiffness: 450, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      setIsTouch(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches
      );
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch) return null;

  const isProject = cursorMode === "project";
  const isHover = cursorMode === "hover";

  return (
    <div className="custom-cursor-container pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Follower Ring / Badge */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && cursorMode !== "hidden" ? 1 : 0,
        }}
        animate={{
          width: isProject ? 90 : isHover ? 48 : 28,
          height: isProject ? 90 : isHover ? 48 : 28,
          backgroundColor: isProject
            ? "#111111"
            : isHover
            ? "rgba(17, 17, 17, 0.08)"
            : "transparent",
          border: isProject
            ? "none"
            : isHover
            ? "1px solid rgba(17, 17, 17, 0.25)"
            : "1px solid rgba(17, 17, 17, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {isProject && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-bold text-[#faf9f5] tracking-widest uppercase text-center select-none"
          >
            {cursorText || "VIEW"}
          </motion.span>
        )}
      </motion.div>

      {/* Center Small Dot */}
      {!isProject && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#111111] pointer-events-none"
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: isVisible && cursorMode !== "hidden" ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
