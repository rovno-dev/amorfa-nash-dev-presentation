"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DECK_ORDER, SPEAKERS, slugForDeck, type DeckId } from "./data";
import { EventDeck } from "./event-deck";
import { ContestDeck } from "./contest-deck";
import {
  AmirDeck,
  NiyazDeck,
  BreakDeck,
  AnastasiaDeck,
  MikDanDeck,
  SingersDeck,
  ThanksDeck,
} from "./decks";
import { Marquee } from "./components/marquee";

export function SpeakersDeck({ deckId }: { deckId: DeckId }) {
  return (
    <Suspense fallback={<div className="fixed inset-0 z-[100] bg-black" />}>
      <DeckInner deckId={deckId} />
    </Suspense>
  );
}

function DeckInner({ deckId }: { deckId: DeckId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slideIndex, setSlideIndex] = useState(() => {
    return searchParams.get("slide") === "last"
      ? Math.max(0, SPEAKERS[deckId].slideCount - 1)
      : 0;
  });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("slide")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [searchParams]);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const init =
      sp.get("slide") === "last"
        ? Math.max(0, SPEAKERS[deckId].slideCount - 1)
        : 0;
    setSlideIndex(init);
    setMobileOpen(false);
  }, [deckId]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1280) {
      setCollapsed(true);
    }
  }, []);

  const goToDeck = useCallback(
    (id: DeckId) => {
      router.push(slugForDeck(id));
    },
    [router],
  );

  const changeSlide = useCallback(
    (dir: 1 | -1) => {
      const total = SPEAKERS[deckId].slideCount;
      const newIdx = slideIndex + dir;
      if (newIdx >= 0 && newIdx < total) {
        setSlideIndex(newIdx);
      } else if (dir === 1) {
        const cur = DECK_ORDER.indexOf(deckId);
        const next = DECK_ORDER[(cur + 1) % DECK_ORDER.length];
        router.push(slugForDeck(next));
      } else {
        const cur = DECK_ORDER.indexOf(deckId);
        const prev =
          DECK_ORDER[(cur - 1 + DECK_ORDER.length) % DECK_ORDER.length];
        router.push(slugForDeck(prev) + "?slide=last");
      }
    },
    [deckId, slideIndex, router],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName || "";
      if (["INPUT", "TEXTAREA"].includes(tag)) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        changeSlide(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        changeSlide(-1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [changeSlide]);

  useEffect(() => {
    let sx = 0;
    let sy = 0;
    const onStart = (e: TouchEvent) => {
      sx = e.changedTouches[0].screenX;
      sy = e.changedTouches[0].screenY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = sx - e.changedTouches[0].screenX;
      const dy = sy - e.changedTouches[0].screenY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        changeSlide(dx > 0 ? 1 : -1);
      }
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [changeSlide]);

  const nav = {
    onPrev: () => changeSlide(-1),
    onNext: () => changeSlide(1),
  };
  const total = SPEAKERS[deckId].slideCount;

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden bg-black font-sans text-white">
      <style>{`
@keyframes blink { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
@keyframes nashMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@keyframes slideUp { to { opacity: 1; transform: translateY(0) } }
@keyframes gridDrift { from { background-position: 0 0 } to { background-position: 64px 64px } }
.slide-content > .anim { opacity: 0; transform: translateY(20px); }
.slide-content.active > .anim {
animation: slideUp .7s cubic-bezier(.16,1,.3,1) forwards;
}
`}</style>

      {/* Mobile / tablet menu toggle (visible until sidebar appears at xl) */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Открыть меню"
        className="absolute left-3 top-3 z-40 flex h-10 w-10 items-center justify-center border border-[#222] bg-black/80 font-mono text-lg text-white backdrop-blur xl:hidden"
      >
        ≡
      </button>

      {/* Desktop sidebar - only xl+ */}
      <aside
        className={cn(
          "relative z-20 hidden shrink-0 flex-col border-r border-[#222] bg-black transition-[width] duration-500 ease-[cubic-bezier(.16,1,.3,1)] xl:flex",
          collapsed ? "w-[76px]" : "w-[280px] 2xl:w-[400px]",
        )}
      >
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Развернуть" : "Свернуть"}
          className={cn(
            "absolute z-30 flex items-center justify-center border border-[#222] bg-transparent font-mono text-white transition-all hover:border-[#CCFF00] hover:text-[#CCFF00]",
            collapsed
              ? "left-1/2 top-5 h-10 w-10 -translate-x-1/2 text-lg"
              : "right-7 top-7 h-9 w-9 text-base",
          )}
        >
          {collapsed ? "≡" : "×"}
        </button>
        <div
          className={cn(
            "flex h-full flex-col overflow-y-auto px-6 pb-6 pt-8 2xl:px-8",
            collapsed ? "pointer-events-none opacity-0" : "opacity-100 delay-100",
          )}
        >
          <div className="mb-8 flex items-center gap-2 pr-12">
            <img src="/nash-dev-logo.svg" alt="Наш.дев" className="h-9" />
            <span className="font-mono text-xs text-[#CCFF00]">/2026</span>
          </div>
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.22em] text-[#CCFF00] 2xl:text-xs">
            <span className="font-medium">$</span>
            <span>deck --list</span>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {DECK_ORDER.map((id) => {
              const s = SPEAKERS[id];
              const active = id === deckId;
              return (
                <Button
                  key={id}
                  variant="text"
                  size="small"
                  onClick={() => goToDeck(id)}
                  className={cn(
                    "h-auto w-full justify-start gap-2 rounded-none border px-3 py-2.5 font-mono text-xs transition-all after:hidden hover:bg-transparent 2xl:gap-3 2xl:px-4 2xl:py-3 2xl:text-sm",
                    active
                      ? "border-[#CCFF00] bg-[#0a0a0a] text-white"
                      : "border-transparent text-[#888] hover:border-[#222] hover:text-white",
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0 text-[10px] tracking-[.1em]",
                      active ? "text-[#CCFF00]" : "text-[#555]",
                    )}
                  >
                    [{s.num}]
                  </span>
                  <span className="min-w-0 truncate">{s.name}</span>
                  {active && (
                    <span className="ml-auto shrink-0 animate-[blink_1s_steps(1)_infinite] font-mono text-[#CCFF00]">
                      {">"}
                    </span>
                  )}
                </Button>
              );
            })}
          </nav>
          <div className="mt-6 border-t border-[#222] pt-5 font-mono text-[10px] leading-relaxed 2xl:text-[11px]">
            <div className="flex gap-2 text-[#666]">
              <span className="text-[#CCFF00]">$</span>
              <span>date</span>
            </div>
            <div className="mb-3 text-white">23 окт 2026 · МЦК КИТС</div>
            <div className="flex gap-2 text-[#666]">
              <span className="text-[#CCFF00]">$</span>
              <span>status</span>
            </div>
            <div className="text-[#CCFF00]">регистрация открыта_</div>
          </div>
        </div>
      </aside>

      {/* Drawer - for all viewports below xl */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto border-r border-[#222] bg-black p-5">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Закрыть меню"
              className="mb-6 flex h-9 w-9 shrink-0 items-center justify-center border border-[#222] font-mono text-base text-white"
            >
              ×
            </button>
            <div className="mb-6 flex shrink-0 items-center gap-2">
              <img src="/nash-dev-logo.svg" alt="Наш.дев" className="h-8" />
              <span className="font-mono text-xs text-[#CCFF00]">/2026</span>
            </div>
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.22em] text-[#CCFF00]">
              <span className="font-medium">$</span>
              <span>deck --list</span>
            </div>
            <nav className="flex flex-1 flex-col gap-1">
              {DECK_ORDER.map((id) => {
                const s = SPEAKERS[id];
                const active = id === deckId;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      goToDeck(id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "flex h-auto w-full items-center gap-3 border px-3 py-2.5 text-left font-mono text-xs transition-all",
                      active
                        ? "border-[#CCFF00] bg-[#0a0a0a] text-white"
                        : "border-transparent text-[#888] hover:border-[#222] hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0 text-[10px] tracking-[.1em]",
                        active ? "text-[#CCFF00]" : "text-[#555]",
                      )}
                    >
                      [{s.num}]
                    </span>
                    <span className="min-w-0 truncate">{s.name}</span>
                  </button>
                );
              })}
            </nav>
            <div className="mt-6 border-t border-[#222] pt-5 font-mono text-[11px] leading-relaxed">
              <div className="flex gap-2 text-[#666]">
                <span className="text-[#CCFF00]">$</span>
                <span>date</span>
              </div>
              <div className="mb-3 text-white">23 окт 2026 · МЦК КИТС</div>
              <div className="flex gap-2 text-[#666]">
                <span className="text-[#CCFF00]">$</span>
                <span>status</span>
              </div>
              <div className="text-[#CCFF00]">регистрация открыта_</div>
            </div>
          </div>
        </div>
      )}

      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(204,255,0,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,.018)_1px,transparent_1px)] bg-[size:64px_64px] [animation:gridDrift_60s_linear_infinite]" />
        <div className="relative z-10 h-full">
          {deckId === "event" && <EventDeck index={slideIndex} {...nav} />}
          {deckId === "amir" && <AmirDeck index={slideIndex} total={total} {...nav} />}
          {deckId === "niyaz" && <NiyazDeck index={slideIndex} total={total} {...nav} />}
          {deckId === "break" && <BreakDeck index={slideIndex} total={total} {...nav} />}
          {deckId === "anastasia" && <AnastasiaDeck index={slideIndex} total={total} {...nav} />}
          {deckId === "mikhail" && <MikDanDeck index={slideIndex} total={total} {...nav} />}
          {deckId === "singers" && <SingersDeck index={slideIndex} total={total} {...nav} />}
          {deckId === "thanks" && <ThanksDeck index={slideIndex} total={total} {...nav} />}
          {deckId === "contest" && <ContestDeck index={slideIndex} {...nav} />}
        </div>
        <Marquee />
      </main>
    </div>
  );
}
