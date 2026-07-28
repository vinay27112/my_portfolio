import { useRef } from "react";
import {
  profile,
  experience,
  skills,
  achievements,
  certificates,
  educationHistory, // 👈 new import
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
      <TechBackground />

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
            {profile.tagline3}
          </p>
        </div>

        {/* ===== EDUCATION – PREMIUM TIMELINE ===== */}
        <section className="mb-16 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50 relative overflow-hidden group">
          {/* Subtle gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-8 pb-2 border-b border-white/5">
              <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                Education
              </h2>
              <span className="ml-auto text-xs text-gray-500">
                Academic Journey
              </span>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line (hidden on small screens) */}
              <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/30 via-violet-400/20 to-transparent hidden sm:block" />

              {educationHistory.map((edu, idx) => (
                <div
                  key={idx}
                  data-reveal
                  className="relative pl-8 sm:pl-14 pb-8 last:pb-0 group/edu"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 sm:left-2.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(56,189,248,0.6)] border-2 border-black z-10" />

                  {/* Glass card */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 shadow-lg shadow-black/20 transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.05)] group-hover/edu:scale-[1.01]">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Left: Text content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-white tracking-tight">
                              {edu.level}
                            </h3>
                            <p className="text-cyan-400 text-sm font-medium">
                              {edu.institution}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
                            {edu.year}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                          {edu.cgpa && (
                            <span className="flex items-center gap-1 text-gray-200">
                              <span className="text-cyan-400">📊</span> CGPA:{" "}
                              <span className="text-white font-medium">
                                {edu.cgpa}
                              </span>
                            </span>
                          )}
                          {edu.percentage && (
                            <span className="flex items-center gap-1 text-gray-200">
                              <span className="text-violet-400">📈</span>{" "}
                              Percentage:{" "}
                              <span className="text-white font-medium">
                                {edu.percentage}
                              </span>
                            </span>
                          )}
                          {edu.status && (
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                                edu.status === "Completed"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/30"
                                  : "bg-amber-500/20 text-amber-400 border border-amber-400/30"
                              }`}
                            >
                              {edu.status}
                            </span>
                          )}
                        </div>
                        {!edu.image && edu.level.includes("B.Tech") && (
                          <p className="text-xs text-gray-500 italic mt-3 flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400/60 animate-pulse" />
                            Degree certificate will be added upon completion
                          </p>
                        )}
                      </div>

                      {/* Right: Image (if exists) */}
                      {edu.image && (
                        <div className="shrink-0 flex items-center md:justify-end">
                          <a
                            href={edu.image}
                            target="_blank"
                            rel="noreferrer"
                            className="block group/img relative rounded-lg overflow-hidden border border-white/10 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-cyan-400/40"
                            style={{ width: "100px", height: "140px" }}
                          >
                            <img
                              src={edu.image}
                              alt={`${edu.level} certificate`}
                              className="w-full h-full object-cover"
                            />
                            {/* Overlay with icon on hover */}
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                                />
                              </svg>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
