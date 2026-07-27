import { useRef } from "react";
import { projects } from "../data";
import ProjectCard from "../components/ProjectCard.jsx";
import useScrollReveal from "../lib/useScrollReveal.js";

export default function Projects() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef, []);

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-6 py-20">
      <div data-reveal className="mb-12 max-w-lg">
        <h1 className="text-3xl font-semibold text-ink mb-3">Projects</h1>
        <p className="text-ink-dim">
          Four builds spanning DeFi, decentralized storage, and the auth
          infrastructure underneath most of them. Three are live — click
          through and try them.
        </p>
      </div>

      <div data-reveal-group className="grid gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} expanded />
        ))}
      </div>
    </div>
  );
}
