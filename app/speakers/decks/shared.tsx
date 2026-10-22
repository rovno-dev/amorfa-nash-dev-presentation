"use client";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScrambleText } from "../components/scramble-text";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS, type DeckId } from "../data";

export interface DeckProps {
  total: number;
  index: number;
  onPrev: () => void;
  onNext: () => void;
}

// Small QR + URL anchored top-right of the slide. Visible md+.
export function PresentationCorner() {
  return (
    <div className="pointer-events-none absolute right-4 top-4 z-20 hidden flex-col items-end gap-2 md:right-6 md:top-6 md:flex lg:right-8 lg:top-8">
      <img
        src="/presentation-qr.svg"
        alt="QR: presentation"
        className="h-24 w-24 border border-white/20 bg-white p-1 md:h-32 md:w-32 lg:h-40 lg:w-40 2xl:h-48 2xl:w-48"
      />
      <span className="font-mono text-[11px] tracking-[.15em] text-white/55 md:text-sm lg:text-base 2xl:text-lg">
        nd-2026.slides.rovno.dev
      </span>
    </div>
  );
}

export function SpeakerHero({
  id,
  active,
  index,
  total,
  onPrev,
  onNext,
}: DeckProps & { id: DeckId; active: boolean }) {
  const s = SPEAKERS[id];
  const isDuo = s.photos.length === 2;
  return (
    <SlideShell
      active={active}
      index={index}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
    >
      <PresentationCorner />
      {isDuo ? (
        <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="anim flex shrink-0 gap-2 [animation-delay:100ms] sm:gap-4 lg:gap-5">
            {s.photos.map((p, i) => (
              <div
                key={i}
                className="relative h-[180px] w-[140px] overflow-hidden border border-[#222] transition-colors hover:border-[#CCFF00] sm:h-[240px] sm:w-[190px] md:h-[280px] md:w-[220px] lg:h-[320px] lg:w-[250px] xl:h-[320px] xl:w-[250px] 2xl:h-[400px] 2xl:w-[310px]"
              >
                <Image
                  src={p}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 190px, (max-width: 1024px) 220px, (max-width: 1536px) 250px, 310px"
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
          <div className="w-full max-w-[720px]">
            <ScrambleText
              text={s.name}
              as="h1"
              className="anim min-h-[40px] break-words text-balance text-[26px] font-medium leading-[1.05] tracking-[-.03em] [animation-delay:150ms] sm:min-h-[60px] sm:text-[38px] md:min-h-[64px] md:text-[44px] lg:min-h-[72px] lg:text-[52px] xl:min-h-[72px] xl:text-[56px] 2xl:min-h-[88px] 2xl:text-[64px]"
            />
            <div className="anim mt-2 font-mono text-xs text-[#CCFF00] [animation-delay:200ms] sm:mt-3 sm:text-sm md:text-base">
              {s.subtitle}
            </div>
            <p className="anim mt-2 text-sm leading-relaxed text-[#ccc] [animation-delay:250ms] sm:mt-3 sm:text-base md:text-lg lg:mt-4 lg:text-xl">
              {s.shortBio}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:items-center md:gap-8 lg:gap-10 xl:gap-10 2xl:gap-16">
          <div className="anim flex shrink-0 [animation-delay:100ms]">
            <div className="relative h-[240px] w-[240px] overflow-hidden border border-[#222] transition-colors hover:border-[#CCFF00] sm:h-[280px] sm:w-[280px] md:h-[260px] md:w-[240px] lg:h-[320px] lg:w-[320px] xl:h-[340px] xl:w-[340px] 2xl:h-[440px] 2xl:w-[400px]">
              <Image
                src={s.photos[0]}
                alt={s.name}
                fill
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 240px, (max-width: 1280px) 320px, (max-width: 1536px) 340px, 400px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="w-full min-w-0 flex-1">
            <ScrambleText
              text={s.name}
              as="h1"
              className="anim min-h-[32px] break-words text-balance text-[26px] font-medium leading-[1.05] tracking-[-.03em] [animation-delay:150ms] sm:min-h-[48px] sm:text-[38px] md:min-h-[48px] md:text-[40px] lg:min-h-[64px] lg:text-[52px] xl:min-h-[64px] xl:text-[56px] 2xl:min-h-[80px] 2xl:text-[72px]"
            />
            <div className="anim mt-2 font-mono text-xs text-[#CCFF00] [animation-delay:200ms] sm:mt-3 sm:text-sm md:text-base">
              {s.subtitle}
            </div>
            <p className="anim mt-2 max-w-[920px] text-sm leading-relaxed text-[#ccc] [animation-delay:250ms] sm:mt-3 sm:text-base md:text-lg lg:mt-4 lg:text-lg xl:mt-4 xl:text-lg 2xl:mt-6 2xl:text-xl">
              {s.shortBio}
            </p>
          </div>
        </div>
      )}
    </SlideShell>
  );
}

export function TerminalCard({
  title,
  body,
  delay,
  danger,
  success,
  className,
}: {
  title: string;
  body: React.ReactNode;
  delay: number;
  danger?: boolean;
  success?: boolean;
  className?: string;
}) {
  const border = danger ? "#FF3B3B" : success ? "#CCFF00" : "#222";
  return (
    <Card
      className={cn(
        "anim gap-2 rounded-none border bg-[rgba(10,10,10,.6)] px-4 py-4 ring-0 backdrop-blur-xl sm:gap-3 sm:px-6 sm:py-6 lg:px-6 lg:py-6 2xl:px-8 2xl:py-8",
        className,
      )}
      style={{ borderColor: border, animationDelay: `${delay}ms` }}
    >
      <h3
        className="font-mono text-sm font-medium sm:text-base md:text-lg lg:text-lg 2xl:text-[20px]"
        style={{ color: danger ? "#FF3B3B" : "#CCFF00" }}
      >
        {title}
      </h3>
      <p className="text-xs leading-relaxed text-[#ccc] sm:text-sm md:text-base lg:text-base 2xl:text-[20px]">{body}</p>
    </Card>
  );
}

export function Stat({
  num,
  label,
  accent,
}: {
  num: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="border-l-2 pl-3 sm:pl-4 lg:pl-4 2xl:pl-6" style={{ borderColor: accent ?? "#CCFF00" }}>
      <div
        className="text-[32px] font-medium leading-none tracking-[-.03em] sm:text-[44px] md:text-[52px] lg:text-[56px] 2xl:text-[76px]"
        style={{ color: accent }}
      >
        {num}
      </div>
      <div className="mt-1.5 font-mono text-[10px] text-[#888] sm:mt-2 sm:text-[12px] lg:text-[12px] 2xl:mt-3 2xl:text-[13px]">
        {label}
      </div>
    </div>
  );
}

export function Prompt({ cmd, delay = 100 }: { cmd: string; delay?: number }) {
  return (
    <div
      className="anim font-mono text-xs text-[#CCFF00] sm:text-sm md:text-base"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="font-medium">$</span> {cmd}
    </div>
  );
}

export function ErrorSlide({
  active,
  idx,
  total,
  onPrev,
  onNext,
  title,
  desc,
  bad,
  good,
  badLabel = "Плохо",
}: {
  active: boolean;
  idx: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  title: string;
  desc: string;
  bad: React.ReactNode;
  good: React.ReactNode;
  badLabel?: string;
}) {
  return (
    <SlideShell
      active={active}
      index={idx}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
    >
      <Prompt cmd={`./error-0${idx}`} />
      <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
        {title}
      </h2>
      <p className="anim mt-2 max-w-[920px] text-sm leading-relaxed text-[#ccc] [animation-delay:200ms] sm:mt-3 sm:text-base md:text-lg lg:mt-3 lg:text-lg xl:mt-3 xl:text-lg 2xl:mt-5 2xl:text-[22px]">
        {desc}
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2 lg:mt-6 lg:gap-4 2xl:mt-8 2xl:gap-6">
        <TerminalCard title={badLabel} body={bad} delay={250} danger />
        <TerminalCard title="Хорошо" body={good} delay={300} success />
      </div>
    </SlideShell>
  );
}

// "Спасибо!" slide — variant "simple" (bare thanks), "final" (TG QR + @handle).
export function ThanksSlide({
  active,
  index,
  total,
  onPrev,
  onNext,
  variant = "simple",
}: {
  active: boolean;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  variant?: "simple" | "final";
}) {
  if (variant === "simple") {
    return (
      <SlideShell
        active={active}
        index={index}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Prompt cmd="./thanks" />
          <h2 className="anim mt-3 text-[48px] font-medium leading-[1.05] tracking-[-.03em] [animation-delay:150ms] sm:text-[72px] md:text-[96px] lg:text-[120px] xl:text-[140px] 2xl:text-[180px]">
            Спасибо<span className="text-[#CCFF00]">!</span>
          </h2>
        </div>
      </SlideShell>
    );
  }
  return (
    <SlideShell
      active={active}
      index={index}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
    >
      <div className="flex flex-col items-center text-center">
        <Prompt cmd="./thanks --final" />
        <h2 className="anim mt-2 text-[36px] font-medium leading-[1.05] tracking-[-.03em] [animation-delay:150ms] sm:mt-3 sm:text-[56px] md:text-[72px] lg:text-[88px] xl:text-[100px] 2xl:text-[120px]">
          Спасибо<span className="text-[#CCFF00]">!</span>
        </h2>
        <p className="anim mt-3 max-w-[600px] text-sm leading-relaxed text-[#aaa] [animation-delay:200ms] sm:mt-4 sm:text-base md:text-lg lg:text-xl">
          Результаты, реплеи и всё остальное - в Telegram-канале Rovno.dev. Как и ссылка на обновлённый сайт
        </p>
        <div className="anim mt-5 border border-[#222] bg-white p-3 [animation-delay:250ms] sm:mt-6 sm:p-4">
          <img
            src="/rd-tg-qr.svg"
            alt="QR: @rovno_dev"
            className="h-[180px] w-[180px] object-contain sm:h-[220px] sm:w-[220px] md:h-[240px] md:w-[240px] lg:h-[260px] lg:w-[260px] 2xl:h-[300px] 2xl:w-[300px]"
          />
        </div>
        <a
          href="https://t.me/rovno_dev"
          target="_blank"
          rel="noopener noreferrer"
          className="anim mt-4 inline-flex items-center gap-2 border border-[#CCFF00] bg-[#CCFF00] px-5 py-3 font-mono text-xs font-medium uppercase tracking-[.14em] text-black transition-all [animation-delay:300ms] hover:bg-transparent hover:text-[#CCFF00] sm:mt-5 sm:px-6 sm:py-3.5 sm:text-sm"
        >
          @rovno_dev
          <ArrowRight size={14} weight="bold" />
        </a>
      </div>
    </SlideShell>
  );
}
