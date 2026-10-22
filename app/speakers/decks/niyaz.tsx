"use client";
import { ArrowRight } from "@phosphor-icons/react";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS } from "../data";
import { SpeakerHero, Stat, Prompt, ThanksSlide, type DeckProps } from "./shared";

const EVENTS_URL = "https://unidoka.com/events";
const VERSHINY_URL = "https://t.me/+cgrvXV-BbBJmMzYy";

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.16] hover:bg-white/[0.04] sm:p-6 md:p-8">
      <div className="font-mono text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {value}
      </div>
      <div className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[.18em] text-white/40 sm:text-xs">
        {label}
      </div>
    </div>
  );
}

export function NiyazDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.niyaz.slideCount;
  return (
    <>
      {/* 0 - Hero */}
      <SpeakerHero
        id="niyaz"
        active={index === 0}
        index={0}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />

      {/* 1 - Предыстория */}
      <SlideShell
        active={index === 1}
        index={1}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./origin" />
        <h2 className="anim mt-2 max-w-[92%] break-words text-balance text-[24px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[34px] md:text-[44px] lg:text-[54px] xl:text-[62px] 2xl:text-[72px]">
          Не хватало одного{" "}
          <span className="text-[#CCFF00]">«источника правды»</span>
        </h2>
        <p className="anim mt-4 max-w-[760px] text-sm leading-relaxed text-[#aaa] [animation-delay:250ms] sm:mt-6 sm:text-base md:text-lg lg:text-xl 2xl:text-[22px]">
          Мероприятия были размазаны по десяткам каналов, чатов и таблиц.
          Хотелось собрать большинство событий в одном месте - независимо, без
          выгоды и ангажированности. В основном IT и бизнес: соревнования,
          конференции, форумы.
        </p>
      </SlideShell>

      {/* 2 - Точка невозврата */}
      <SlideShell
        active={index === 2}
        index={2}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./point-of-no-return" />
        <h2 className="anim mt-2 max-w-[92%] break-words text-balance text-[24px] font-medium leading-[1.1] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[34px] md:text-[44px] lg:text-[54px] xl:text-[62px] 2xl:text-[72px]">
          Даже <span className="text-[#CCFF00]">Телеграм</span> не выдержал
        </h2>
        <p className="anim mt-4 max-w-[760px] text-sm leading-relaxed text-[#aaa] [animation-delay:250ms] sm:mt-6 sm:text-base md:text-lg lg:text-xl 2xl:text-[22px]">
          Сначала мы жили в чате подготовки к соревнованиям и собеседованиям.
          Появились статьи, потом - удобная упаковка информации. Но всё это
          оставалось за закрытой дверью сообщества. Нужно было масштабирование
          - и мы его сделали.
        </p>
      </SlideShell>

      {/* 3 - Вживую (full-height iframe) */}
      <SlideShell
        active={index === 3}
        index={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <Prompt cmd="./live-demo" />
          <h2 className="anim mt-2 shrink-0 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
            unidoka.com/events - вживую
          </h2>
          <div className="anim mt-4 flex min-h-[280px] flex-1 flex-col overflow-hidden border border-[#222] bg-[#0a0a0a] [animation-delay:200ms] sm:mt-6">
            <div className="flex shrink-0 items-center gap-2 border-b border-[#222] px-3 py-2 font-mono text-[10px] text-[#888] sm:text-xs">
              <span className="inline-block size-2 rounded-full bg-[#CCFF00]" />
              unidoka.com/events
            </div>
            <iframe
              src={EVENTS_URL}
              title="Unidoka Events"
              className="min-h-0 w-full flex-1 border-0 bg-white"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </SlideShell>

      {/* 4 - Статистика */}
      <SlideShell
        active={index === 4}
        index={4}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./stats --first-days" />
        <h2 className="anim mt-2 break-words text-balance text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
          Первые дни после запуска
        </h2>
        <div className="anim mt-6 grid grid-cols-1 gap-3 [animation-delay:200ms] sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:gap-5 2xl:mt-10">
          <StatCard value="50" label="событий в календаре" />
          <StatCard value="0" label="платных событий" />
          <StatCard value="0" label="предвзятости в поиске" />
          <StatCard value="3" label="модератора событий" />
        </div>
      </SlideShell>

      {/* 5 - QR events */}
      <SlideShell
        active={index === 5}
        index={5}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="flex flex-col items-center text-center">
          <Prompt cmd="./scan" />
          <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
            Открой события прямо сейчас
          </h2>
          <div className="anim mt-5 border border-[#222] bg-white p-3 [animation-delay:200ms] sm:mt-6 sm:p-4 2xl:mt-8">
            <img
              src="/speakers/2/events-qr.svg"
              alt="QR: unidoka.com/events"
              className="h-[200px] w-[200px] object-contain sm:h-[240px] sm:w-[240px] md:h-[280px] md:w-[280px] lg:h-[300px] lg:w-[300px] 2xl:h-[360px] 2xl:w-[360px]"
            />
          </div>
          <a
            href={EVENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="anim mt-4 inline-flex items-center gap-2 border border-[#CCFF00] bg-[#CCFF00] px-5 py-3 font-mono text-xs font-medium uppercase tracking-[.14em] text-black transition-all [animation-delay:300ms] hover:bg-transparent hover:text-[#CCFF00] sm:mt-5 sm:px-6 sm:py-3.5 sm:text-sm"
          >
            Открыть на этом устройстве
            <ArrowRight size={14} weight="bold" />
          </a>
        </div>
      </SlideShell>

      {/* 6 - Сообщество */}
      <SlideShell
        active={index === 6}
        index={6}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./community" />
        <h2 className="anim mt-2 break-words text-balance text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
          Сообщество, которое{" "}
          <span className="text-[#CCFF00]">вдохновляет</span>
        </h2>
        <p className="anim mt-3 max-w-[680px] text-sm leading-relaxed text-[#aaa] [animation-delay:200ms] sm:mt-4 sm:text-base md:text-lg lg:text-xl">
          «Вершины» - сообщество, в котором уже:
        </p>
        <div className="anim mt-5 grid grid-cols-2 gap-3 [animation-delay:250ms] sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:gap-5 2xl:mt-8">
          <StatCard value="90" label="человек" />
          <StatCard value="7" label="менторов" />
          <StatCard value="4" label="направления" />
          <StatCard value="100+" label="событий" />
        </div>
      </SlideShell>

      {/* 7 - Присоединяйся */}
      <SlideShell
        active={index === 7}
        index={7}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="flex flex-col items-center text-center">
          <Prompt cmd="./join" />
          <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
            Присоединяйся и к{" "}
            <span className="text-[#CCFF00]">Вершинам</span>
          </h2>
          <img
            src="/speakers/2/VershinyTop_Logotype.svg"
            alt="Вершины"
            className="anim mt-3 h-8 w-auto [animation-delay:180ms] sm:mt-4 sm:h-10 md:h-12"
          />
          <div className="anim mt-5 border border-[#222] bg-white p-3 [animation-delay:220ms] sm:mt-6 sm:p-4">
            <img
              src="/speakers/2/ver-qr.svg"
              alt="QR: unidoka.com/vershiny_top"
              className="h-[180px] w-[180px] object-contain sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] lg:h-[280px] lg:w-[280px] 2xl:h-[320px] 2xl:w-[320px]"
            />
          </div>
          <a
            href={VERSHINY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="anim mt-4 inline-flex items-center gap-2 border border-[#CCFF00] bg-[#CCFF00] px-5 py-3 font-mono text-xs font-medium uppercase tracking-[.14em] text-black transition-all [animation-delay:300ms] hover:bg-transparent hover:text-[#CCFF00] sm:mt-5 sm:px-6 sm:py-3.5 sm:text-sm"
          >
            Группа с участниками Вершин в ТГ
            <ArrowRight size={14} weight="bold" />
          </a>
        </div>
      </SlideShell>

      {/* 8 - Thanks */}
      <ThanksSlide
        active={index === 8}
        index={8}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  );
}
