"use client";

import { SlideShell } from "./components/slide-shell";
import { SPEAKERS } from "./data";

interface Props {
  index: number;
  onPrev: () => void;
  onNext: () => void;
}

export function EventDeck({ index, onPrev, onNext }: Props) {
  const total = SPEAKERS.event.slideCount;
  return (
    <SlideShell
      active={index === 0}
      index={0}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
    >
      <div className="flex flex-col gap-6">
        <pre className="anim whitespace-pre font-mono text-[10px] font-medium leading-[1.1] text-[#CCFF00] [animation-delay:100ms] [text-shadow:0_0_24px_rgba(204,255,0,.2)]">
{`    _   _    _    ____  _   _      ____  _______     __
   | \\ | |  / \\  / ___|| | | |    |  _ \\| ____\\ \\   / /
   |  \\| | / _ \\ \\___ \\| |_| |    | | | |  _|  \\ \\ / /
   | |\\  |/ ___ \\ ___) |  _  |    | |_| | |___  \\ V /
   |_| \\_/_/   \\_\\____/|_| |_|    |____/|_____|  \\_/`}
        </pre>
        <h1 className="anim max-w-[1200px] text-[56px] font-medium leading-[1.05] tracking-[-.03em] [animation-delay:150ms] sm:text-[64px] lg:text-[72px]">
          Конференция для <span className="text-[#CCFF00]">создателей</span>{" "}
          будущего
        </h1>
        <p className="anim font-mono text-base text-[#888] [animation-delay:200ms]">
          <span className="text-[#CCFF00]">//</span> 15 мин доклад · 15 мин
          интерактив · 0% канцелярщины
        </p>
        <div className="anim mt-8 flex flex-col gap-1.5 font-mono text-[15px] [animation-delay:250ms]">
          {[
            ["date:", "23 октября 2026", true],
            ["location:", "МЦК КИТС · Казань", false],
            ["price:", "Бесплатно · 16+", false],
          ].map(([k, v, accent]) => (
            <div key={k as string} className="flex items-baseline gap-6">
              <span className="min-w-[100px] text-[13px] uppercase tracking-[.15em] text-[#666]">
                {k as string}
              </span>
              <span className={accent ? "text-[#CCFF00]" : "text-white"}>
                {v as string}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="anim mt-auto flex flex-wrap items-center gap-12 border-y border-[#222] py-7 [animation-delay:300ms]">
        <img
          src="/nash-dev-logo.svg"
          alt="Наш.дев"
          className="h-10 opacity-75 transition-opacity hover:opacity-100"
        />
        <img
          src="/speakers/2/VershinyTop_Logotype.svg"
          alt="Вершины"
          className="h-10 opacity-75 transition-opacity hover:opacity-100"
        />
        <img
          src="/unidoka-logo.svg"
          alt="Unidoka"
          className="h-9 opacity-75 transition-opacity hover:opacity-100"
        />
        <img
          src="/rd-logo.svg"
          alt="Rovno.dev"
          className="h-9 opacity-75 transition-opacity hover:opacity-100"
        />
      </div>
    </SlideShell>
  );
}
