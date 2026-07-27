import { useRef } from "react";
import { profile, experience, skills, achievements } from "../data";
import useScrollReveal from "../lib/useScrollReveal.js";

export default function About() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef, []);

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-6 py-20">
      <div data-reveal className="mb-16 max-w-xl">
        <h1 className="text-3xl font-semibold text-ink mb-3">About</h1>
        <p className="text-ink-dim leading-relaxed">
          {profile.education}, based in {profile.location}. I care about
          shipping things that actually run — every project I build is
          either live or has real transactions on Sepolia behind it.
        </p>
      </div>

      <section className="mb-16">
        <h2 data-reveal className="text-sm font-semibold text-ink-dim uppercase tracking-wide mb-5 pb-2 border-b border-line">
          Experience
        </h2>
        <div data-reveal className="flex items-baseline justify-between mb-1">
          <h3 className="font-semibold text-ink">
            {experience.role} · {experience.company}
          </h3>
          <span className="text-sm text-ink-dim">{experience.period}</span>
        </div>
        <div data-reveal className="flex flex-wrap gap-1.5 mb-4 mt-3">
          {experience.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-full border border-line text-ink-dim"
            >
              {s}
            </span>
          ))}
        </div>
        <ul data-reveal-group className="space-y-1.5">
          {experience.points.map((p, i) => (
            <li key={i} data-reveal className="text-sm text-ink-soft flex gap-2">
              <span className="text-ink-dim shrink-0">–</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 data-reveal className="text-sm font-semibold text-ink-dim uppercase tracking-wide mb-5 pb-2 border-b border-line">
          Skills
        </h2>
        <div data-reveal-group className="grid sm:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} data-reveal>
              <div className="text-xs font-semibold text-ink-soft mb-2">{category}</div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2 py-0.5 rounded-full border border-line text-ink-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 data-reveal className="text-sm font-semibold text-ink-dim uppercase tracking-wide mb-5 pb-2 border-b border-line">
          Achievements & certifications
        </h2>
        <ul data-reveal-group className="space-y-1.5">
          {achievements.map((a, i) => (
            <li key={i} data-reveal className="text-sm text-ink-soft flex gap-2">
              <span className="text-ink-dim shrink-0">–</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
