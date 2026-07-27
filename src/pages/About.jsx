import { useRef } from "react";
import {
  profile,
  experience,
  skills,
  achievements,
  certificates,
} from "../data";
import useScrollReveal from "../lib/useScrollReveal.js";
import TechBackground from "../components/TechBackground.jsx";

export default function About() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef, []);

  // Flatten all skills into a single array for the belt
  const allSkills = Object.values(skills).flat();

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden">
      {/* ---- Animated Background (same as Projects) ---- */}
      <TechBackground />

      {/* ---- Content ---- */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Header with Photo */}
        <div
          data-reveal
          className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12"
        >
          {/* Profile Photo */}
          <div className="relative shrink-0 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-cyan-400/40 p-1 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
              <img
                src="/profile.png"
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%231a1a2e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2338bdf8' font-size='24' font-family='sans-serif'%3EVA%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin-slow" />
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-pulse" />
          </div>

          {/* Header Text */}
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Vinay Agarwal{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"></span>
            </h1>
            <p className="text-lg text-gray-200 mt-2 max-w-xl">
              {profile.role} · {profile.location}
            </p>
            <p className="text-gray-300 max-w-xl leading-relaxed">
              {profile.education}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-cyan-400 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-cyan-400 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-cyan-400 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* ---- Bio (Glass panel) ---- */}
        <div
          data-reveal
          className="mb-16 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50"
        >
          <p className="text-gray-200 text-lg leading-relaxed max-w-3xl">
            {profile.tagline}
          </p>
        </div>

        {/* ---- Experience ---- */}
        <section className="mb-16 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <h2
            data-reveal
            className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-5 pb-2 border-b border-white/5"
          >
            Experience
          </h2>
          <div
            data-reveal
            className="flex items-baseline justify-between mb-1 flex-wrap gap-2"
          >
            <h3 className="font-semibold text-white text-lg">
              {experience.role} · {experience.company}
            </h3>
            <span className="text-sm text-gray-300 font-mono">
              {experience.period}
            </span>
          </div>
          <div data-reveal className="flex flex-wrap gap-1.5 mb-4 mt-3">
            {experience.stack.map((s) => (
              <span
                key={s}
                className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-300 font-mono"
              >
                {s}
              </span>
            ))}
          </div>
          <ul data-reveal-group className="space-y-2">
            {experience.points.map((p, i) => (
              <li
                key={i}
                data-reveal
                className="text-gray-200 flex gap-3 items-start"
              >
                <span className="text-cyan-400 shrink-0 mt-1">▹</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Skills with Tech Belt ---- */}
        <section className="mb-16 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50 overflow-hidden">
          <h2
            data-reveal
            className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-5 pb-2 border-b border-white/5"
          >
            Skills
          </h2>

          {/* ---- Skill Categories (grid) ---- */}
          <div data-reveal-group className="grid sm:grid-cols-2 gap-6 mb-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} data-reveal>
                <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  {category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-200 font-mono hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ---- Tech Belt (marquee of all skills) ---- */}
          <div className="relative overflow-hidden py-3 border-t border-white/5">
            <div className="tech-belt flex gap-8 whitespace-nowrap animate-scroll">
              {[...allSkills, ...allSkills].map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block px-4 py-1 text-sm font-mono text-gray-300 border border-white/10 rounded-full bg-white/5 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Achievements & Certifications ---- */}
        <section className="bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <h2
            data-reveal
            className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-5 pb-2 border-b border-white/5"
          >
            Achievements & Certifications
          </h2>
          <ul data-reveal-group className="space-y-2">
            {achievements.map((a, i) => (
              <li
                key={i}
                data-reveal
                className="text-gray-200 flex gap-3 items-start"
              >
                <span className="text-violet-400 shrink-0 mt-1">✦</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Resume Download ---- */}
        <div data-reveal className="mt-10 flex justify-center">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] transition-all duration-300 hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Resume (Master)
          </a>
        </div>
      </div>

      {/* ---- CSS for Tech Belt Animation ---- */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
