import { useEffect, useRef } from "react";

export default function TechBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Palette: greys, ivory, blues
    const colors = {
      greyLight: "rgba(200, 200, 210, 0.15)",
      greyMid: "rgba(160, 160, 175, 0.2)",
      greyDark: "rgba(80, 80, 95, 0.3)",
      ivory: "rgba(245, 240, 230, 0.1)",
      blueSoft: "rgba(70, 130, 200, 0.2)",
      blueGlow: "rgba(70, 130, 200, 0.1)",
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const handleMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    // Node system
    const nodes = [];
    const numNodes = 40;
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Draw subtle grid – ivory lines on dark base
      ctx.strokeStyle = colors.ivory;
      ctx.lineWidth = 0.5;
      const step = 60;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + Math.sin(time * 0.001) * 10, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + Math.cos(time * 0.001) * 10);
        ctx.stroke();
      }

      // 2. Draw nodes and connections
      // Update node positions with mouse attraction
      nodes.forEach((n) => {
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (1 - dist / 150) * 0.02;
          n.vx += dx * force;
          n.vy += dy * force;
        }
        n.vx *= 0.999;
        n.vy *= 0.999;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = w;
        if (n.x > w) n.x = 0;
        if (n.y < 0) n.y = h;
        if (n.y > h) n.y = 0;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(70, 130, 200, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      nodes.forEach((n) => {
        const pulse = 0.6 + 0.4 * Math.sin(time * 0.002 + n.phase);
        const radius = n.radius * (0.8 + 0.4 * pulse);
        // Glow
        const grad = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          radius * 4,
        );
        grad.addColorStop(0, `rgba(70, 130, 200, ${0.2 * pulse})`);
        grad.addColorStop(1, "rgba(70, 130, 200, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 160, 175, ${0.3 + 0.3 * pulse})`;
        ctx.fill();
        ctx.shadowColor = "rgba(70, 130, 200, 0.2)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Floating geometric shapes (blocks) – subtle
      const blockSize = 20;
      const numBlocks = 8;
      for (let i = 0; i < numBlocks; i++) {
        const x = (Math.sin(time * 0.0005 + i * 2) * 0.5 + 0.5) * w;
        const y = (Math.cos(time * 0.0004 + i * 1.7) * 0.5 + 0.5) * h;
        const rot = time * 0.0002 + i;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.strokeStyle = `rgba(200, 200, 210, ${0.1 + 0.05 * Math.sin(time * 0.001 + i)})`;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(-blockSize / 2, -blockSize / 2, blockSize, blockSize);
        ctx.restore();
      }

      // 4. Very subtle vignette
      const grad = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.7,
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.15)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      time += 1;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
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
