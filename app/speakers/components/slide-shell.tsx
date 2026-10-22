"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface Props {
  active: boolean;
  index: number;
  total: number;
  children: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  bleed?: boolean;
}

export function SlideShell({
  active,
  index,
  total,
  children,
  onPrev,
  onNext,
  bleed = false,
}: Props) {
  return (
    <div
      aria-hidden={!active}
      className={cn(
        "absolute inset-0 transition-opacity duration-300",
        active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        className={cn(
          "slide-content flex h-full flex-col",
          !bleed &&
            "justify-center overflow-y-auto px-4 pb-24 pt-20 sm:px-6 sm:pt-20 md:px-8 lg:px-12 xl:px-12 2xl:px-20",
          bleed && "overflow-hidden",
          active && "active",
        )}
      >
        {children}
      </div>
      <div className="absolute bottom-6 left-4 z-40 font-mono text-[11px] tracking-[.15em] text-[#888] sm:bottom-10 sm:left-6 sm:text-[13px] md:left-8 lg:left-12 xl:left-12 2xl:left-20">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
      <div className="absolute bottom-6 right-4 z-40 flex gap-2 sm:bottom-10 sm:right-6 sm:gap-3 md:right-8 lg:right-12 xl:right-12 2xl:right-20">
        <Button
          variant="text"
          size="small"
          onClick={onPrev}
          className="rounded-none border border-[#222] bg-transparent font-mono text-[11px] uppercase tracking-[.14em] text-white after:hidden hover:border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00] sm:text-[12px]"
        >
          <ArrowLeft size={12} weight="bold" />
          Prev
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={onNext}
          className="rounded-none border border-[#222] bg-transparent font-mono text-[11px] uppercase tracking-[.14em] text-white after:hidden hover:border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00] sm:text-[12px]"
        >
          Next
          <ArrowRight size={12} weight="bold" />
        </Button>
      </div>
    </div>
  );
}
