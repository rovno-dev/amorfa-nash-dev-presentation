"use client";
import { SlideShell } from "./components/slide-shell";
import { PresentationCorner } from "./decks/shared";
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
      <PresentationCorner />
      <div className="flex flex-col gap-5 pr-[120px] sm:gap-8 sm:pr-[150px] md:pr-[190px] lg:gap-10 lg:pr-[230px] 2xl:pr-[280px]">
        <pre className="anim hidden whitespace-pre font-mono text-[12px] font-medium leading-[1.1] text-[#CCFF00] [animation-delay:100ms] [text-shadow:0_0_24px_rgba(204,255,0,.2)] sm:block md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px]">
{`    _   _    _    ____  _   _      ____  _______     __
   | \\ | |  / \\  / ___|| | | |    |  _ \\| ____\\ \\   / /
   |  \\| | / _ \\ \\___ \\| |_| |    | | | |  _|  \\ \\ / /
   | |\\  |/ ___ \\ ___) |  _  |    | |_| | |___  \\ V /
   |_| \\_/_/   \\_\\____/|_| |_|    |____/|_____|  \\_/`}
        </pre>
        <h1 className="anim max-w-[1200px] text-[32px] font-medium leading-[1.1] tracking-[-.03em] [animation-delay:150ms] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[110px]">
          Конференция для <span className="text-[#CCFF00]">создателей</span>{" "}
          будущего
        </h1>
        <p className="anim font-mono text-sm text-[#888] [animation-delay:200ms] sm:text-base md:text-lg lg:text-xl 2xl:text-2xl">
          <span className="text-[#CCFF00]">//</span> 15 мин доклад · 15 мин
          интерактив · 0% канцелярщины
        </p>
        <div className="anim mt-4 flex flex-col gap-2 font-mono text-sm [animation-delay:250ms] sm:mt-8 sm:text-base md:text-lg lg:text-xl 2xl:mt-12 2xl:text-2xl">
          {[
            ["date:", "23 октября 2026", true],
            ["location:", "МЦК КИТС · Казань", false],
            ["price:", "Бесплатно · 16+", false],
          ].map(([k, v, accent]) => (
            <div key={k as string} className="flex items-baseline gap-4 sm:gap-8 2xl:gap-12">
              <span className="min-w-[100px] text-xs uppercase tracking-[.15em] text-[#666] sm:min-w-[140px] sm:text-sm md:text-base 2xl:min-w-[180px] 2xl:text-lg">
                {k as string}
              </span>
              <span className={accent ? "text-[#CCFF00]" : "text-white"}>
                {v as string}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="anim mt-auto flex flex-wrap items-center gap-6 border-y border-[#222] py-6 [animation-delay:300ms] sm:gap-10 sm:py-8 md:gap-16 md:py-10 lg:gap-20 2xl:gap-28">
        <img
          src="/nash-dev-logo.svg"
          alt="Наш.дев"
          className="h-8 opacity-75 transition-opacity hover:opacity-100 sm:h-10 md:h-12 lg:h-14 2xl:h-16"
        />
        <img
          src="/speakers/2/VershinyTop_Logotype.svg"
          alt="Вершины"
          className="h-8 opacity-75 transition-opacity hover:opacity-100 sm:h-10 md:h-12 lg:h-14 2xl:h-16"
        />
        <img
          src="/unidoka-logo.svg"
          alt="Unidoka"
          className="h-6 opacity-75 transition-opacity hover:opacity-100 sm:h-8 md:h-10 lg:h-12 2xl:h-14"
        />
        <img
          src="/rd-logo.svg"
          alt="Rovno.dev"
          className="h-6 opacity-75 transition-opacity hover:opacity-100 sm:h-8 md:h-10 lg:h-12 2xl:h-14"
        />
      </div>
    </SlideShell>
  );
}
