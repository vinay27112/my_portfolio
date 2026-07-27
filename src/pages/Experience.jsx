import { useRef } from "react";
import { experience, profile, internshipCertificate } from "../data";
import useScrollReveal from "../lib/useScrollReveal.js";
import TechBackground from "../components/TechBackground.jsx";

export default function Experience() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef, []);

  const experiences = [experience]; // extendable

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden">
      <TechBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div data-reveal className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-cyan-400 tracking-widest uppercase border border-cyan-400/20 px-4 py-1 rounded-full mb-4">
            Career
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          {/* <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-3">
            A timeline of my professional journey.
          </p> */}
        </div>

        {/* Timeline – single column with left vertical line */}
        <div className="relative pl-6 sm:pl-8 md:pl-12">
          {/* Vertical line */}
          <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/40 via-violet-400/40 to-transparent" />

          {experiences.map((exp, idx) => (
            <div key={idx} data-reveal className="relative mb-12 last:mb-0">
              {/* Dot */}
              <div className="absolute left-[-7px] sm:left-[-9px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.5)] border-2 border-black" />

              {/* Card */}
              <div className="ml-6 sm:ml-8 bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-2xl shadow-black/30 hover:border-cyan-400/30 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-cyan-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 font-mono whitespace-nowrap bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {exp.period}
                  </span>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-300 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Bullet points */}
                <ul className="space-y-1.5">
                  {exp.points.map((point, i) => (
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
          ))}
        </div>

        {/* Certificate Section – embedded PDF */}
        {internshipCertificate && (
          <div
            data-reveal
            className="mt-16 bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-2xl shadow-black/30"
          >
            <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              {internshipCertificate.label}
            </h2>
            <div className="w-full rounded-lg overflow-hidden border border-white/10">
              <img
                src={internshipCertificate.image}
                alt={internshipCertificate.label}
                className="w-full h-auto object-contain"
                loading="lazy"
                style={{ maxHeight: "700px" }}
              />
            </div>
          </div>
        )}

        {/* Education – separate card */}
        <div
          data-reveal
          className="mt-16 bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-2xl shadow-black/30"
        >
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Education
          </h2>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-white font-medium">{profile.education}</span>
            <span className="text-gray-400 text-sm">· {profile.location}</span>
          </div>
          <p className="text-gray-300 text-sm mt-1">CGPA: 8.2/10</p>
        </div>
      </div>
    </div>
  );
}
