"use client";
import { SlideShell } from "./components/slide-shell";
import { AsciiStation, WaveDots } from "./components/ascii";
import { SPEAKERS } from "./data";

interface Props {
  index: number;
  onPrev: () => void;
  onNext: () => void;
}

export function ContestDeck({ index, onPrev, onNext }: Props) {
  const total = SPEAKERS.contest.slideCount;
  return (
    <SlideShell
      active={index === 0}
      index={0}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
    >
      <div className="anim font-mono text-xs text-[#CCFF00] [animation-delay:100ms] sm:text-sm md:text-base">
        <span className="font-medium">$</span> cat prize.yaml
      </div>
      <h2 className="anim mt-3 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:text-[30px] md:text-[36px] lg:text-[44px]">
        Розыгрыш: Яндекс Станция Лайт
      </h2>
      <div className="anim mt-6 grid grid-cols-1 gap-6 [animation-delay:200ms] sm:mt-8 sm:gap-10 lg:mt-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="space-y-1.5 border-l-2 border-[#CCFF00] pl-3 font-mono text-xs sm:space-y-2 sm:pl-6 sm:text-sm md:text-base">
            {[
              ["prize:", "Яндекс Станция Лайт"],
              ["value:", "6 700 ₽"],
              ["timing:", "14:50 — в зале"],
              ["how_to_win:", "лучший вопрос"],
            ].map(([k, v]) => (
              <div key={k}>
                <span className="inline-block min-w-[90px] text-[#CCFF00] sm:min-w-[130px]">
                  {k}
                </span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-[#666] sm:mt-8 sm:text-sm">// Правила</p>
          <ul className="mt-2 space-y-1.5 font-mono text-xs text-[#bbb] sm:mt-3 sm:space-y-2 sm:text-sm md:text-[15px]">
            {[
              "задай содержательный вопрос спикеру",
              "спикер сам выбирает лучший после доклада",
              "вручение — в конце мероприятия",
            ].map((t) => (
              <li key={t} className="flex gap-2 sm:gap-3">
                <span className="text-[#CCFF00]">→</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 border border-[#222] bg-[#0a0a0a] p-4 sm:gap-4 sm:p-8 lg:p-12">
          <AsciiStation />
          <div className="mt-2 font-mono text-[10px] text-[#666] sm:mt-4 sm:text-xs">
            {">"} Алиса, включи плейлист для Наш Дэв...
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#666] sm:text-xs">
            <WaveDots />
            <span>Включаю плейлист для мероприятий</span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
