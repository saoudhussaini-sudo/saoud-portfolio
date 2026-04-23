import { motion } from 'framer-motion'
import { Terminal, Code, Cpu } from 'lucide-react'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  return (
    <section id="about" className="min-h-screen py-24 px-6 md:px-12 flex items-center xl:w-[70%] z-10 relative">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-8">
          <span className="text-gradient">{"<"}</span> About Me <span className="text-gradient">{"/>"}</span>
        </motion.h2>
        
        <motion.div variants={itemVariants} className="glass-panel p-8 md:p-10 text-lg text-gray-300 leading-relaxed space-y-6">
          <p>
            I’m a Computer Science student with a strong interest in building interactive, intelligent, and visually engaging digital experiences.
          </p>
          <p>
            I enjoy combining creativity with logic—whether it’s developing dynamic web applications, experimenting with simulations, or exploring the power of AI-driven systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-black/40 border border-[#00f0ff]/30 text-[#00f0ff] glow-border">
                <Code size={24} />
              </div>
              <h3 className="font-bold text-white">Frontend</h3>
              <p className="text-sm text-gray-400">React, Three.js, Tailwind, Framer Motion</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-black/40 border border-[#b026ff]/30 text-[#b026ff] glow-border">
                <Terminal size={24} />
              </div>
              <h3 className="font-bold text-white">Backend</h3>
              <p className="text-sm text-gray-400">Node.js, Express, Python, Java</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-black/40 border border-white/30 text-white glow-border">
                <Cpu size={24} />
              </div>
              <h3 className="font-bold text-white">Systems</h3>
              <p className="text-sm text-gray-400">Databases, APIs, Cloud Deployments</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
