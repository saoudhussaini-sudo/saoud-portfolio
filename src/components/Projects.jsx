import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const ProjectCard = ({ title, tech, desc, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1000px" }} className="h-full">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-panel p-6 rounded-xl flex flex-col h-full hover:glow-border transition-all duration-300 cursor-pointer relative"
      >
        <div style={{ transform: "translateZ(50px)" }} className="w-full h-40 bg-black/60 rounded-lg mb-6 overflow-hidden relative border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#b026ff]/30 to-[#00f0ff]/30 opacity-40 mix-blend-screen" />
          <div className="absolute inset-0 flex items-center justify-center text-white/30 font-black text-2xl uppercase tracking-widest">
            {title.substring(0,2)}
          </div>
        </div>
        
        <h3 style={{ transform: "translateZ(40px)" }} className="text-xl font-bold text-white mb-3">
          {title}
        </h3>
        
        <p style={{ transform: "translateZ(30px)" }} className="text-sm text-gray-400 mb-6 flex-grow">
          {desc}
        </p>

        <div style={{ transform: "translateZ(20px)" }} className="flex flex-wrap gap-2 mb-6">
          {tech.map((t, i) => (
            <span key={i} className="text-xs font-semibold text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 rounded border border-[#00f0ff]/20">
              {t}
            </span>
          ))}
        </div>

        <a href={link || '#'} target={link ? "_blank" : "_self"} rel="noopener noreferrer" style={{ transform: "translateZ(40px)" }} className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-white/70 hover:text-white transition-colors z-10 pointer-events-auto">
          <span className="text-sm font-bold tracking-wide">{link ? "View on GitHub" : "Coming Soon"}</span>
          {link && <ExternalLink size={16} />}
        </a>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const projects = [
    { title: "Neural Tasks", desc: "AI-driven task management system with predictive scheduling and smart prioritization capabilities.", tech: ["React", "Python", "TensorFlow"] },
    { title: "Quantum Trade", desc: "High-frequency crypto trading algorithms dashboard with real-time WebGL charting.", tech: ["Three.js", "Node.js", "WebSockets"] },
    { title: "Neon Engine", desc: "A custom lightweight 3D rendering engine built completely from scratch for web browsers.", tech: ["WebGL", "JavaScript", "GLSL"] },
    { title: "Astro Social", desc: "Decentralized space-themed social network utilizing IPFS for secure, fast peer-to-peer data storage.", tech: ["Next.js", "Solidity", "IPFS"] },
    { title: "Event Horizon", desc: "A black hole simulation interactive educational tool using physics equations and Raymarching.", tech: ["Three.js", "React Fiber", "Shaders"], link: "https://github.com/saoudhussaini-sudo/event-horizon" },
    { title: "Cyber Protocol", desc: "End-to-end encrypted messaging application with self-destructing data packets.", tech: ["React Native", "Express", "Crypto"] },
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative w-full z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-gray-400 font-light">Hover over the cards to interact with the 3D tilt effect.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={idx}
            >
              <ProjectCard {...proj} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
