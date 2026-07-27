import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold text-white tracking-tight flex items-center gap-2"
        >
          <span className="text-cyan-400">VA</span>
          <span className="hidden sm:inline text-gray-300 font-normal text-sm">
            Vinay Agarwal
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 transition-colors duration-200 text-gray-300 hover:text-cyan-400"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-full hover:bg-white/5 transition-colors duration-200 text-gray-300 hover:text-cyan-400"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden absolute top-full left-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          >
            <nav className="flex flex-col p-4 space-y-2 text-sm">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
