import { useEffect, useRef } from "react";

export default function HelixSpine({ containerRef }) {
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let time = 0;
    let isMounted = true;
    let frameCount = 0;

    const config = {
      radius: 65,
      turns: 6,
      nodesPerTurn: 14,
      strandWidth: 2.5,
      nodeSize: 5,
      blockCount: 20, // slightly fewer to keep performance
      blockSize: 26, // large block width
      blockHeight: 18, // large block height
      depth: 8, // depth for 3D effect
    };

    const resize = () => {
      const container = containerRef?.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        canvas.width = Math.min(200, rect.width * 0.22);
        canvas.height = rect.height;
      } else {
        canvas.width = 180;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const updateProgress = () => {
      const container = containerRef?.current;
      if (!container) {
        progressRef.current =
          window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight);
        return;
      }
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalScroll = rect.height - viewportHeight;
      if (totalScroll <= 0) {
        progressRef.current = 0;
        return;
      }
      const scrolled = window.scrollY - containerTop;
      progressRef.current = Math.min(1, Math.max(0, scrolled / totalScroll));
    };

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);
    updateProgress();

    const draw = () => {
      if (!isMounted) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Throttle to 30fps
      frameCount++;
      if (frameCount % 2 === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const amplitude = Math.min(config.radius, w * 0.4);
      const rotationAngle = progressRef.current * Math.PI * 2 * 2;

      // ---- Strands ----
      const strand1 = [];
      const strand2 = [];
      const stepY = 2;
      for (let y = 0; y < h; y += stepY) {
        const progress = y / h;
        const angle = progress * config.turns * Math.PI * 2 + rotationAngle;
        const x1 = centerX + amplitude * Math.cos(angle);
        const x2 = centerX + amplitude * Math.cos(angle + Math.PI);
        strand1.push({ x: x1, y });
        strand2.push({ x: x2, y });
      }

      ctx.lineWidth = config.strandWidth;
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(0, 220, 255, 0.3)";
      ctx.strokeStyle = "rgba(0, 220, 255, 0.8)";
      ctx.beginPath();
      strand1.forEach((p, i) =>
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
      );
      ctx.stroke();

      ctx.shadowColor = "rgba(160, 120, 255, 0.3)";
      ctx.strokeStyle = "rgba(160, 120, 255, 0.8)";
      ctx.beginPath();
      strand2.forEach((p, i) =>
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
      );
      ctx.stroke();

      // ---- Nodes ----
      const totalNodes = Math.floor(config.turns * config.nodesPerTurn);
      ctx.shadowBlur = 10;
      for (let i = 0; i < totalNodes; i++) {
        const progress = i / totalNodes;
        const y = progress * h;
        const angle = progress * config.turns * Math.PI * 2 + rotationAngle;
        const x1 = centerX + amplitude * Math.cos(angle);
        const x2 = centerX + amplitude * Math.cos(angle + Math.PI);
        const size =
          config.nodeSize *
          (0.6 + 0.4 * (0.5 + 0.5 * Math.sin(time * 0.003 + i)));
        [x1, x2].forEach((x) => {
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.shadowColor = "rgba(0,220,255,0.3)";
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        });
      }

      // ---- 3D BLOCKS ----
      const blockCount = config.blockCount;
      const blockW = config.blockSize;
      const blockH = config.blockHeight;
      const depth = config.depth;
      ctx.shadowBlur = 8;
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < blockCount; i++) {
        const progress = (i / blockCount + time * 0.00025) % 1;
        const y = progress * h;
        const angle =
          progress * config.turns * Math.PI * 2 + rotationAngle + i * 0.5;
        const x = centerX + amplitude * 1.25 * Math.cos(angle + 0.2);

        // Pulse
        const pulse = 0.85 + 0.15 * Math.sin(time * 0.003 + i * 0.6);
        const wBlock = blockW * pulse;
        const hBlock = blockH * pulse;
        const dBlock = depth * pulse;

        // ---- Draw 3D cube ----
        // Front face (main face)
        const grad = ctx.createLinearGradient(
          x - wBlock / 2,
          y - hBlock / 2,
          x + wBlock / 2,
          y + hBlock / 2,
        );
        grad.addColorStop(0, `rgba(0, 220, 255, 0.6)`);
        grad.addColorStop(0.5, `rgba(160, 120, 255, 0.6)`);
        grad.addColorStop(1, `rgba(0, 220, 255, 0.6)`);
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(0, 220, 255, 0.3)";
        ctx.shadowBlur = 15;
        // Rounded front face
        const r = 4;
        ctx.beginPath();
        ctx.moveTo(x - wBlock / 2 + r, y - hBlock / 2);
        ctx.lineTo(x + wBlock / 2 - r, y - hBlock / 2);
        ctx.quadraticCurveTo(
          x + wBlock / 2,
          y - hBlock / 2,
          x + wBlock / 2,
          y - hBlock / 2 + r,
        );
        ctx.lineTo(x + wBlock / 2, y + hBlock / 2 - r);
        ctx.quadraticCurveTo(
          x + wBlock / 2,
          y + hBlock / 2,
          x + wBlock / 2 - r,
          y + hBlock / 2,
        );
        ctx.lineTo(x - wBlock / 2 + r, y + hBlock / 2);
        ctx.quadraticCurveTo(
          x - wBlock / 2,
          y + hBlock / 2,
          x - wBlock / 2,
          y + hBlock / 2 - r,
        );
        ctx.lineTo(x - wBlock / 2, y - hBlock / 2 + r);
        ctx.quadraticCurveTo(
          x - wBlock / 2,
          y - hBlock / 2,
          x - wBlock / 2 + r,
          y - hBlock / 2,
        );
        ctx.closePath();
        ctx.fill();

        // Top face (3D perspective: parallelogram)
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(x - wBlock / 2, y - hBlock / 2);
        ctx.lineTo(x - wBlock / 2 + dBlock, y - hBlock / 2 - dBlock);
        ctx.lineTo(x + wBlock / 2 + dBlock, y - hBlock / 2 - dBlock);
        ctx.lineTo(x + wBlock / 2, y - hBlock / 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(160, 120, 255, 0.5)`;
        ctx.fill();

        // Right face (side)
        ctx.beginPath();
        ctx.moveTo(x + wBlock / 2, y - hBlock / 2);
        ctx.lineTo(x + wBlock / 2 + dBlock, y - hBlock / 2 - dBlock);
        ctx.lineTo(x + wBlock / 2 + dBlock, y + hBlock / 2 - dBlock);
        ctx.lineTo(x + wBlock / 2, y + hBlock / 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(0, 220, 255, 0.4)`;
        ctx.fill();

        // Border on front face
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(0, 220, 255, 0.9)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Hash label
        ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
        ctx.shadowBlur = 0;
        const hash = `0x${(i * 13).toString(16).padStart(2, "0")}`;
        ctx.fillText(hash, x, y + 1);

        // Small glow dot on front face
        ctx.beginPath();
        ctx.arc(x - wBlock / 4, y - hBlock / 4, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 220, 255, 0.8)`;
        ctx.fill();
      }

      // ---- Edge fades ----
      const fadeGrad = ctx.createLinearGradient(0, 0, 0, 50);
      fadeGrad.addColorStop(0, "rgba(10,10,26,0.7)");
      fadeGrad.addColorStop(1, "rgba(10,10,26,0)");
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 0, w, 50);
      const fadeGrad2 = ctx.createLinearGradient(0, h - 50, 0, h);
      fadeGrad2.addColorStop(0, "rgba(10,10,26,0)");
      fadeGrad2.addColorStop(1, "rgba(10,10,26,0.7)");
      ctx.fillStyle = fadeGrad2;
      ctx.fillRect(0, h - 50, w, 50);

      ctx.shadowBlur = 0;
      time += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return (
    <div className="absolute right-0 top-0 h-full w-40 md:w-48 pointer-events-none z-5 will-change-transform">
      <canvas
        ref={canvasRef}
        className="w-full h-full will-change-transform"
        style={{ display: "block", transform: "translateZ(0)" }}
      />
    </div>
  );
}
