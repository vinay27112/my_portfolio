import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ProjectCard = React.memo(
  ({ project, expanded: initialExpanded = false }) => {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);
    const isLive = project.status === "live";
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const timeoutRef = useRef(null);

    // Throttled mouse move
    const handleMouseMove = (e) => {
      if (isTouchDevice) return;
      if (!cardRef.current) return;
      if (timeoutRef.current) return;
      timeoutRef.current = setTimeout(() => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 10, y: -y * 10 });
        timeoutRef.current = null;
      }, 30);
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);

    // Glow border – requestAnimationFrame throttled
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
    const glowRafRef = useRef(null);
    useEffect(() => {
      const handleGlobalMove = (e) => {
        if (!cardRef.current) return;
        if (glowRafRef.current) return;
        glowRafRef.current = requestAnimationFrame(() => {
          const rect = cardRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setGlowPosition({ x, y });
          glowRafRef.current = null;
        });
      };
      window.addEventListener("mousemove", handleGlobalMove);
      return () => {
        window.removeEventListener("mousemove", handleGlobalMove);
        if (glowRafRef.current) cancelAnimationFrame(glowRafRef.current);
      };
    }, []);

    return (
      <motion.div
        ref={cardRef}
        className="group relative will-change-transform"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: isTouchDevice ? 1 : 1.02,
          y: isTouchDevice ? 0 : -4,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          transform: isTouchDevice
            ? "none"
            : `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          willChange: "transform",
        }}
      >
        <div className="relative rounded-2xl bg-gray-900/90 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/50 overflow-hidden transition-all duration-300 hover:border-cyan-400/40 will-change-transform">
          {!isTouchDevice && (
            <div
              className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 120px at ${glowPosition.x}px ${glowPosition.y}px, rgba(0,220,255,0.6), rgba(160,120,255,0.3), transparent 80%)`,
              }}
            />
          )}

          {/* --- Content (unchanged) --- */}
          <div className="relative p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full font-medium ${
                  isLive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
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
              <span className="text-xs text-gray-400 font-mono tracking-wider">
                {project.period}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white tracking-tight">
                {project.name}
              </h3>
              <p className="text-sm text-gray-300 mt-0.5">{project.tagline}</p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
              {project.summary}
            </p>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-1.5 overflow-hidden"
                >
                  {project.details.map((d, i) => (
                    <li key={i} className="text-sm text-gray-300 flex gap-2">
                      <span className="text-cyan-400 shrink-0">▹</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            {project.details && project.details.length > 0 && (
              <button
                onClick={toggleExpand}
                className="text-xs text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1"
              >
                {isExpanded ? "Show less" : "Read more"}
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-300 font-mono hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-200"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors duration-200 group/link"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="group-hover/link:underline underline-offset-2">
                    Repo
                  </span>
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors duration-200 group/link"
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
                    <span className="group-hover/link:underline underline-offset-2">
                      Live demo
                    </span>
                  </a>
                )}
              </div>
              <span className="text-[10px] text-gray-500 font-mono">
                {project.stack.length} techs
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

export default ProjectCard;
