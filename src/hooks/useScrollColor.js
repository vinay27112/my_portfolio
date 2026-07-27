import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollColor() {
  useEffect(() => {
    const colors = [
      "#6c5ce7",
      "#fd79a8",
      "#fdcb6e",
      "#00b894",
      "#0984e3",
      "#a29bfe",
    ];
    const sections = document.querySelectorAll("section, .page-section");
    if (!sections.length) return;

    sections.forEach((section, i) => {
      const color = colors[i % colors.length];
      gsap.to(section, {
        borderColor: color,
        boxShadow: `0 0 30px ${color}40`,
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: () => {
            document.documentElement.style.setProperty("--color-accent", color);
          },
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}
