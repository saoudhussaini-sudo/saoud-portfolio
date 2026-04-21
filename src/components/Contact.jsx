import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative w-full z-10">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 border-t-2 border-[#b026ff]/50 relative overflow-hidden">
        
        {/* Glow orb background */}
        <div className="absolute top-0 right-0 -m-20 w-64 h-64 bg-[#b026ff] rounded-full blur-[100px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -m-20 w-64 h-64 bg-[#00f0ff] rounded-full blur-[100px] opacity-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-6"
            >
              Let's <span className="text-gradient">Connect</span>
            </motion.h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-[#00f0ff]/20 p-3 rounded-full text-[#00f0ff]">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email Me</p>
                <a href="mailto:saoudhussaini@gmail.com" className="text-xl font-bold text-white hover:text-[#00f0ff] transition-colors">
                  saoudhussaini@gmail.com
                </a>
              </div>
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-4"
            onSubmit={(e) => { e.preventDefault(); alert("Thanks for the message! (Demo)"); }}
          >
            <input 
              type="text" 
              placeholder="Your Name" 
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] transition-colors"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#b026ff] transition-colors"
            />
            <textarea 
              rows="4" 
              placeholder="Your Message..." 
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] transition-colors resize-none"
            ></textarea>
            
            <button 
              type="submit"
              className="group w-full py-4 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#b026ff] text-black font-black text-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <span>Send Message</span>
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  )
}
