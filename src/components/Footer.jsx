import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">
            Vinay Agarwal
          </span>
          <span className="text-xs text-gray-500 hidden sm:inline">·</span>
          <span className="text-xs text-gray-400 hidden sm:inline">
            Full Stack & Web3 Developer
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
          >
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
          >
            LeetCode
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Vinay Agarwal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
