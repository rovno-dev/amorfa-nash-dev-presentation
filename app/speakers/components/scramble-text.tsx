"use client";

import { useEffect, useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface Props {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function ScrambleText({ text, className, as = "h1" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const oldText = el.innerText || "";
    const length = Math.max(oldText.length, text.length);
    type Item = {
      from: string;
      to: string;
      start: number;
      end: number;
      char?: string;
    };
    const queue: Item[] = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = text[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }

    let frame = 0;
    let raf = 0;

    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (frame >= item.end) {
          complete++;
          output += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += `<span class="text-[#CCFF00] opacity-40">${item.char}</span>`;
        } else {
          output += item.from;
        }
      }
      el.innerHTML = output;
      if (complete !== queue.length) {
        raf = requestAnimationFrame(update);
        frame++;
      }
    };
    update();

    return () => cancelAnimationFrame(raf);
  }, [text]);

  const Tag = as as any;
  return <Tag ref={ref} className={className} />;
}
