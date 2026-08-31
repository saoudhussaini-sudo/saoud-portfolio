import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Copy, Loader2, Mail, Send, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { personalData } from "../data/personal";
import { editorialEase } from "../lib/animations";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!name.trim() || name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name (minimum 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please enter a message (minimum 10 characters).");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Simulate real async API endpoint dispatch (or can be connected to Formspree endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.85 },
          colors: ["#111111", "#444444", "#888888", "#10B981"],
        });
      } catch {
        // confetti fallback
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send message. Please email directly.");
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 md:py-36 bg-[#111111] text-[#faf9f5] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-white uppercase">
              /CONTACT
            </span>
          </div>
          <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Massive Editorial Typography */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase }}
                className="text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-tight leading-[0.92]"
              >
                <span>LET'S</span>
                <br />
                <span className="text-white/60">BUILD</span>
                <br />
                <span>SOMETHING.</span>
              </motion.h2>
            </div>

            <p className="text-lg sm:text-xl text-white/70 max-w-md leading-relaxed font-light">
              Have an idea, project, internship opportunity, collaboration, or simply want to talk tech?
            </p>

            {/* Direct Email Click-to-Copy Pill */}
            <div className="pt-4 space-y-3">
              <span className="font-mono text-xs tracking-widest uppercase text-white/40 block">
                DIRECT INBOX
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${personalData.email}`}
                  className="flex items-center gap-3 rounded-full bg-white/10 border border-white/15 px-6 py-3.5 font-mono text-xs tracking-wider text-white transition-all hover:bg-white hover:text-[#111111]"
                >
                  <Mail size={15} />
                  <span>{personalData.email}</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-3.5 font-mono text-xs text-white/70 hover:text-white hover:border-white/30 transition-all"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedEmail ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10">
              <span className="font-mono text-xs tracking-widest uppercase text-white/40 block mb-4">
                FIND ME ONLINE
              </span>
              <div className="flex flex-wrap gap-4">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-mono text-xs text-white/80 hover:text-white uppercase"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="text-white/20">•</span>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-mono text-xs text-white/80 hover:text-white uppercase"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-white/10 bg-[#18181c] p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mb-8 font-mono">
                Typically replies within 24 hours.
              </p>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-center py-12"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Check size={32} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-white">Message Received!</h4>
                      <p className="text-sm text-white/70 max-w-sm mx-auto">
                        Thank you for reaching out. I have received your note and will get back to you promptly.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="rounded-full bg-white/10 px-6 py-2.5 font-mono text-xs text-white hover:bg-white/20 transition-colors"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="font-mono text-xs tracking-wider uppercase text-white/60 block">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        disabled={status === "submitting"}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/25 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="font-mono text-xs tracking-wider uppercase text-white/60 block">
                        YOUR EMAIL
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        disabled={status === "submitting"}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/25 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                      <label className="font-mono text-xs tracking-wider uppercase text-white/60 block">
                        PROJECT / MESSAGE
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about your idea, timeline, or scope..."
                        disabled={status === "submitting"}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/25 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Error Banner */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400"
                      >
                        {errorMessage}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 font-mono text-xs font-bold tracking-widest uppercase text-[#111111] transition-all hover:bg-[#faf9f5] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>SENDING INQUIRY...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <Send size={14} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
