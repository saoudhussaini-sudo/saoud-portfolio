import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor, { type CursorMode } from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import WhatIBuild from "./components/WhatIBuild";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentProjectSlug, setCurrentProjectSlug] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [cursorText, setCursorText] = useState<string>("VIEW");

  // Sync with browser URL / hash for dynamic project routing & back button
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path.startsWith("/work/")) {
        const slug = path.replace("/work/", "");
        setCurrentProjectSlug(slug);
      } else if (hash.startsWith("#work/")) {
        const slug = hash.replace("#work/", "");
        setCurrentProjectSlug(slug);
      } else {
        setCurrentProjectSlug(null);
      }
    };

    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  // Section Observer for Active Section Spy
  useEffect(() => {
    if (currentProjectSlug) return;

    const sections = ["hero", "about", "tech-stack", "services", "work", "experience", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentProjectSlug, loading]);

  const handleSelectProject = (slug: string) => {
    setCurrentProjectSlug(slug);
    window.history.pushState(null, "", `/work/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToWork = () => {
    setCurrentProjectSlug(null);
    window.history.pushState(null, "", "/#work");
    setTimeout(() => {
      const el = document.getElementById("work");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCursorChange = (mode: CursorMode, text = "VIEW") => {
    setCursorMode(mode);
    setCursorText(text);
  };

  return (
    <SmoothScroll>
      {/* Custom Follower Cursor */}
      <CustomCursor cursorMode={cursorMode} cursorText={cursorText} />

      {/* Preloader Sequence */}
      <Preloader onComplete={() => setLoading(false)} />

      {/* Main App Container */}
      <div className="relative min-h-screen w-full bg-[#faf9f5] text-[#111111] selection:bg-[#111111] selection:text-[#faf9f5]">
        
        {/* Navigation */}
        <Navbar
          activeSection={activeSection}
          onNavigate={(id) => {
            if (currentProjectSlug) {
              setCurrentProjectSlug(null);
              window.history.pushState(null, "", `/#${id}`);
              setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 150);
            } else {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* Dynamic Page Views */}
        <AnimatePresence mode="wait">
          {currentProjectSlug ? (
            <motion.div
              key={`detail-${currentProjectSlug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectDetail
                slug={currentProjectSlug}
                onBack={handleBackToWork}
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          ) : (
            <motion.main
              key="main-portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <Hero onExploreClick={() => {
                const el = document.getElementById("work");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }} />
              
              <About />
              
              <TechStack />
              
              <WhatIBuild />
              
              <Projects
                onSelectProject={handleSelectProject}
                onCursorChange={(mode) => handleCursorChange(mode, "VIEW")}
              />
              
              <Experience />
              
              <Contact />
            </motion.main>
          )}
        </AnimatePresence>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
