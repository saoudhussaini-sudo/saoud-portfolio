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
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light drop-shadow-lg">
          Computer Science Student & Creative Full-Stack Developer.
        </p>
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
