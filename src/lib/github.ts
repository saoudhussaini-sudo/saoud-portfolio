export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  homepage: string | null;
}

export interface GithubProfile {
  login: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
}

export interface GithubDataResult {
  profile: GithubProfile;
  repos: GithubRepo[];
  totalStars: number;
  languages: string[];
  isFallback: boolean;
}

const FALLBACK_PROFILE: GithubProfile = {
  login: "saoudhussaini-sudo",
  name: "Syed Saoud Ullah Hussaini",
  bio: "Software Developer & Builder | Python, React, Automation, AI Systems",
  public_repos: 18,
  followers: 42,
  following: 15,
  avatar_url: "https://github.com/saoudhussaini-sudo.png",
  html_url: "https://github.com/saoudhussaini-sudo",
};

const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 1,
    name: "event-horizon",
    description: "Interactive 3D astrophysical black hole simulation using Three.js, React Fiber, and custom GLSL raymarching shaders.",
    html_url: "https://github.com/saoudhussaini-sudo/event-horizon",
    stargazers_count: 14,
    forks_count: 3,
    language: "JavaScript",
    topics: ["threejs", "glsl", "webgl", "astrophysics", "shaders"],
    updated_at: "2026-02-15T00:00:00Z",
    homepage: "https://saoudhussaini-sudo.github.io/event-horizon/",
  },
  {
    id: 2,
    name: "internscout",
    description: "AI-driven technical opportunity scanner aggregating and ranking software engineering opportunities via vector similarity.",
    html_url: "https://github.com/saoudhussaini-sudo/internscout",
    stargazers_count: 9,
    forks_count: 2,
    language: "TypeScript",
    topics: ["nextjs", "typescript", "prisma", "ai-matching"],
    updated_at: "2026-01-20T00:00:00Z",
    homepage: null,
  },
  {
    id: 3,
    name: "attendease",
    description: "Institutional attendance and workforce scheduling platform with QR token verification and real-time audit logging.",
    html_url: "https://github.com/saoudhussaini-sudo/attendease",
    stargazers_count: 11,
    forks_count: 4,
    language: "TypeScript",
    topics: ["react", "nodejs", "postgresql", "tailwindcss"],
    updated_at: "2025-11-10T00:00:00Z",
    homepage: null,
  },
  {
    id: 4,
    name: "jarvis-assistant",
    description: "Modular voice and workflow automation assistant powered by LLM function calling and Python task execution daemons.",
    html_url: "https://github.com/saoudhussaini-sudo/jarvis-assistant",
    stargazers_count: 8,
    forks_count: 1,
    language: "Python",
    topics: ["python", "llm", "automation", "voice-assistant"],
    updated_at: "2025-09-05T00:00:00Z",
    homepage: null,
  },
];

const CACHE_KEY = "saoud_github_cache_v2";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function fetchGithubData(username = "saoudhussaini-sudo"): Promise<GithubDataResult> {
  // Check local cache
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          return parsed.data;
        }
      }
    } catch {
      // ignore storage errors
    }
  }

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=6`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API returned error: ${profileRes.status} / ${reposRes.status}`);
    }

    const profile: GithubProfile = await profileRes.json();
    const repos: GithubRepo[] = await reposRes.json();

    const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const languages = Array.from(
      new Set(repos.map((r) => r.language).filter(Boolean) as string[])
    );

    const result: GithubDataResult = {
      profile,
      repos,
      totalStars,
      languages,
      isFallback: false,
    };

    // Cache if valid
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: result })
        );
      } catch {
        // ignore cache write errors
      }
    }

    return result;
  } catch {
    // Return robust curated fallback
    const totalStars = FALLBACK_REPOS.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const languages = ["Python", "TypeScript", "JavaScript", "GLSL", "SQL"];
    return {
      profile: FALLBACK_PROFILE,
      repos: FALLBACK_REPOS,
      totalStars,
      languages,
      isFallback: true,
    };
  }
}
