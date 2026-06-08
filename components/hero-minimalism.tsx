"use client";

import React, { useEffect, useRef } from "react";

/**
 * MobileMinimalBackground
 * Pure background layer — canvas particles + subtle grid lines.
 * Designed to sit as `absolute inset-0` inside a `relative` parent.
 * No header, no hero text, no footer.
 */
export default function MobileMinimalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    type Particle = {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      fadeDelay: number;
      fadeStart: number;
      fadingOut: boolean;
    };

    let particles: Particle[] = [];
    let raf = 0;

    // Fewer particles on mobile for perf — 1 per 12 000 px² instead of 7 000
    const count = () => Math.floor((canvas.width * canvas.height) / 12000);

    const make = (): Particle => {
      const fadeDelay = Math.random() * 600 + 100;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() / 6 + 0.08,   // slightly slower for mobile
        opacity: 0.6,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      };
    };

    const reset = (p: Particle) => {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
      p.speed = Math.random() / 6 + 0.08;
      p.opacity = 0.6;
      p.fadeDelay = Math.random() * 600 + 100;
      p.fadeStart = Date.now() + p.fadeDelay;
      p.fadingOut = false;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count(); i++) particles.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) reset(p);
        if (!p.fadingOut && now > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.006;
          if (p.opacity <= 0) reset(p);
        }
        ctx.fillStyle = `rgba(250, 250, 250, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 0.6, Math.random() * 2 + 1);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    window.addEventListener("resize", onResize);
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <style>{`
        .mbg-accent-lines { position: absolute; inset: 0; pointer-events: none; }

        .mbg-hline, .mbg-vline {
          position: absolute;
          background: #27272a;
          opacity: .6;
          will-change: transform, opacity;
        }

        .mbg-hline {
          height: 1px; left: 0; right: 0;
          transform: scaleX(0);
          transform-origin: 50% 50%;
          animation: mbgDrawX 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .mbg-hline:nth-child(1){ top: 25%;  animation-delay: 200ms; }
        .mbg-hline:nth-child(2){ top: 55%;  animation-delay: 360ms; }
        .mbg-hline:nth-child(3){ top: 82%;  animation-delay: 520ms; }

        .mbg-vline {
          width: 1px; top: 0; bottom: 0;
          transform: scaleY(0);
          transform-origin: 50% 0%;
          animation: mbgDrawY 1000ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .mbg-vline:nth-child(4){ left: 20%; animation-delay: 600ms; }
        .mbg-vline:nth-child(5){ left: 50%; animation-delay: 720ms; }
        .mbg-vline:nth-child(6){ left: 80%; animation-delay: 840ms; }

        @keyframes mbgDrawX {
          0%   { transform: scaleX(0); opacity: 0; }
          60%  { opacity: .7; }
          100% { transform: scaleX(1); opacity: .6; }
        }
        @keyframes mbgDrawY {
          0%   { transform: scaleY(0); opacity: 0; }
          60%  { opacity: .7; }
          100% { transform: scaleY(1); opacity: .6; }
        }

        .mbg-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: .55;
        }
      `}</style>

      {/* Accent grid lines */}
      <div className="mbg-accent-lines">
        <div className="mbg-hline" />
        <div className="mbg-hline" />
        <div className="mbg-hline" />
        <div className="mbg-vline" />
        <div className="mbg-vline" />
        <div className="mbg-vline" />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="mbg-canvas" />
    </div>
  );
}
