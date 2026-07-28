import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  profile,
  projects,
  skills,
  experience,
  achievements,
  certificates,
  educationHistory,
} from "../data";
import ProjectCard from "../components/ProjectCard.jsx";
import TechBackground from "../components/TechBackground.jsx";
import useLenis from "../lib/useLenis.js";
import useScrollReveal from "../lib/useScrollReveal.js";

gsap.registerPlugin(ScrollTrigger);

// ---- Optimised Orbiting Particles ----
function OrbitingParticles({ containerRef }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const frameCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const container = containerRef?.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const numParticles = 25;
    const particles = [];
    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 50 + Math.random() * 100;
      const speed = 0.002 + Math.random() * 0.003;
      const size = 1.5 + Math.random() * 2;
      const phase = Math.random() * Math.PI * 2;
      const color = `rgba(56, 189, 248, ${0.3 + Math.random() * 0.4})`;
      particles.push({ angle, radius, speed, size, phase, color, x: 0, y: 0 });
    }

    let time = 0;
    const animate = () => {
      frameCount.current++;
      if (frameCount.current % 2 === 0) {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const centerX = w / 2;
        const centerY = h / 2;
        const maxRadius = Math.min(w, h) * 0.4;

        particles.forEach((p) => {
          p.angle += p.speed;
          const yOffset = Math.sin(time * 0.02 + p.phase) * 15;
          const r = Math.min(p.radius, maxRadius);
          const x = centerX + Math.cos(p.angle) * r;
          const y = centerY + Math.sin(p.angle) * r * 0.7 + yOffset;
          p.x = x;
          p.y = y;

          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(56, 189, 248, 0.2)";
          ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 50) {
              const alpha = 1 - dist / 50;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.12})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        time++;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: "block" }}
    />
  );
}

