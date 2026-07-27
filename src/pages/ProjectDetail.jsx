import { useParams, Link } from "react-router-dom";
import { projects } from "../data";
import TechBackground from "../components/TechBackground.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../markdown.css";
import { useState, useEffect } from "react";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress((scrollY / height) * 100);
      setShowBackToTop(scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Project not found</h1>
          <Link
            to="/projects"
            className="text-cyan-400 hover:underline mt-4 inline-block"
          >
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const isLive = project.status === "live";
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen">
      <TechBackground />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-cyan-500/20">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 px-6 pt-20 pb-12 border-b border-white/5 bg-gradient-to-b from-black/60 via-black/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 mb-8 group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to projects
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <span
              className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full font-medium ${
                isLive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 animate-pulse"
                  : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
              }`}
            >
              {isLive && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
              )}
              {project.statusLabel}
            </span>
            <span className="text-sm text-gray-400 font-mono">
              {project.period}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            {project.name}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mt-4 max-w-2xl leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-200 border border-white/10 px-4 py-2 rounded-full hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-200 border border-white/10 px-4 py-2 rounded-full hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Markdown Content with enhanced glass panel */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-black/50 relative overflow-hidden">
          {/* Gradient border glow */}
          <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 opacity-50" />
          <div className="relative">
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.readme}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top button with animation */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] group"
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
