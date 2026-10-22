"use client";
import { Fragment } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS } from "../data";
import { SpeakerHero, Prompt, ThanksSlide, type DeckProps } from "./shared";

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

// Transparent PNG anchored to a corner, behind text.
function CornerImage({
  src,
  alt,
  className,
  side = "right",
}: {
  src: string;
  alt: string;
  className?: string;
  side?: "left" | "right";
}) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden="true"
      className={cn(
        className,
        "anim pointer-events-none absolute bottom-0 z-0 max-h-[55%] w-auto max-w-[75%] select-none object-contain object-bottom [animation-delay:200ms] sm:max-h-[65%] md:max-h-[72%] lg:max-h-[78%] xl:max-h-[80%] 2xl:max-h-[84%]",
        side === "left" ? "left-0" : "right-0",
      )}
    />
  );
}

// Vercel-style green callout box for image-bearing questions.
function CalloutBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="anim relative z-10 mt-6 ml-auto max-w-[64%] bg-[#CCFF00] p-4 text-black [animation-delay:150ms] sm:mt-8 sm:p-6 md:max-w-[58%] md:p-7 lg:p-8">
      <h2 className="text-[15px] font-medium leading-[1.15] tracking-[-.01em] sm:text-[20px] md:text-[26px] lg:text-[32px] xl:text-[38px] 2xl:text-[46px]">
        {children}
      </h2>
    </div>
  );
}

export function MikDanDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.mikhail.slideCount;
  return (
    <>
      {/* 0 - Hero */}
      <SpeakerHero
        id="mikhail"
        active={index === 0}
        index={0}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />

      {/* 1 - Ожидания */}
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
      </SlideShell>

      {/* 2 - «Брат, сделай...» */}
      <SlideShell
        active={index === 2}
        index={2}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <CornerImage
            src="/speakers/4/brat.png"
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

      {/* 3 - Марионетка */}
      <SlideShell
        active={index === 3}
        index={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <CornerImage className="bg-[#B4EE03]" src="/speakers/4/playwright.png" alt="Марионетка" />
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

      {/* 4 - Q1 */}
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

      {/* 5 - Q2 · Smith LEFT, callout RIGHT */}
      <SlideShell
        active={index === 5}
        index={5}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <QuestionLabel n={2} position="tl" />
          <CornerImage
            src="/speakers/4/y-smith.png"
            alt="Реакция клиента"
            side="left"
          />
          <CalloutBox>
            Что должен испытать клиент в первые секунды взаимодействия с
            дизайном?
          </CalloutBox>
        </div>
      </SlideShell>

      {/* 6 - Q3 */}
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

      {/* 7 - Q4 */}
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

      {/* 8 - Q5 · bodrov-druzhko LEFT, callout RIGHT */}
      <SlideShell
        active={index === 8}
        index={8}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <QuestionLabel n={5} position="tl" />
          <CornerImage
            src="/speakers/4/boss-arguing.png"
            alt="Стейкхолдеры"
            side="left"
          />
          <CalloutBox>
            Кто, кроме вас, принимает решение и кто подписывает бюджет?
          </CalloutBox>
        </div>
      </SlideShell>

      {/* 9 - Flow · Vercel-style 3-node pipeline */}

      {/* 9 - Flow · vertical monochrome pipeline */}
      <SlideShell
        active={index === 9}
        index={9}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./process" />
        <h2 className="anim mt-2 break-words text-balance text-[22px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[56px]">
          <span className="text-white/50">Один процесс - </span>
          <span className="text-white">ноль переделок</span>
        </h2>

        <div className="anim mt-6 flex min-h-0 flex-1 items-center justify-center [animation-delay:200ms] sm:mt-8">
          <div className="flex w-full max-w-2xl flex-col items-stretch">
            {[
              { num: "01", en: "", ru: "5 вопросов" },
              { num: "02", en: "", ru: "Один документ" },
              { num: "03", en: "", ru: "Один прототип" },
            ].map((step, i, arr) => {
              const isLast = i === arr.length - 1;
              return (
                <Fragment key={step.num}>
                  <div
                    className={cn(
                      "relative flex items-center gap-4 rounded-2xl border px-5 py-5 transition-colors sm:gap-6 sm:px-8 sm:py-7",
                      isLast
                        ? "border-white/[0.2] bg-white/[0.05]"
                        : "border-white/[0.08] bg-white/[0.02]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-black font-mono text-base font-medium sm:h-16 sm:w-16 sm:text-xl",
                        isLast
                          ? "border-white/[0.2] text-white"
                          : "border-white/[0.1] text-white/60",
                      )}
                    >
                      {step.num}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10px] uppercase tracking-[.2em] text-white/40 sm:text-xs">
                        {step.en}
                      </div>
                      <div className="mt-1 text-xl font-medium leading-tight text-white sm:text-2xl md:text-3xl">
                        {step.ru}
                      </div>
                    </div>
                  </div>
                  {!isLast && (
                    <div className="flex justify-center py-2 sm:py-2.5">
                      <ArrowDown size={18} weight="bold" className="text-white/30" />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </SlideShell>

      {/* 10 - QR */}
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
            <span className="text-[#CCFF00]">//</span> наш канал в MAX
          </p>
        </div>
      </SlideShell>
      <ThanksSlide active={index === 11} index={11} total={total} onPrev={onPrev} onNext={onNext} />
    </>
  );
}