// ---- Main Home ----
export default function Home() {
  const heroRef = useRef(null);
  const pageRef = useRef(null);
  const imageRef = useRef(null);
  const greetingRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const expRef = useRef(null);
  const projectsRef = useRef(null);
  const finalCtaRef = useRef(null);
  const belt1Ref = useRef(null);
  const belt2Ref = useRef(null);
  const achievementsRef = useRef(null);
  const certsRef = useRef(null);
  const container3DRef = useRef(null);
  const floatingShapesRef = useRef([]);
  const educationRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useLenis();
  useScrollReveal(pageRef, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Split text reveal
  useGSAP(
    () => {
      const el = greetingRef.current;
      if (!el) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        gsap.set(el, { opacity: 1 });
        return;
      }
      const text = el.textContent;
      const chars = text
        .split("")
        .map((char) => (char === " " ? "\u00A0" : char));
      el.innerHTML = chars
        .map(
          (char) =>
            `<span class="char" style="display:inline-block;">${char}</span>`,
        )
        .join("");
      const charElements = el.querySelectorAll(".char");
      gsap.set(charElements, { opacity: 0, y: 40, rotateX: 90 });
      gsap.to(charElements, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.04,
        stagger: 0.03,
        ease: "power2.out",
        delay: 0.3,
      });
    },
    { scope: heroRef },
  );

  // Scroll exit
  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;
      const elements = [
        greetingRef.current,
        roleRef.current,
        descRef.current,
        ctaRef.current,
        container3DRef.current,
      ];
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;
      elements.forEach((el) => {
        if (el) {
          gsap.to(el, {
            y: -80,
            opacity: 0.4,
            scale: 0.95,
            ease: "power2.out",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      });
    },
    { scope: heroRef },
  );

  // Mouse parallax (3D tilt)
  useEffect(() => {
    const container = container3DRef.current;
    if (!container) return;
    const x = mousePos.x * 6;
    const y = -mousePos.y * 6;
    gsap.to(container, {
      rotateY: x,
      rotateX: y,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [mousePos]);

  // Clip‑path image reveal
  useGSAP(
    () => {
      const image = imageRef.current;
      if (!image) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        gsap.set(image, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }
      gsap.set(image, { clipPath: "circle(5% at 50% 50%)", opacity: 0 });
      gsap.to(image, {
        clipPath: "circle(70.7% at 50% 50%)",
        opacity: 1,
        duration: 1.6,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: heroRef },
  );

  // Floating shapes
  useEffect(() => {
    const shapes = floatingShapesRef.current;
    if (!shapes.length) return;
    shapes.forEach((shape, i) => {
      const duration = 6 + Math.random() * 8;
      const delay = i * 0.5;
      const x = (Math.random() - 0.5) * 150;
      const y = (Math.random() - 0.5) * 150;
      gsap.to(shape, {
        x: x,
        y: y,
        rotation: 360,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  // Magnetic CTA
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const btnRefs = useRef([]);
  const handleBtnMove = (e, index) => {
    const rect = btnRefs.current[index]?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setBtnPos({ x, y });
  };
  const handleBtnLeave = () => setBtnPos({ x: 0, y: 0 });

  // Parallax for sections
  useEffect(() => {
    const sections = [
      aboutRef,
      skillsRef,
      expRef,
      projectsRef,
      finalCtaRef,
      achievementsRef,
      certsRef,
      educationRef,
    ];
    sections.forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "top 30%",
              scrub: 1.2,
            },
          },
        );
      }
    });
  }, []);

  // Data
  const featured = projects.filter((p) => p.status === "live").slice(0, 3);
  const allSkills = Object.values(skills).flat();
  const liveCount = projects.filter((p) => p.status === "live").length;
  const totalProjects = projects.length;
  const microservices =
    projects.find((p) => p.id === "yieldmind")?.details?.length || 0;
  const leetcode = "50+";

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden">
      <TechBackground />

      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-[90vh] flex items-center px-6 py-16"
      >
        <div className="max-w-7xl mx-auto w-full relative h-full">
          <div className="flex flex-col md:flex-row items-center h-full gap-8">
            {/* Left: Text */}
            <div className="flex-1 z-10 text-center md:text-left py-12">
              <p
                ref={greetingRef}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
              >
                Hi, I'm {profile.name.split(" ")[0]}
              </p>
              <p
                ref={roleRef}
                className="text-xl sm:text-2xl font-semibold text-cyan-400 mt-2"
              >
                {profile.role}
              </p>
              <p
                ref={descRef}
                className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto md:mx-0 mt-4 leading-relaxed"
              >
                {profile.tagline1}
              </p>

              <div
                ref={ctaRef}
                className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
              >
                {[
                  {
                    to: "/projects",
                    label: "Explore My Work",
                    color: "from-cyan-500 to-violet-500",
                  },
                  {
                    to: "/contact",
                    label: "Get In Touch",
                    color:
                      "border border-white/20 text-gray-300 hover:text-white hover:border-cyan-400/50",
                  },
                ].map((btn, index) => (
                  <Link
                    key={index}
                    to={btn.to}
                    ref={(el) => (btnRefs.current[index] = el)}
                    onMouseMove={(e) => handleBtnMove(e, index)}
                    onMouseLeave={handleBtnLeave}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                      btn.color.includes("border")
                        ? btn.color
                        : `bg-gradient-to-r ${btn.color} text-white font-medium hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:scale-105`
                    }`}
                    style={{
                      transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
                      transition: "transform 0.15s ease-out",
                    }}
                  >
                    <span className="relative inline-block">
                      {btn.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                ))}
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

            {/* Right: Image with particles */}
            <div
              ref={container3DRef}
              className="relative w-full md:w-1/2 h-[60vh] md:h-[80vh] flex items-center justify-center order-first md:order-last"
              style={{ perspective: "800px" }}
            >
              <OrbitingParticles containerRef={container3DRef} />

              {/* Floating shapes */}
              <div
                ref={(el) => (floatingShapesRef.current[0] = el)}
                className="absolute -top-8 -left-8 w-8 h-8 bg-cyan-400/20 rounded-full blur-md z-10"
                style={{ willChange: "transform" }}
              />
              <div
                ref={(el) => (floatingShapesRef.current[1] = el)}
                className="absolute -bottom-8 -right-8 w-12 h-12 bg-violet-400/20 rounded-full blur-md z-10"
                style={{ willChange: "transform" }}
              />
              <div
                ref={(el) => (floatingShapesRef.current[2] = el)}
                className="absolute top-1/2 -right-10 w-5 h-5 bg-cyan-400/30 rounded-full blur-md z-10"
                style={{ willChange: "transform" }}
              />
              <div
                ref={(el) => (floatingShapesRef.current[3] = el)}
                className="absolute top-1/3 -left-10 w-10 h-10 bg-violet-400/20 rounded-full blur-md z-10"
                style={{ willChange: "transform" }}
              />
              <div
                ref={(el) => (floatingShapesRef.current[4] = el)}
                className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-cyan-400/40 rounded-full blur-md z-10"
                style={{ willChange: "transform" }}
              />

              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-400/20 blur-3xl opacity-50 animate-pulse z-0" />

              {/* Image – no border, no ring */}
              <div
                ref={imageRef}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 z-10"
                style={{ transform: "rotateY(0deg) rotateX(0deg)" }}
              >
                <img
                  src="/hero.png"
                  alt={profile.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='800' height='800' fill='%231a1a2e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2338bdf8' font-size='48' font-family='sans-serif'%3EHERO%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Caption */}
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-400/70 italic z-20 whitespace-nowrap bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                Generated with AI · I liked it, so I kept it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BELT 1: Tech Stack ===== */}
      <div
        ref={belt1Ref}
        className="relative z-10 overflow-hidden py-3 bg-black/40 backdrop-blur-sm border-y border-white/5"
      >
        <div className="flex gap-8 whitespace-nowrap animate-scroll-left">
          {[...allSkills, ...allSkills, ...allSkills, ...allSkills].map(
            (skill, idx) => (
              <span
                key={idx}
                className="inline-block text-sm font-mono text-gray-300 hover:text-cyan-400 transition-colors duration-200 px-2"
              >
                {skill}
              </span>
            ),
          )}
        </div>
      </div>

      {/* ===== ABOUT ME ===== */}
      <section
        ref={aboutRef}
        className="relative z-10 max-w-5xl mx-auto px-6 py-16"
      >
        <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50 transition-all duration-300 hover:border-cyan-400/20 group">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                About Me
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed max-w-3xl">
                {profile.tagline2}
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
                <span>📍 {profile.location}</span>
                <span className="text-gray-500">|</span>
                <span>🎓 {profile.education}</span>
                <span className="text-gray-500">|</span>
                <span>📧 {profile.email}</span>
              </div>
            </div>
            <Link
              to="/about"
              className="shrink-0 ml-6 text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1 border border-cyan-400/20 px-4 py-2 rounded-full hover:border-cyan-400/40"
            >
              More about me
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COMPACT EDUCATION ===== */}
      <section
        ref={educationRef}
        className="relative z-10 max-w-5xl mx-auto px-6 py-4"
      >
        <div className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl p-4 shadow-2xl shadow-black/30">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-4 h-4 text-cyan-400"
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
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Education
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {educationHistory.map((edu, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
              >
                <span className="text-white font-medium">
                  {edu.level.split("(")[0].trim()}
                </span>
                <span className="text-gray-400 text-xs">·</span>
                <span className="text-cyan-400 text-xs">
                  {edu.institution.split(",")[0]}
                </span>
                {edu.cgpa && (
                  <span className="text-gray-300 text-xs">📊 {edu.cgpa}</span>
                )}
                {edu.percentage && (
                  <span className="text-gray-300 text-xs">
                    📈 {edu.percentage}
                  </span>
                )}
                {edu.image && (
                  <a
                    href={edu.image}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-5 h-5 rounded overflow-hidden border border-white/10 hover:border-cyan-400/40 transition-all"
                  >
                    <img
                      src={edu.image}
                      alt={edu.level}
                      className="w-full h-full object-cover"
                    />
                  </a>
                )}
                <span
                  className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${
                    edu.status === "Completed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {edu.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section
        ref={skillsRef}
        className="relative z-10 max-w-5xl mx-auto px-6 py-8"
      >
        <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
            Skills
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="group">
                <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>{category}</span>
                  <span className="h-px flex-1 bg-white/5" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-200 font-mono hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-cyan-400/10 transition-all duration-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BELT 2: Certificates ===== */}
      {certificates && certificates.length > 0 && (
        <div
          ref={certsRef}
          className="relative z-10 overflow-hidden py-4 bg-black/30 backdrop-blur-sm border-y border-white/5"
        >
          <div className="flex gap-6 whitespace-nowrap animate-scroll-right">
            {[...certificates, ...certificates].map((cert, idx) => (
              <a
                key={idx}
                href={cert.image}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105"
              >
                <img
                  src={cert.image}
                  alt={cert.label}
                  className="w-8 h-8 rounded object-cover border border-white/10"
                />
                <span className="text-xs text-gray-300 group-hover:text-cyan-400 transition-colors">
                  {cert.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ===== EXPERIENCE ===== */}
      <section
        ref={expRef}
        className="relative z-10 max-w-5xl mx-auto px-6 py-8"
      >
        <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50 group transition-all duration-300 hover:border-cyan-400/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                Experience
              </h2>
              <div>
                <div className="flex flex-wrap items-baseline justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {experience.role} · {experience.company}
                  </h3>
                  <span className="text-sm text-gray-400 font-mono">
                    {experience.period}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 my-3">
                  {experience.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-300 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <ul className="space-y-1.5">
                  {experience.points.map((point, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-300 flex gap-2 items-start"
                    >
                      <span className="text-cyan-400 shrink-0 mt-0.5">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              to="/experience"
              className="shrink-0 ml-6 text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1 border border-cyan-400/20 px-4 py-2 rounded-full hover:border-cyan-400/40"
            >
              Full timeline
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section
        ref={achievementsRef}
        className="relative z-10 max-w-5xl mx-auto px-6 py-8"
      >
        <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
            Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((a, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg border border-white/5 hover:border-cyan-400/20 transition-all duration-200 group"
              >
                <span className="text-2xl shrink-0">🏆</span>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section
        ref={projectsRef}
        className="relative z-10 max-w-5xl mx-auto px-6 py-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <Link
            to="/projects"
            className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1 border border-white/10 px-4 py-1.5 rounded-full hover:border-cyan-400/40"
          >
            View all
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        {featured.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No featured projects yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* ===== BELT 3: Skills (bottom) ===== */}
      <div
        ref={belt2Ref}
        className="relative z-10 overflow-hidden py-3 bg-black/40 backdrop-blur-sm border-y border-white/5"
      >
        <div className="flex gap-8 whitespace-nowrap animate-scroll-left-reverse">
          {[...allSkills, ...allSkills, ...allSkills].map((skill, idx) => (
            <span
              key={idx}
              className="inline-block text-sm font-mono text-gray-300 hover:text-violet-400 transition-colors duration-200 px-2"
            >
              {skill} •
            </span>
          ))}
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section
        ref={finalCtaRef}
        className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center"
      >
        <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-12 shadow-2xl shadow-black/50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white">
              Let's <span className="text-cyan-400">Build</span> Something Great
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-4">
              I'm open to full‑stack, Web3, and AI‑powered projects — or just a
              conversation.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-6 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CSS Animations ===== */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes scroll-left-reverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        .animate-scroll-left-reverse {
          animation: scroll-left-reverse 25s linear infinite;
        }
        .char {
          display: inline-block;
          opacity: 0;
          transform: translateY(40px) rotateX(90deg);
        }
      `}</style>
    </div>
  );
}
