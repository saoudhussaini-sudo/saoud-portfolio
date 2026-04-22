import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(event.target)
    
    // Append the access key for Web3Forms
    formData.append("access_key", "ef3afee4-7cc6-4147-ac22-4c8bd72cddec")

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      })
      
      const resData = await res.json()
      
      if (resData.success) {
        toast.success("Message sent successfully!")
        event.target.reset()
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
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
            onSubmit={handleSubmit}
          >
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] transition-colors"
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#b026ff] transition-colors"
            />
            <textarea 
              name="message"
              rows="4" 
              placeholder="Your Message..." 
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] transition-colors resize-none"
            ></textarea>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="group w-full py-4 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#b026ff] text-black font-black text-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              )}
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  )
}
