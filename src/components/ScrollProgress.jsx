import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-[#ff6b6b] via-[#feca57] to-[#a29bfe] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
