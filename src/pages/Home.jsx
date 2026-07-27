import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { profile, projects } from "../data";
import ProjectCard from "../components/ProjectCard.jsx";
import MoonHero from "../components/MoonHero.jsx";
import useScrollReveal from "../lib/useScrollReveal.js";

export default function Home() {
  const heroRef = useRef(null);
  const pageRef = useRef(null);
  useScrollReveal(pageRef, []);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const root = heroRef.current;
    if (!root) return;

    const eyebrow = root.querySelector("[data-hero-eyebrow]");
    const heading = root.querySelector("[data-hero-heading]");
    const tagline = root.querySelector("[data-hero-tagline]");
    const cta = root.querySelector("[data-hero-cta]");
    const art = root.querySelector("[data-hero-art]");

    if (reduce) {
      gsap.set([eyebrow, heading, tagline, cta, art], { opacity: 1, y: 0 });
      return;
    }

    gsap.set([eyebrow, heading, tagline, cta], { opacity: 0, y: 18 });
    gsap.set(art, { opacity: 0, scale: 0.96 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to(art, { opacity: 1, scale: 1, duration: 0.9 }, 0)
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0.15)
      .to(heading, { opacity: 1, y: 0, duration: 0.6 }, 0.28)
      .to(tagline, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
      .to(cta, { opacity: 1, y: 0, duration: 0.5 }, 0.52);
  }, []);

  const featured = projects.filter((p) => p.status === "live").slice(0, 2);

  return (
    <div ref={pageRef}>
      <section ref={heroRef} className="relative overflow-hidden">
        <div data-hero-art className="absolute inset-0 -z-10">
          <MoonHero className="w-full h-[420px] sm:h-[500px] object-cover" />
        </div>
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <p data-hero-eyebrow className="text-sm font-medium text-ink-soft mb-4">
            {profile.location} · Available for full stack & Web3 roles
          </p>
          <h1
            data-hero-heading
            className="text-4xl sm:text-5xl font-semibold text-ink tracking-tight mb-5 max-w-xl"
          >
            {profile.name}
          </h1>
          <p data-hero-tagline className="text-lg text-ink-soft max-w-lg mb-8">
            {profile.tagline}
          </p>
          <div data-hero-cta className="flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="px-5 py-2.5 rounded-full bg-ink text-bg text-sm font-medium hover:bg-ink-soft transition"
            >
              View projects
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full border border-line text-ink-soft text-sm font-medium hover:text-ink hover:border-ink-dim transition"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-8">
        <div
          data-reveal-group
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20"
        >
          {[
            ["3", "projects live"],
            ["4", "projects shipped"],
            ["8", "microservices in one architecture"],
            ["50+", "LeetCode problems solved"],
          ].map(([n, label]) => (
            <div
              key={label}
              data-reveal
              className="border border-line rounded-2xl p-5 bg-panel"
            >
              <div className="text-2xl font-semibold text-ink mb-1">{n}</div>
              <div className="text-sm text-ink-dim">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-ink">Featured work</h2>
          <Link to="/projects" className="text-sm text-ink-soft hover:text-ink transition">
            All projects →
          </Link>
        </div>
        <div data-reveal-group className="grid sm:grid-cols-2 gap-5 mb-8">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
