import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4">
      {/* 
        The planet is in the background canvas, perfectly positioned in the center. 
        We push the text down a bit so they don't overlap too intensely initially.
      */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="z-10 text-center pointer-events-auto mt-[40vh]"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 drop-shadow-2xl">
          Hi, I'm <span className="text-gradient">Syed Saoud</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light drop-shadow-lg mb-8">
          Computer Science Student & Creative Full-Stack Developer.
        </p>

        <div className="flex justify-center space-x-6 mt-8">
          <a href="https://github.com/saoudhussaini-sudo" target="_blank" rel="noopener noreferrer" className="p-3 glassmorphism rounded-full hover:glow-border transition-all hover:scale-110 text-white/70 hover:text-[#00f0ff]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/saoud-hussaini-041410333/" target="_blank" rel="noopener noreferrer" className="p-3 glassmorphism rounded-full hover:glow-border transition-all hover:scale-110 text-white/70 hover:text-[#b026ff]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2-2 v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center opacity-70 pointer-events-auto"
      >
        <span className="text-xs uppercase tracking-[0.3em] mb-2 text-gray-400">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2 glow-border">
          <div className="w-1 h-2 bg-white rounded-full animate-ping" />
        </div>
      </motion.div>
    </section>
  )
}
