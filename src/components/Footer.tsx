import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { personalData } from "../data/personal";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0a0a0c] text-[#faf9f5] border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
        
        {/* Top Info Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="space-y-1">
            <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest block">
              LOCAL TIME // HYDERABAD, INDIA (IST)
            </span>
            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>{time || "12:00:00 AM"} (UTC +5:30)</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-xs tracking-wider text-white hover:bg-white hover:text-[#111111] transition-all"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} className="transition-transform duration-200 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Bottom Credits & Tag */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            <span>DESIGNED & DEVELOPED BY {personalData.name.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-4">
            <span>BUILT WITH REACT & TAILWIND</span>
            <span>•</span>
            <span>{personalData.year} ALL RIGHTS RESERVED</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
