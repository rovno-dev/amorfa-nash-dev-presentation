"use client";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS } from "../data";
import type { DeckProps } from "./shared";

export function SingersDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.singers.slideCount;
  const isActive = index === 0;

  return (
    <SlideShell
      active={isActive}
      index={0}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
      bleed
    >
      <div
        className="relative h-full w-full overflow-hidden bg-black"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Animated gradient backdrop - visible if video fails to load */}
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(120,140,200,0.25), transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(180,120,200,0.2), transparent 55%), #05050a",
          }}
        />
        <video
          key={`clouds-${isActive ? "on" : "off"}`}
          src="/clouds.webm"
          width="100%"
          height="100%"
          className="absolute inset-0 z-10 h-full w-full object-cover"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          onLoadedData={() => {
            if (typeof window !== "undefined") {
              // eslint-disable-next-line no-console
              console.info("[SingersDeck] video loaded");
            }
          }}
          onError={(e) => {
            if (typeof window !== "undefined") {
              // eslint-disable-next-line no-console
              console.error(
                "[SingersDeck] video error:",
                (e.currentTarget as HTMLVideoElement).error,
              );
            }
          }}
        />
        {/* Vignette overlay for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>
    </SlideShell>
  );
}
