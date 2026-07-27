import { useRef } from "react";
import { profile, certificates } from "../data";
import useScrollReveal from "../lib/useScrollReveal.js";
import TechBackground from "../components/TechBackground.jsx";

export default function Contact() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef, []);

  const contactItems = [
    {
      label: "Phone",
      value: "+91 89559 22157",
      href: "tel:+918955922157",
      icon: (
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
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: (
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/vinay-agarwal",
      href: profile.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/vinay27112",
      href: profile.github,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LeetCode",
      value: "leetcode.com/vinay27112",
      href: profile.leetcode,
      icon: (
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
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden">
      <TechBackground />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        {/* ---- Personal Intro ---- */}
        <div data-reveal className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-cyan-400 tracking-widest uppercase border border-cyan-400/20 px-4 py-1 rounded-full mb-4">
            Let's Connect
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            I'm{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Vinay Agarwal
            </span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed"></p>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-2">
            Based in Jaipur, India · 3rd year B.Tech CSE · Available for
            opportunities
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {contactItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-reveal
              className="group bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-5 shadow-2xl shadow-black/30 hover:border-cyan-400/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] flex items-center gap-4"
            >
              <div className="p-2.5 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors duration-300">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-sm text-gray-200 font-medium truncate group-hover:text-cyan-400 transition-colors duration-300">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Documents Section */}
        <div data-reveal className="grid md:grid-cols-2 gap-6">
          {/* Certificates */}
          {/* Certificates – image thumbnails */}
          {/* Certificates – large, clear images */}
          <div
            data-reveal
            className="bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-2xl shadow-black/30"
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
              Certificates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map((c) => (
                <a
                  key={c.image}
                  href={c.image}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-400/40 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]"
                >
                  <div className="aspect-video w-full bg-black/30">
                    <img
                      src={c.image}
                      alt={c.label}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 bg-black/60 backdrop-blur-sm">
                    <p className="text-sm text-gray-200 font-medium truncate">
                      {c.label}
                    </p>
                    <p className="text-xs text-gray-400">
                      Click to view full size
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Resume */}
          <div className="bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-2xl shadow-black/30 flex flex-col items-center justify-center text-center">
            <div className="mb-3 p-3 rounded-full bg-violet-500/10 text-violet-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Resume (Master)
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Download the latest version
            </p>
            <a
              href="/resume.pdf"
              download
              className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:shadow-[0_0_40px_rgba(56,189,248,0.2)] transition-all duration-300 hover:scale-105"
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
              Download
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p
          data-reveal
          className="text-center text-gray-500 text-xs mt-12 border-t border-white/5 pt-6"
        >
          Vinay Agarwal · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
