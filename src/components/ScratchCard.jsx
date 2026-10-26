import { useEffect, useRef, useState } from "react";

function ScratchCard({ children, width = 300, height = 170, onReveal }) {
  const canvasRef = useRef(null);
  const scratching = useRef(false);
  const touched = useRef(false);
  const done = useRef(false);
  const moves = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const draw = () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.globalCompositeOperation = "source-over";

      const silver = ctx.createLinearGradient(0, 0, width, height);
      silver.addColorStop(0, "#b9b9c2");
      silver.addColorStop(0.35, "#f4f4f7");
      silver.addColorStop(0.65, "#c9c9d2");
      silver.addColorStop(1, "#ececf0");
      ctx.fillStyle = silver;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 90; i++) {
        const x = (i * 97) % width;
        const y = (i * 53) % height;
        ctx.fillStyle =
          i % 3 === 0 ? "rgba(255,255,255,0.9)" : "rgba(160,160,175,0.5)";
        ctx.fillRect(x, y, 2, 2);
      }

      const cx = width / 2;
      const cy = height / 2 - 20;
      ctx.fillStyle = "rgba(214, 120, 140, 0.85)";
      ctx.beginPath();
      ctx.moveTo(cx, cy + 14);
      ctx.bezierCurveTo(cx - 30, cy - 8, cx - 14, cy - 30, cx, cy - 12);
      ctx.bezierCurveTo(cx + 14, cy - 30, cx + 30, cy - 8, cx, cy + 14);
      ctx.fill();

      ctx.fillStyle = "#6b6b78";
      ctx.font = "30px 'Great Vibes', cursive";
      ctx.textAlign = "center";
      ctx.fillText("Scratch here", cx, cy + 46);

      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      for (let x = 24; x < width - 24; x += 6) {
        ctx.fillRect(x, height - 32, (x % 4) + 1, 18);
      }
    };

    draw();

    document.fonts?.load("30px 'Great Vibes'").then(() => {
      if (!touched.current) draw();
    });
  }, [width, height]);

  const scratchAt = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvas.height) / rect.height;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkProgress = () => {
    if (done.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let cleared = 0;
    let total = 0;
    for (let i = 3; i < pixels.length; i += 16) {
      total++;
      if (pixels[i] === 0) cleared++;
    }

    const percent = cleared / total;
    console.log("Scratched:", Math.round(percent * 100) + "%");

    if (percent > 0.35) {
      done.current = true;
      setRevealed(true);
      onReveal?.();
    }
  };

  const handleDown = (e) => {
    scratching.current = true;
    touched.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    scratchAt(e);
  };

  const handleMove = (e) => {
    if (!scratching.current) return;
    scratchAt(e);

    moves.current += 1;
    if (moves.current % 6 === 0) checkProgress();
  };

  const handleUp = () => {
    scratching.current = false;
    checkProgress();
  };

  return (
    <div className="scratch" style={{ aspectRatio: `${width} / ${height}` }}>
      <div className="scratch-under">{children}</div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={revealed ? "scratch-canvas gone" : "scratch-canvas"}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
      />
    </div>
  );
}

export default ScratchCard;