"use client";

import { useEffect, useState } from "react";

const W = 24;
const H = 9;

export function AsciiStation() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => f + 1), 100);
    return () => clearInterval(id);
  }, []);

  const cx = W / 2;
  const angle = frame * 0.08;
  const lx = Math.cos(angle);
  const lz = Math.sin(angle);
  const lines: string[] = [];

  let top = "";
  for (let x = 0; x < W; x++) {
    const nx = (x - cx + 0.5) / (W / 2);
    top += Math.abs(nx) <= 0.8 ? "▄" : " ";
  }
  lines.push(top);

  for (let y = 1; y < H - 1; y++) {
    let line = "";
    for (let x = 0; x < W; x++) {
      const nx = (x - cx + 0.5) / (W / 2);
      if (Math.abs(nx) <= 0.92) {
        const nz = Math.sqrt(1 - nx * nx);
        const intensity = Math.max(0, nx * lx + nz * lz);
        const val = (intensity + 0.2) / 1.2;
        line += val > 0.8 ? "█" : val > 0.5 ? "▓" : val > 0.3 ? "▒" : "░";
      } else {
        line += " ";
      }
    }
    lines.push(line);
  }

  let bot = "";
  for (let x = 0; x < W; x++) {
    const nx = (x - cx + 0.5) / (W / 2);
    bot += Math.abs(nx) <= 0.8 ? "▀" : " ";
  }
  lines.push(bot);

  return (
    <div className="relative">
      <pre className="m-0 whitespace-pre font-mono text-[11px] leading-[1.1] text-[#CCFF00] [text-shadow:0_0_12px_rgba(204,255,0,.3)] sm:text-xs md:text-sm">
        {lines.join("\n")}
      </pre>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-[#744BFF]">▲</span>
      </div>
    </div>
  );
}

export function WaveDots() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % 10000), 100);
    return () => clearInterval(id);
  }, []);

  const dots = Array.from({ length: 3 }, (_, i) => {
    const phase = (frame * 0.35 + i * 0.9) % (Math.PI * 2);
    const level = (Math.sin(phase) + 1) / 2;
    const char = level > 0.75 ? "●" : level > 0.4 ? "•" : "·";
    return { char, level };
  });

  return (
    <span
      className="inline-flex items-center gap-[3px] font-mono text-[#CCFF00]"
      aria-hidden
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="inline-block w-2 text-center"
          style={{ opacity: 0.35 + d.level * 0.65 }}
        >
          {d.char}
        </span>
      ))}
    </span>
  );
}
