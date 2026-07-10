'use client';
import { useEffect, useRef } from 'react';

const STAR_COUNT = 200;
const SEED = 42;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const rand = seededRandom(SEED);
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: rand() * 100, // percent
      y: rand() * 200, // percent (double height for loop)
      radius: rand() * 1.5 + 0.3,
      opacity: rand() * 0.7 + 0.2,
    }));

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        const x = (star.x / 100) * canvas.width;
        const rawY = (star.y / 200) * canvas.height * 2 - offset;
        const y = ((rawY % canvas.height) + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 255, ${star.opacity})`;
        ctx.fill();
      }
      offset = (offset + 0.15) % canvas.height;
      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
