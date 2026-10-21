"use client";

import Link from "next/link";
import Logo from "@/components/layout/logo/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";

export default function Header() {
  return (
    <header className="border-b border-(--outline) bg-(--bg)">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" aria-label="Home">
          <Logo className="!h-8" />
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
