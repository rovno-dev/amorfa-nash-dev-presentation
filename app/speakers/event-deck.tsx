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
      <div className="flex flex-col gap-4 sm:gap-6">
        <pre className="anim hidden whitespace-pre font-mono text-[10px] font-medium leading-[1.1] text-[#CCFF00] [animation-delay:100ms] [text-shadow:0_0_24px_rgba(204,255,0,.2)] sm:block">
{`    _   _    _    ____  _   _      ____  _______     __
   | \\ | |  / \\  / ___|| | | |    |  _ \\| ____\\ \\   / /
   |  \\| | / _ \\ \\___ \\| |_| |    | | | |  _|  \\ \\ / /
   | |\\  |/ ___ \\ ___) |  _  |    | |_| | |___  \\ V /
   |_| \\_/_/   \\_\\____/|_| |_|    |____/|_____|  \\_/`}
        </pre>
        <h1 className="anim max-w-[1200px] text-[26px] font-medium leading-[1.1] tracking-[-.03em] [animation-delay:150ms] sm:text-[40px] md:text-[52px] lg:text-[64px] xl:text-[72px]">
          Конференция для <span className="text-[#CCFF00]">создателей</span>{" "}
          будущего
        </h1>
        <p className="anim font-mono text-xs text-[#888] [animation-delay:200ms] sm:text-sm md:text-base">
          <span className="text-[#CCFF00]">//</span> 15 мин доклад · 15 мин
          интерактив · 0% канцелярщины
        </p>
        <div className="anim mt-4 flex flex-col gap-1.5 font-mono text-xs [animation-delay:250ms] sm:mt-8 sm:text-sm md:text-[15px]">
          {[
            ["date:", "23 октября 2026", true],
            ["location:", "МЦК КИТС · Казань", false],
            ["price:", "Бесплатно · 16+", false],
          ].map(([k, v, accent]) => (
            <div key={k as string} className="flex items-baseline gap-3 sm:gap-6">
              <span className="min-w-[80px] text-[10px] uppercase tracking-[.15em] text-[#666] sm:min-w-[100px] sm:text-[13px]">
                {k as string}
              </span>
              <span className={accent ? "text-[#CCFF00]" : "text-white"}>
                {v as string}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="anim mt-auto flex flex-wrap items-center gap-4 border-y border-[#222] py-4 [animation-delay:300ms] sm:gap-8 sm:py-5 md:gap-12 md:py-7">
        <img
          src="/nash-dev-logo.svg"
          alt="Наш.дев"
          className="h-6 opacity-75 transition-opacity hover:opacity-100 sm:h-8 md:h-10"
        />
        <img
          src="/speakers/2/VershinyTop_Logotype.svg"
          alt="Вершины"
          className="h-6 opacity-75 transition-opacity hover:opacity-100 sm:h-8 md:h-10"
        />
        <img
          src="/unidoka-logo.svg"
          alt="Unidoka"
          className="h-5 opacity-75 transition-opacity hover:opacity-100 sm:h-7 md:h-9"
        />
        <img
          src="/rd-logo.svg"
          alt="Rovno.dev"
          className="h-5 opacity-75 transition-opacity hover:opacity-100 sm:h-7 md:h-9"
        />
      </div>
    </SlideShell>
  );
}
