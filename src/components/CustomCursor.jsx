import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest("a, button, [role='button']");
      if (target) setIsHovering(true);
    });
    document.addEventListener("mouseout", (e) => {
      const target = e.target.closest("a, button, [role='button']");
      if (target) setIsHovering(false);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-8 h-8 rounded-full border-2"
        style={{
          borderImage:
            "linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #a29bfe) 1",
          boxShadow: "0 0 20px rgba(162,155,254,0.3)",
        }}
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-accent"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
}
