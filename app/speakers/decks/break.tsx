"use client";
import { useEffect, useState } from "react";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS } from "../data";
import { Prompt, type DeckProps } from "./shared";

const DIGITS: Record<string, string[]> = {
  "0": ["┏━┓", "┃ ┃", "┃ ┃", "┃ ┃", "┗━┛"],
  "1": [" ╻ ", " ┃ ", " ┃ ", " ┃ ", " ╹ "],
  "2": ["┏━┓", "  ┃", "┏━┛", "┃  ", "┗━┛"],
  "3": ["┏━┓", "  ┃", " ━┫", "  ┃", "┗━┛"],
  "4": ["┃ ┃", "┃ ┃", "┗━┫", "  ┃", "  ╹"],
  "5": ["┏━┓", "┃  ", "┗━┓", "  ┃", "┗━┛"],
  "6": ["┏━┓", "┃  ", "┣━┓", "┃ ┃", "┗━┛"],
  "7": ["┏━┓", "  ┃", "  ┃", "  ┃", "  ╹"],
  "8": ["┏━┓", "┃ ┃", "┣━┫", "┃ ┃", "┗━┛"],
  "9": ["┏━┓", "┃ ┃", "┗━┫", "  ┃", "┗━┛"],
  ":": ["   ", " ● ", "   ", " ● ", "   "],
};

function renderAsciiTime(date: Date): string {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  const text = `${hh}:${mm}:${ss}`;
  const lines = ["", "", "", "", ""];
  for (const ch of text) {
    const glyph = DIGITS[ch] ?? ["   ", "   ", "   ", "   ", "   "];
    for (let i = 0; i < 5; i++) {
      lines[i] += glyph[i] + " ";
    }
  }
  return lines.join("\n");
}

export function AsciiClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) {
    return (
      <pre className="whitespace-pre font-mono text-[10px] leading-[1.05] text-[#CCFF00]/40 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        {"           :           "}
      </pre>
    );
  }
  return (
    <pre
      className="whitespace-pre font-mono text-[10px] leading-[1.05] text-[#CCFF00] [text-shadow:0_0_24px_rgba(204,255,0,.35)] sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
      aria-label={`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`}
    >
      {renderAsciiTime(now)}
    </pre>
  );
}

export function BreakDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.break.slideCount;
  return (
    <SlideShell
      active={index === 0}
      index={0}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center sm:gap-6 lg:gap-8">
        <Prompt cmd="./break" />
        <h2 className="anim mt-2 text-[44px] font-medium leading-[1.05] tracking-[-.03em] [animation-delay:150ms] sm:text-[68px] md:text-[92px] lg:text-[112px] xl:text-[128px] 2xl:text-[150px]">
          Перерыв<span className="text-[#CCFF00]">!</span>
        </h2>
        <p className="anim font-mono text-xs text-[#888] [animation-delay:200ms] sm:text-sm md:text-base">
          <span className="text-[#CCFF00]">//</span> нетворкинг, нетворкинг, нетворкинг!
        </p>
        <div className="anim mt-4 [animation-delay:300ms] sm:mt-6 lg:mt-8">
          <AsciiClock />
        </div>
      </div>
    </SlideShell>
  );
}
