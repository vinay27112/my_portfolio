import { useEffect, useRef } from "react";

export default function BackgroundGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Perspective grid
      const gridSize = 50;
      const offset = scrollY * 0.02; // moves with scroll
      const mouseOffsetX = (mouseX / w - 0.5) * 0.5;
      const mouseOffsetY = (mouseY / h - 0.5) * 0.5;

      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)"; // violet accent
      ctx.lineWidth = 1;

      // Draw horizontal lines
      for (let y = 0; y < h + gridSize; y += gridSize) {
        const yPos = y + offset + mouseOffsetY * 50;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(w, yPos + mouseOffsetX * 30);
        ctx.stroke();
      }

      // Draw vertical lines
      for (let x = 0; x < w + gridSize; x += gridSize) {
        const xPos = x + offset * 0.5 + mouseOffsetX * 30;
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos + mouseOffsetY * 20, h);
        ctx.stroke();
      }

      // Floating dots that move with mouse and scroll
      const dotCount = 40;
      for (let i = 0; i < dotCount; i++) {
        const seed = i * 1000;
        const x = (Math.sin(seed + offset * 0.01) * 0.5 + 0.5) * w;
        const y = (Math.cos(seed + offset * 0.015) * 0.5 + 0.5) * h;
        const dx = (mouseX - x) * 0.02;
        const dy = (mouseY - y) * 0.02;
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.2 + 0.2 * Math.sin(seed + offset * 0.02)})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
