import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { personalData } from "../data/personal";
import { editorialEase } from "../lib/animations";

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

const navLinks = [
  { label: "ABOUT", href: "#about", id: "about" },
  { label: "WORK", href: "#work", id: "work" },
  { label: "SERVICES", href: "#services", id: "services" },
  { label: "EXPERIENCE", href: "#experience", id: "experience" },
  { label: "CONTACT", href: "#contact", id: "contact" },
];

export default function Navbar({ activeSection = "hero", onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Subtle background appearance after scrolling 60px
      setIsScrolled(currentScrollY > 60);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-12">
          <nav
            className={`flex items-center justify-between transition-all duration-300 rounded-full px-6 py-3.5 ${
              isScrolled
                ? "bg-[#faf9f5]/85 backdrop-blur-md border border-[rgba(17,17,17,0.08)] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, "hero")}
              className="group flex items-center gap-2.5 font-bold tracking-tight text-[#111111]"
            >
              <span className="h-2 w-2 rounded-full bg-[#111111] transition-transform duration-300 group-hover:scale-150" />
              <span className="font-mono text-sm tracking-widest uppercase">
                {personalData.firstName}
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="group relative font-mono text-xs tracking-widest uppercase transition-colors text-[#555555] hover:text-[#111111]"
                  >
                    <span className="flex items-center gap-1.5">
                      {isActive && (
                        <motion.span
                          layoutId="navDot"
                          className="h-1.5 w-1.5 rounded-full bg-[#111111]"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                      <span className={isActive ? "font-semibold text-[#111111]" : ""}>
                        {link.label}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Right Action / Contact Badge */}
            <div className="hidden items-center gap-4 md:flex">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs tracking-wider uppercase text-[#777777] hover:text-[#111111] transition-colors"
              >
                <span>GITHUB</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "contact")}
                className="rounded-full bg-[#111111] px-4 py-2 font-mono text-xs tracking-wider text-[#faf9f5] transition-transform duration-200 hover:scale-105 hover:bg-black"
              >
                HIRE ME
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-xs font-mono tracking-widest uppercase text-[#111111] md:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Animated Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: editorialEase }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#111111] p-8 text-[#faf9f5] md:hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="font-mono text-xs tracking-widest uppercase">
                {personalData.name}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 font-mono text-xs tracking-widest uppercase"
              >
                <X size={14} />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col space-y-6 py-12">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: editorialEase }}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="group flex items-baseline justify-between border-b border-white/5 pb-4 text-3xl font-extrabold tracking-tight hover:text-[#aaaaaa]"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-white/40 group-hover:text-white">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Bottom Meta */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between font-mono text-xs tracking-wider text-white/60">
                <span>{personalData.location}</span>
                <span>{personalData.availability}</span>
              </div>
              <div className="flex gap-4 pt-2">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase underline text-white/80 hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase underline text-white/80 hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${personalData.email}`}
                  className="font-mono text-xs uppercase underline text-white/80 hover:text-white"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
