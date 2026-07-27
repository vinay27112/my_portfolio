import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic — smooth, no slow start
      smoothWheel: true,
    });

    // Keep ScrollTrigger's notion of scroll position in sync with Lenis's
    // virtual (transform-based) scroll — without this, scroll-triggered
    // reveals can fire at the wrong point and feel glitchy.
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP's ticker reports time in SECONDS; Lenis expects MILLISECONDS.
    // Feeding it raw seconds made Lenis think almost no time had passed
    // each frame, which is what caused the slow/stuttery scroll.
    function raf(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
