import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 border-t border-white/10 glassmorphism relative z-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-black text-gradient">SAOUD.</h2>
          <p className="text-sm text-gray-500 mt-1">© {new Date().getFullYear()} Syed Saoud. All rights reserved.</p>
        </div>

        <div className="flex space-x-6">
          <a href="https://github.com/saoudhussaini-sudo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00f0ff] transition-colors hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/saoud-hussaini-041410333/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#b026ff] transition-colors hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>

        <button 
          onClick={scrollToTop}
          className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all glow-border focus:outline-none flex items-center justify-center"
        >
          <ArrowUp size={20} />
        </button>

      </div>
    </footer>
  )
}
