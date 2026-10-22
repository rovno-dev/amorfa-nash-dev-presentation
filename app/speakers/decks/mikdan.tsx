"use client";
import { ArrowDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS } from "../data";
import { SpeakerHero, Prompt, type DeckProps } from "./shared";

// Corner label — top-left (Q1) or top-right (Q2-Q5)
function QuestionLabel({
  n,
  position,
}: {
  n: number;
  position: "tl" | "tr";
}) {
  return (
    <span
      className={cn(
        "anim absolute top-0 z-20 font-mono text-[10px] uppercase tracking-[.22em] text-[#888] [animation-delay:120ms] sm:text-xs",
        position === "tl" ? "left-0" : "right-0",
      )}
    >
      Вопрос {n}
    </span>
  );
}

// Transparent PNG anchored bottom-right, behind text.
function CornerImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden="true"
      className="anim pointer-events-none absolute bottom-0 right-0 z-0 max-h-[55%] w-auto max-w-[75%] select-none object-contain object-bottom [animation-delay:200ms] sm:max-h-[65%] md:max-h-[72%] lg:max-h-[78%] xl:max-h-[80%] 2xl:max-h-[84%]"
    />
  );
}

export function MikDanDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.mikhail.slideCount;
  return (
    <>
      {/* 0 — Hero (same SpeakerHero as every other speaker) */}
      <SpeakerHero
        id="mikhail"
        active={index === 0}
        index={0}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />

      {/* 1 — Как оправдать ожидания клиента? */}
      <SlideShell
        active={index === 1}
        index={1}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./expectations" />
        <h2 className="anim mt-2 max-w-[90%] break-words text-balance text-[28px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:max-w-[85%] sm:text-[36px] md:text-[48px] lg:text-[56px] xl:text-[64px] 2xl:text-[80px]">
          Как оправдать ожидания клиента?
        </h2>
        <p className="anim mt-4 max-w-[700px] text-sm leading-relaxed text-[#888] [animation-delay:250ms] sm:mt-6 sm:text-base md:text-lg 2xl:text-xl">
          Пять вопросов, которые превращают «сделайте красиво» в понятный
          проект. И спасают обе стороны от марионеточного театра.
        </p>
      </SlideShell>

      {/* 2 — «Брат, сделай сайт как у Apple...» */}
      <SlideShell
        active={index === 2}
        index={2}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <CornerImage
            src="/speakers/4/boss-arguing.png"
            alt="Клиент и дизайнер"
          />
          <div className="relative z-10">
            <Prompt cmd="./client-brief" />
            <h2 className="anim mt-2 max-w-[85%] break-words text-balance text-[22px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:max-w-[78%] sm:text-[30px] md:text-[38px] lg:text-[46px] xl:text-[54px] 2xl:text-[66px]">
              «Брат, сделай сайт как у Apple, но бюджет 15 тыс.»
            </h2>
          </div>
        </div>
      </SlideShell>

      {/* 3 — Как не быть марионеткой в руках клиента? */}
      <SlideShell
        active={index === 3}
        index={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <CornerImage src="/speakers/4/man-tired.png" alt="Марионетка" />
          <div className="relative z-10">
            <Prompt cmd="./marionette" />
            <h2 className="anim mt-2 max-w-[85%] break-words text-balance text-[22px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:max-w-[78%] sm:text-[30px] md:text-[38px] lg:text-[46px] xl:text-[54px] 2xl:text-[66px]">
              Как не быть{" "}
              <span className="text-[#CCFF00]">марионеткой</span> в руках
              клиента?
            </h2>
          </div>
        </div>
      </SlideShell>

      {/* 4 — Q1 · centered, no image */}
      <SlideShell
        active={index === 4}
        index={4}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <QuestionLabel n={1} position="tl" />
          <div className="flex flex-1 items-center justify-center">
            <h2 className="anim max-w-[92%] text-center text-balance text-[28px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:text-[38px] md:text-[48px] lg:text-[60px] xl:text-[68px] 2xl:text-[84px]">
              Для чего вам понадобился
              <br />
              <span className="text-[#CCFF00]">логотип?</span>
            </h2>
          </div>
        </div>
      </SlideShell>

      {/* 5 — Q2 · image bottom-right, text top-left */}
      <SlideShell
        active={index === 5}
        index={5}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <QuestionLabel n={2} position="tr" />
          <CornerImage src="/speakers/4/y-smith.png" alt="Реакция клиента" />
          <h2 className="anim relative z-10 mt-8 max-w-[82%] text-left text-balance text-[20px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:mt-10 sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[44px] 2xl:text-[54px]">
            Что должен испытать клиент в{" "}
            <span className="text-[#CCFF00]">первые секунды</span>{" "}
            взаимодействия с дизайном?
          </h2>
        </div>
      </SlideShell>

      {/* 6 — Q3 · centered, no image (Mr. Incredible placeholder noted) */}
      <SlideShell
        active={index === 6}
        index={6}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <QuestionLabel n={3} position="tr" />
          <div className="flex flex-1 items-center justify-center">
            <h2 className="anim max-w-[88%] text-center text-balance text-[22px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:text-[28px] md:text-[34px] lg:text-[42px] xl:text-[48px] 2xl:text-[60px]">
              Какой <span className="text-[#CCFF00]">бизнес-показатель</span>{" "}
              вы хотите изменить этим проектом: выручку, скорость, стоимость,
              безопасность, нагрузку?
            </h2>
          </div>
        </div>
      </SlideShell>

      {/* 7 — Q4 · centered, no image */}
      <SlideShell
        active={index === 7}
        index={7}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <QuestionLabel n={4} position="tr" />
          <div className="flex flex-1 items-center justify-center">
            <h2 className="anim max-w-[92%] text-center text-balance text-[28px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:text-[38px] md:text-[48px] lg:text-[60px] xl:text-[68px] 2xl:text-[84px]">
              Как вы поймете, что
              <br />
              проект <span className="text-[#CCFF00]">удался?</span>
            </h2>
          </div>
        </div>
      </SlideShell>

      {/* 8 — Q5 · image bottom-right, text top-left */}
      <SlideShell
        active={index === 8}
        index={8}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <QuestionLabel n={5} position="tr" />
          <CornerImage
            src="/speakers/4/bodrov-druzhko.png"
            alt="Стейкхолдеры"
          />
          <h2 className="anim relative z-10 mt-8 max-w-[80%] text-left text-balance text-[20px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:mt-10 sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[44px] 2xl:text-[54px]">
            Кто, кроме вас, принимает решение и кто{" "}
            <span className="text-[#CCFF00]">подписывает бюджет?</span>
          </h2>
        </div>
      </SlideShell>

      {/* 9 — Flow */}
      <SlideShell
        active={index === 9}
        index={9}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./process" />
        <h2 className="anim mt-2 break-words text-balance text-[22px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[46px] 2xl:text-[54px]">
          5 вопросов → один документ → один прототип
        </h2>
        <div className="anim mt-6 flex flex-col items-center gap-2 [animation-delay:200ms] sm:mt-8 sm:gap-3 lg:mt-10 2xl:gap-4">
          <div className="w-full max-w-[420px] border-2 border-[#CCFF00] bg-white px-6 py-2.5 text-center text-sm font-medium text-black sm:px-8 sm:py-3.5 sm:text-base md:text-lg 2xl:text-xl">
            5 вопросов
          </div>
          <ArrowDown size={20} weight="bold" className="text-[#CCFF00]" />
          <div className="w-full max-w-[420px] border-2 border-[#CCFF00] bg-white px-6 py-2.5 text-center text-sm font-medium text-black sm:px-8 sm:py-3.5 sm:text-base md:text-lg 2xl:text-xl">
            Один документ
          </div>
          <ArrowDown size={20} weight="bold" className="text-[#CCFF00]" />
          <div className="w-full max-w-[420px] border-2 border-[#CCFF00] bg-white px-6 py-2.5 text-center text-sm font-medium text-black sm:px-8 sm:py-3.5 sm:text-base md:text-lg 2xl:text-xl">
            Один прототип
          </div>
        </div>
      </SlideShell>

      {/* 10 — QR */}
      <SlideShell
        active={index === 10}
        index={10}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="flex flex-col items-center text-center">
          <Prompt cmd="./scan" />
          <div className="anim mt-4 border border-[#222] bg-white p-3 [animation-delay:150ms] sm:mt-6 sm:p-4">
            <img
              src="/speakers/4/rd-qr-code.svg"
              alt="QR: rovno.dev"
              className="h-[200px] w-[200px] object-contain sm:h-[240px] sm:w-[240px] md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px] 2xl:h-[380px] 2xl:w-[380px]"
            />
          </div>
          <p className="anim mt-3 font-mono text-xs text-[#888] [animation-delay:250ms] sm:mt-5 sm:text-sm md:text-base">
            <span className="text-[#CCFF00]">//</span> наведи камеру — попадёшь
            в бриф
          </p>
        </div>
      </SlideShell>
    </>
  );
}
