import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code, GitFork, Loader2, Star } from "lucide-react";
import { GithubIcon } from "./Icons";
import { fetchGithubData, type GithubDataResult } from "../lib/github";
import { personalData } from "../data/personal";
import { editorialEase } from "../lib/animations";

export default function GithubSection() {
  const [data, setData] = useState<GithubDataResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchGithubData(personalData.githubUsername).then((res) => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="github" className="relative w-full py-24 md:py-36 bg-[#f5f4ef] border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-8 mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: editorialEase }}
            >
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#111111] uppercase block mb-3">
                /BUILDING IN PUBLIC
              </span>
              <h2 className="section-title text-[#111111] uppercase">
                OPEN SOURCE & GITHUB
              </h2>
            </motion.div>
          </div>

          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 font-mono text-xs tracking-wider text-[#faf9f5] hover:bg-black transition-all hover:scale-105 shrink-0"
          >
            <GithubIcon size={15} />
            <span>VIEW GITHUB PROFILE</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Profile Card & Stats Grid */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-black/10 bg-white p-12">
            <div className="flex flex-col items-center gap-3 font-mono text-xs text-[#888888]">
              <Loader2 className="animate-spin text-[#111111]" size={24} />
              <span>SYNCING GITHUB REPOSITORIES...</span>
            </div>
          </div>
        ) : data ? (
          <div className="space-y-8">
            {/* Top Metric Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-black/10 bg-white p-5 space-y-1">
                <span className="font-mono text-[11px] text-[#888888] uppercase">
                  PUBLIC REPOSITORIES
                </span>
                <p className="text-3xl font-extrabold text-[#111111]">
                  {data.profile.public_repos || data.repos.length}
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-5 space-y-1">
                <span className="font-mono text-[11px] text-[#888888] uppercase">
                  TOTAL STARS EARNED
                </span>
                <p className="text-3xl font-extrabold text-[#111111]">
                  {data.totalStars}
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-5 space-y-1">
                <span className="font-mono text-[11px] text-[#888888] uppercase">
                  PRIMARY LANGUAGES
                </span>
                <p className="text-3xl font-extrabold text-[#111111]">
                  {data.languages.length}
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-5 space-y-1">
                <span className="font-mono text-[11px] text-[#888888] uppercase">
                  GITHUB STATUS
                </span>
                <div className="flex items-center gap-2 pt-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-sm font-bold text-[#111111]">ACTIVE BUILDER</span>
                </div>
              </div>
            </div>

            {/* Repositories Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.repos.map((repo, idx) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: editorialEase }}
                  className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-black hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#111111]">
                        <Code size={16} />
                        <span className="font-mono text-xs font-bold text-[#888888]">
                          REPO // 0{idx + 1}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-[#888888] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#111111]"
                      />
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-[#111111] group-hover:text-black">
                      {repo.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#666666] line-clamp-3 leading-relaxed">
                      {repo.description || "Public open-source repository and code artifacts."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 text-xs font-mono text-[#777777]">
                    <span className="rounded-md bg-[#faf9f5] border border-black/5 px-2.5 py-0.5 font-semibold text-[#111111]">
                      {repo.language || "TypeScript"}
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star size={13} className="text-amber-500" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={13} />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
