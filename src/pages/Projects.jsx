import { useRef, useEffect } from "react";
import { projects } from "../data";
import ProjectCard from "../components/ProjectCard.jsx";
import TechBackground from "../components/TechBackground.jsx";
import HelixSpine from "../components/HelixSpine.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const hero = heroRef.current;
    const rows = rowsRef.current;

    if (!container || !hero || !rows.length) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      rows.forEach((row) => gsap.set(row, { opacity: 1, y: 0, rotateX: 0 }));
      return;
    }

    // Hero scroll animation
    gsap.to(hero, {
      opacity: 0.4,
      scale: 0.9,
      y: -60,
      ease: "power2.out",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    const heading = hero.querySelector("h1");
    if (heading) {
      gsap.to(heading, {
        y: -30,
        ease: "power2.out",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    // Rows entrance
    rows.forEach((row) => {
      gsap.set(row, {
        opacity: 0,
        y: 60,
        rotateX: 20,
        transformPerspective: 800,
      });
      gsap.to(row, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <TechBackground />
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* ---- Hero Section (UPDATED) ---- */}
        {/* ---- Hero Section (FULLY VISIBLE) ---- */}
        <div ref={heroRef} className="relative z-10 mb-20 max-w-4xl mx-auto">
          {/* Dark glass panel behind text for contrast */}
          <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-black/50">
            <div className="text-center">
              {/* Badge */}
              <span className="inline-block text-xs font-medium text-cyan-400 tracking-widest uppercase border border-cyan-400/30 px-4 py-1.5 rounded-full mb-6">
                DeFi · Web3 · Full Stack
              </span>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                Systems that
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  touch the chain
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
                8‑service event‑driven backends · Solidity on Sepolia ·
                AI‑powered risk scoring · IPFS storage
              </p>

              {/* Stats – quick highlights from your resume */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-6">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">3+</div>
                  <div className="text-xs text-gray-400">Live Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-violet-400">4</div>
                  <div className="text-xs text-gray-400">Projects Shipped</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">8</div>
                  <div className="text-xs text-gray-400">Microservices</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-violet-400">50+</div>
                  <div className="text-xs text-gray-400">LeetCode</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:shadow-[0_0_30px_rgba(0,220,255,0.3)] transition-all duration-300 hover:scale-105"
                >
                  Explore Projects
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:border-cyan-400/50 transition-all duration-300"
                >
                  Get In Touch
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="px-6 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-cyan-400/30 transition-all duration-300 flex items-center gap-2"
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Projects Timeline ---- */}
        <div id="projects" className="relative pr-8 md:pr-16">
          <HelixSpine containerRef={containerRef} />

          <div className="space-y-16 md:space-y-24 max-w-3xl">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (rowsRef.current[index] = el)}
                className="relative"
              >
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 hidden md:block"
                  style={{
                    background: "radial-gradient(circle, #00f0ff, #8b5cf6)",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
                    right: -24,
                  }}
                />
                <Link to={`/projects/${project.id}`} className="block group">
                  <ProjectCard project={project} expanded />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
