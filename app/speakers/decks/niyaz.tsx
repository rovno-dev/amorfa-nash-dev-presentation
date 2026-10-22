"use client";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS } from "../data";
import { SpeakerHero, TerminalCard, Stat, Prompt, type DeckProps } from "./shared";

export function NiyazDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.niyaz.slideCount;
  return (
    <>
      <SpeakerHero
        id="niyaz"
        active={index === 0}
        index={0}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />
      <SlideShell
        active={index === 1}
        index={1}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <img
          src="/speakers/2/VershinyTop_Logotype.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[55%] object-contain p-24 opacity-20 2xl:block"
          style={{
            maskImage: "linear-gradient(to left, black 30%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 30%, transparent 100%)",
          }}
        />
        <div className="relative max-w-full 2xl:max-w-[68%]">
          <Prompt cmd="./unidoka --events" />
          <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
            Unidoka Events
          </h2>
          <p className="anim mt-2 text-sm leading-relaxed text-[#ccc] [animation-delay:200ms] sm:mt-3 sm:text-base md:text-lg lg:mt-3 lg:text-lg xl:mt-3 xl:text-lg 2xl:mt-5 2xl:text-[22px]">
            Календарь IT и бизнес-событий. Все конференции, форумы, митапы и
            хакатоны в одном месте.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:gap-3 lg:mt-5 lg:gap-3 2xl:mt-8 2xl:gap-4">
            <TerminalCard title="Фильтруй" body="По дате, городу и направлению. Находи то, что действительно важно." delay={250} />
            <TerminalCard title="Добавляй" body="Свои события. Делись с сообществом." delay={300} />
            <TerminalCard title="Не пропускай" body="Подписывайся на обновления и будь в курсе." delay={350} />
          </div>
        </div>
      </SlideShell>
      <SlideShell
        active={index === 2}
        index={2}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="unidoka --stats" />
        <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
          IT-события для своих
        </h2>
        <p className="anim mt-2 text-sm leading-relaxed text-[#ccc] [animation-delay:200ms] sm:mt-3 sm:text-base md:text-lg lg:mt-3 lg:text-lg xl:mt-3 xl:text-lg 2xl:mt-5 2xl:text-[22px]">
          Закрытое IT-сообщество. События, статьи, нетворкинг и проекты.
        </p>
        <div className="anim mt-6 flex flex-wrap gap-6 [animation-delay:250ms] sm:mt-8 sm:gap-10 lg:mt-8 lg:gap-10 2xl:mt-12 2xl:gap-16">
          <Stat num="100+" label="событий в календаре" />
          <Stat num="5 мин" label="на добавление" />
          <Stat num="1" label="место для всех" />
        </div>
      </SlideShell>
      <SlideShell
        active={index === 3}
        index={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./live-demo" />
        <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
          unidoka.com/events — вживую
        </h2>
        <div className="anim mt-4 flex flex-col items-start gap-4 [animation-delay:200ms] sm:mt-6 sm:gap-6 lg:mt-6 lg:gap-6 2xl:mt-8 2xl:flex-row 2xl:gap-12">
          <div className="relative h-[160px] w-[160px] shrink-0 border border-[#222] bg-white p-2 sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] lg:h-[260px] lg:w-[260px] xl:h-[260px] xl:w-[260px] 2xl:h-[380px] 2xl:w-[380px]">
            <img
              src="/speakers/2/events-qr.svg"
              alt="QR: unidoka.com/events"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-full min-w-0 flex-1">
            <div className="flex items-center gap-2 border border-[#222] bg-[#0a0a0a] px-3 py-2 font-mono text-[10px] text-[#888] sm:text-xs">
              <span className="inline-block size-2 rounded-full bg-[#CCFF00]" />
              unidoka.com/events
            </div>
            <div className="h-[200px] w-full overflow-hidden border border-t-0 border-[#222] sm:h-[280px] lg:h-[280px] 2xl:h-[340px]">
              <iframe
                src="https://unidoka.com/events"
                title="Unidoka Events"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-3 font-mono text-xs text-[#666] sm:mt-4 sm:text-sm">
              // отсканируй QR или открой на своём устройстве прямо сейчас
            </p>
          </div>
        </div>
      </SlideShell>
    </>
  );
}
