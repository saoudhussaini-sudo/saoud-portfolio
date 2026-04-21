import { motion } from 'framer-motion'

export default function Navbar() {
  const links = ['About', 'Experience', 'Projects', 'Contact'];
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 glassmorphism"
    >
      <div className="text-2xl font-black tracking-tighter cursor-pointer text-gradient">
        SAOUD.
      </div>
      <ul className="hidden md:flex space-x-8">
        {links.map((link) => (
          <li key={link}>
            <a 
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-gray-300 hover:text-white transition-all drop-shadow-md hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="hidden md:block px-6 py-2 text-sm font-bold border border-white/20 rounded-full hover:bg-white hover:text-black transition-all glow-border">
        Connect
      </a>
    </motion.nav>
  )
}
