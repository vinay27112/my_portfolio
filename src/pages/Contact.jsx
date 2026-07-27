import { useRef } from "react";
import { profile, certificates } from "../data";
import useScrollReveal from "../lib/useScrollReveal.js";

const rows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/vinay-agarwal", href: profile.linkedin },
  { label: "GitHub", value: "github.com/vinay27112", href: profile.github },
  { label: "LeetCode", value: "leetcode.com/vinay27112", href: profile.leetcode },
];

export default function Contact() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef, []);

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-6 py-20">
      <h1 data-reveal className="text-3xl font-semibold text-ink mb-10">
        Get in touch
      </h1>

      <div className="grid sm:grid-cols-2 gap-6">
        <div data-reveal className="border border-line rounded-2xl bg-panel p-6">
          <div className="text-sm font-semibold text-ink-soft mb-4">Contact</div>
          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-ink-dim">{r.label}</span>
                <a
                  href={r.href}
                  target={r.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-sm text-ink hover:text-ink-soft transition truncate"
                >
                  {r.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="border border-line rounded-2xl bg-panel p-6">
          <div className="text-sm font-semibold text-ink-soft mb-4">Documents</div>
          <a
            href="/resume.pdf"
            download
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-accent-soft mb-3 hover:bg-line transition"
          >
            <span className="text-sm text-ink font-medium">Resume (master)</span>
            <span className="text-sm text-ink-dim">Download ↓</span>
          </a>
          {certificates.map((c) => (
            <a
              key={c.file}
              href={c.file}
              download
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-line mb-2 last:mb-0 hover:bg-accent-soft transition"
            >
              <span className="text-sm text-ink">{c.label}</span>
              <span className="text-sm text-ink-dim">Download ↓</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
