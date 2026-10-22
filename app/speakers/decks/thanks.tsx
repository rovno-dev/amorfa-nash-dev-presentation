"use client";
import { SPEAKERS } from "../data";
import { ThanksSlide, type DeckProps } from "./shared";

export function ThanksDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.thanks.slideCount;
  return (
    <ThanksSlide
      variant="final"
      active={index === 0}
      index={0}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
    />
  );
}
