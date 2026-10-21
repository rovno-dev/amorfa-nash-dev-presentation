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
}

export function SlideShell({
  active,
  index,
  total,
  children,
  onPrev,
  onNext,
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
          "slide-content flex h-full flex-col justify-center px-20 pb-28 pt-16",
          active && "active",
        )}
      >
        {children}
      </div>

      <div className="absolute bottom-14 left-20 z-40 font-mono text-[13px] tracking-[.15em] text-[#888]">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
      <div className="absolute bottom-14 right-20 z-40 flex gap-3">
        <Button
          variant="text"
          size="small"
          onClick={onPrev}
          className="rounded-none border border-[#222] bg-transparent font-mono text-[12px] uppercase tracking-[.14em] text-white after:hidden hover:border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00]"
        >
          <ArrowLeft size={14} weight="bold" />
          Prev
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={onNext}
          className="rounded-none border border-[#222] bg-transparent font-mono text-[12px] uppercase tracking-[.14em] text-white after:hidden hover:border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00]"
        >
          Next
          <ArrowRight size={14} weight="bold" />
        </Button>
      </div>
    </div>
  );
}
