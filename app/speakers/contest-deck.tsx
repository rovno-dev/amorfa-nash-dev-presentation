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
      <div className="anim font-mono text-base text-[#CCFF00] [animation-delay:100ms]">
        <span className="font-medium">$</span> cat prize.yaml
      </div>
      <h2 className="anim mt-4 text-[44px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
        Розыгрыш: Яндекс Станция Лайт
      </h2>

      <div className="anim mt-10 grid grid-cols-1 gap-16 [animation-delay:200ms] lg:grid-cols-2">
        <div>
          <div className="space-y-2 border-l-2 border-[#CCFF00] pl-6 font-mono text-base">
            {[
              ["prize:", "Яндекс Станция Лайт"],
              ["value:", "6 700 ₽"],
              ["timing:", "14:50 — в зале"],
              ["how_to_win:", "лучший вопрос"],
            ].map(([k, v]) => (
              <div key={k}>
                <span className="inline-block min-w-[130px] text-[#CCFF00]">
                  {k}
                </span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-sm text-[#666]">// Правила</p>
          <ul className="mt-3 space-y-2 font-mono text-[15px] text-[#bbb]">
            {[
              "задай содержательный вопрос спикеру",
              "спикер сам выбирает лучший после доклада",
              "вручение — в конце мероприятия",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="text-[#CCFF00]">→</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 border border-[#222] bg-[#0a0a0a] p-12">
          <AsciiStation />
          <div className="mt-4 font-mono text-xs text-[#666]">
            {">"} Алиса, включи плейлист для Наш Дэв...
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#666]">
            <WaveDots />
            <span>Включаю плейлист для мероприятий</span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
