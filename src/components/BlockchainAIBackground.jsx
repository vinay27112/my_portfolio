import { useEffect, useRef } from "react";

export default function BlockchainAIBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    if (!canvas || !ctx) return;
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

    // ---- Blockchain: chain of blocks ----
    const blockWidth = 80;
    const blockHeight = 40;
    const blockGap = 60;
    const chainLength = 12;

    // ---- AI: neural network layers ----
    const layers = [6, 8, 6, 4]; // nodes per layer
    const layerSpacing = 120;
    const nodeRadius = 6;

    // ---- Particles (data flow) ----
    const particles = [];
    const numParticles = 50;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.5,
      });
    }

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Draw blockchain chain (horizontal, scrolling slowly)
      const startX =
        (w - (chainLength * (blockWidth + blockGap) - blockGap)) / 2;
      const chainY = h * 0.2 + Math.sin(time * 0.0003) * 20;

      // Draw connecting lines between blocks
      ctx.strokeStyle = "rgba(0, 240, 255, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 0; i < chainLength - 1; i++) {
        const x1 = startX + i * (blockWidth + blockGap) + blockWidth;
        const y1 = chainY + blockHeight / 2;
        const x2 = startX + (i + 1) * (blockWidth + blockGap);
        const y2 = chainY + blockHeight / 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        // Draw a wavy line (data flow)
        for (let t = 0; t <= 1; t += 0.02) {
          const x = x1 + (x2 - x1) * t;
          const y =
            y1 + 10 * Math.sin(t * Math.PI * 4 + time * 0.002 + i * 0.5);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw blocks
      for (let i = 0; i < chainLength; i++) {
        const x = startX + i * (blockWidth + blockGap);
        const y = chainY;
        // Block background with gradient
        const grad = ctx.createLinearGradient(
          x,
          y,
          x + blockWidth,
          y + blockHeight,
        );
        grad.addColorStop(
          0,
          `rgba(139, 92, 246, ${0.2 + 0.1 * Math.sin(time * 0.001 + i)})`,
        );
        grad.addColorStop(
          1,
          `rgba(0, 240, 255, ${0.1 + 0.1 * Math.cos(time * 0.001 + i)})`,
        );
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(139, 92, 246, 0.2)";
        ctx.shadowBlur = 10;
        ctx.fillRect(x, y, blockWidth, blockHeight);
        ctx.shadowBlur = 0;

        // Block border
        ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, blockWidth, blockHeight);

        // Block hash text (simulated)
        ctx.fillStyle = "rgba(0, 240, 255, 0.2)";
        ctx.font = "8px monospace";
        ctx.fillText(
          `0x${(i * 7).toString(16).padStart(4, "0")}...`,
          x + 6,
          y + 16,
        );
        ctx.fillText(`#${(i * 13).toString(16)}`, x + 6, y + 30);

        // Small pulsing dot on each block (node)
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.003 + i * 1.2);
        ctx.beginPath();
        ctx.arc(
          x + blockWidth / 2,
          y + blockHeight / 2,
          2 + pulse * 3,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(0, 240, 255, ${0.3 + pulse * 0.5})`;
        ctx.fill();
      }

      // 2. AI Neural Network (overlay on the right side)
      const nnX = w * 0.65;
      const nnY = h * 0.25 + Math.sin(time * 0.0002) * 30;
      const layerSpacingY = (h * 0.5) / (layers.length - 1);

      // Draw connections between layers
      for (let l = 0; l < layers.length - 1; l++) {
        const nodeCount1 = layers[l];
        const nodeCount2 = layers[l + 1];
        for (let i = 0; i < nodeCount1; i++) {
          for (let j = 0; j < nodeCount2; j++) {
            const x1 = nnX + l * layerSpacing;
            const y1 = nnY + i * (layerSpacingY / (nodeCount1 - 1 || 1));
            const x2 = nnX + (l + 1) * layerSpacing;
            const y2 = nnY + j * (layerSpacingY / (nodeCount2 - 1 || 1));
            const alpha = 0.08 + 0.08 * Math.sin(time * 0.001 + i + j);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw neural nodes
      for (let l = 0; l < layers.length; l++) {
        const nodeCount = layers[l];
        for (let i = 0; i < nodeCount; i++) {
          const x = nnX + l * layerSpacing;
          const y = nnY + i * (layerSpacingY / (nodeCount - 1 || 1));
          const radius =
            nodeRadius * (1 + 0.3 * Math.sin(time * 0.002 + l + i));
          const glow =
            0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * 0.003 + i * 0.5));
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${0.2 + glow * 0.3})`;
          ctx.shadowColor = `rgba(0, 240, 255, ${glow * 0.5})`;
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 3. Data particles (floating through both networks)
      particles.forEach((p) => {
        // Move with mouse influence
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.02;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Damping
        p.vx *= 0.999;
        p.vy *= 0.999;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${
          p.alpha * (0.5 + 0.5 * Math.sin(time * 0.001 + p.x))
        })`;
        ctx.fill();

        // Glow
        ctx.shadowColor = "rgba(0, 240, 255, 0.1)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Matrix‑like rain (subtle, in background)
      ctx.fillStyle = "rgba(0, 240, 255, 0.02)";
      ctx.font = "12px monospace";
      const columns = Math.floor(w / 20);
      for (let i = 0; i < columns; i++) {
        const x = i * 20 + 10;
        const y = (i * 17 + time * 0.02) % h;
        ctx.fillText(String.fromCharCode(0x30a0 + Math.random() * 96), x, y);
      }

      time += 1;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

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
