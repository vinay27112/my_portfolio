import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal(containerRef, deps = []) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ctx = gsap.context(() => {
      // Groups (stagger)
      const groups = root.querySelectorAll("[data-reveal-group]");
      groups.forEach((group) => {
        const items = group.querySelectorAll("[data-reveal]");
        if (!items.length) return;
        if (reduce) {
          gsap.set(items, { opacity: 1, y: 0, scale: 1 });
          return;
        }
        gsap.set(items, { opacity: 0, y: 40, scale: 0.94 });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            }),
          once: true,
        });
      });

      // Singles
      const singles = root.querySelectorAll(
        "[data-reveal]:not([data-reveal-group] [data-reveal])",
      );
      singles.forEach((el) => {
        if (reduce) {
          gsap.set(el, { opacity: 1, y: 0, scale: 1 });
          return;
        }
        gsap.set(el, { opacity: 0, y: 30, scale: 0.96 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
