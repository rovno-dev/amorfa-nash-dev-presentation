"use client";
import Link from "next/link";
import Logo from "@/components/layout/logo/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";

export default function Header() {
  return (
    <header className="border-b border-(--outline) bg-(--bg)">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" aria-label="Home" className="flex items-center gap-2">
            <Logo className="!h-8" />
            <span className="font-mono text-sm font-medium text-(--on-bg-high)">/2026</span>
          </Link>
          <div className="hidden items-center gap-3 sm:flex lg:gap-4">
            <a
              href="https://rovno.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rovno.dev"
              className="opacity-20 transition-opacity hover:opacity-60"
            >
              <img src="/rd-logo.svg" alt="Rovno.dev" className="h-5 w-auto" />
            </a>
            <a
              href="https://unidoka.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Unidoka"
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              <img src="/unidoka-logo.svg" alt="Unidoka" className="h-5 w-auto" />
            </a>
            <a
              href="https://unidoka.com/vershiny_top"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Вершины Топ"
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              <img src="/speakers/2/VershinyTop_Logotype.svg" alt="Вершины" className="h-5 w-auto" />
            </a>
          </div>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
