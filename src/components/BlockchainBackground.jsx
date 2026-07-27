import { useEffect, useRef } from "react";

export default function BlockchainBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Hexagon grid parameters
    const hexRadius = 30;
    const hexSpacing = 60;

    const drawHexagon = (x, y, radius, color, lineWidth = 1.5) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const dx = x + radius * Math.cos(angle);
        const dy = y + radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(dx, dy) : ctx.lineTo(dx, dy);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const drawNodes = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Calculate grid offset with time for a subtle float
      const offsetX = Math.sin(time * 0.0002) * 20;
      const offsetY = Math.cos(time * 0.0003) * 20;

      // Hexagon grid
      for (let y = -hexRadius; y < h + hexRadius; y += hexSpacing) {
        for (let x = -hexRadius; x < w + hexRadius; x += hexSpacing * 1.5) {
          const rowOffset =
            Math.floor(y / hexSpacing) % 2 === 0 ? 0 : hexSpacing * 0.75;
          const cx = x + rowOffset + offsetX;
          const cy = y + offsetY;

          // Distance to mouse
          const dx = mouseX - cx;
          const dy = mouseY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;
          const glow = Math.max(0, 1 - dist / maxDist);

          // Color with glow
          const intensity = 0.3 + glow * 0.7;
          const color = `rgba(139, 92, 246, ${0.3 + intensity * 0.3})`;
          const lineWidth = 1 + glow * 2;
          drawHexagon(cx, cy, hexRadius * (0.8 + glow * 0.2), color, lineWidth);
        }
      }

      // Connection lines between nearby nodes (simulating network)
      const nodePositions = [];
      for (let y = -hexRadius; y < h + hexRadius; y += hexSpacing) {
        for (let x = -hexRadius; x < w + hexRadius; x += hexSpacing * 1.5) {
          const rowOffset =
            Math.floor(y / hexSpacing) % 2 === 0 ? 0 : hexSpacing * 0.75;
          const cx = x + rowOffset + offsetX;
          const cy = y + offsetY;
          nodePositions.push({ x: cx, y: cy });
        }
      }

      // Draw lines between nodes within distance
      ctx.strokeStyle = "rgba(139, 92, 246, 0.08)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          const dx = nodePositions[i].x - nodePositions[j].x;
          const dy = nodePositions[i].y - nodePositions[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < hexSpacing * 1.2) {
            ctx.beginPath();
            ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
            ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
            ctx.stroke();
          }
        }
      }

      // Pulsing nodes (dots)
      for (let i = 0; i < nodePositions.length; i++) {
        const p = nodePositions[i];
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.002 + i * 0.1);
        const radius = 1.5 + pulse * 2;
        const alpha = 0.3 + pulse * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.6})`;
        ctx.fill();
      }

      time += 1;
    };

    const animate = () => {
      drawNodes();
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
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
