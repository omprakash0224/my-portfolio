"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// ── Config ──────────────────────────────────────────────────────────────────
const CELL_W = 64; // px — matches the original w-16
const CELL_H = 32; // px — matches the original h-8
const LINE_COLOR = "rgba(255,255,255,0.06)";
const HOVER_COLORS = [
  "rgb(125,211,252)", // sky-300
  "rgb(249,168,212)", // pink-300
  "rgb(134,239,172)", // green-300
  "rgb(253,224,71)",  // yellow-300
  "rgb(252,165,165)", // red-300
  "rgb(216,180,254)", // purple-300
  "rgb(147,197,253)", // blue-300
  "rgb(165,180,252)", // indigo-300
  "rgb(196,181,253)", // violet-300
];

function randomColor() {
  return HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)];
}

// ── Canvas-based grid ───────────────────────────────────────────────────────
export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef<Map<string, { color: string; opacity: number }>>(new Map());
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1 });

  // Draw the grid + highlighted cells
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cols = Math.ceil(w / CELL_W) + 1;
    const rows = Math.ceil(h / CELL_H) + 1;

    // Draw filled (hovered / fading) cells
    const hovered = hoveredRef.current;
    const toDelete: string[] = [];
    for (const [key, cell] of hovered) {
      cell.opacity -= 0.015; // fade out
      if (cell.opacity <= 0) {
        toDelete.push(key);
        continue;
      }
      const [col, row] = key.split(",").map(Number);
      ctx.globalAlpha = cell.opacity;
      ctx.fillStyle = cell.color;
      ctx.fillRect(col * CELL_W, row * CELL_H, CELL_W, CELL_H);
    }
    for (const k of toDelete) hovered.delete(k);
    ctx.globalAlpha = 1;

    // Draw grid lines
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      const x = c * CELL_W + 0.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let r = 0; r <= rows; r++) {
      const y = r * CELL_H + 0.5;
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // Resize canvas to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  // Start / stop animation loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // Mouse tracking — highlight the cell under the cursor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };

      const col = Math.floor(x / CELL_W);
      const row = Math.floor(y / CELL_H);
      const key = `${col},${row}`;
      if (!hoveredRef.current.has(key) || hoveredRef.current.get(key)!.opacity < 0.5) {
        hoveredRef.current.set(key, { color: randomColor(), opacity: 1 });
      }
    };

    const onLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      style={{
        transform:
          "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)",
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);