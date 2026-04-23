import { motion } from 'framer-motion'

const TimelineItem = ({ year, title, subtitle, description, isLeft }) => {
  return (
    <div className={`flex flex-col md:flex-row w-full mb-12 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      <div className="md:w-1/2" />
      
      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center justify-start absolute left-1/2 -translate-x-1/2 mt-1">
        <div className="w-4 h-4 rounded-full bg-[#00f0ff] glow-border z-10" />
        <div className="w-px h-full bg-gradient-to-b from-[#00f0ff] to-transparent -mt-2 opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`md:w-1/2 pb-8 px-6 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}
      >
        <span className="text-sm font-bold tracking-widest text-[#b026ff] uppercase">{year}</span>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{title}</h3>
        <h4 className="text-md text-[#00f0ff] mb-4">{subtitle}</h4>
        <p className="text-gray-400 text-sm leading-relaxed glass-panel p-5 inline-block text-left w-full">
          {description}
        </p>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const experiences = [
    {
      year: "Phase 01",
      title: "Discovering Tech",
      subtitle: "The Beginning",
      description: "My journey started with curiosity about how digital systems work, which led me into the world of coding."
    },
    {
      year: "Phase 02",
      title: "Creating Projects",
      subtitle: "Learning by Doing",
      description: "I turned that curiosity into action by building interactive projects, experimenting with ideas, and learning by doing."
    },
    {
      year: "Phase 03",
      title: "Pushing Boundaries",
      subtitle: "The Vision",
      description: "Today, I focus on developing advanced, impactful solutions—combining creativity with technology to build meaningful experiences."
    }
  ]

  return (
    <section id="experience" className="py-24 px-6 relative w-full z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-16 text-center"
        >
          My Journey
        </motion.h2>

        <div className="relative">
          {/* Main timeline vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          
          {experiences.map((exp, index) => (
            <TimelineItem 
              key={index}
              year={exp.year}
              title={exp.title}
              subtitle={exp.subtitle}
              description={exp.description}
              isLeft={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
