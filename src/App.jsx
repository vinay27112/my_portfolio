import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import useLenis from "./lib/useLenis.js";
import useScrollColor from "./hooks/useScrollColor.js";
import PageTransition from "./components/PageTransition.jsx";
import ParticlesBackground from "./components/ParticlesBackground.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import BackToTop from "./components/BackToTop.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Experience from "./pages/Experience.jsx";

// Inside the Routes:

export default function App() {
  useLenis();
  useScrollColor();
  const location = useLocation();

  return (
    <div className="min-h-screen relative">
      {/* Animated background layer */}
      <div className="fixed inset-0 -z-20 animated-bg" />
      {/* Semi‑transparent overlay for readability */}
      <div className="fixed inset-0 -z-10 bg-white/70 dark:bg-black/60 backdrop-blur-sm" />

      <ParticlesBackground />
      <CustomCursor />
      <Nav />
      <ScrollProgress />
      <main className="flex-1 w-full relative z-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/projects/:id"
              element={
                <PageTransition>
                  <ProjectDetail />
                </PageTransition>
              }
            />
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              }
            />
            <Route
              path="/experience"
              element={
                <PageTransition>
                  <Experience />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
