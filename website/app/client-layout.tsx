"use client";

import "./globals.css";
import Header from "@/components/layout/nav/header";
import { Toaster } from "@/components/ui/sonner";

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster position="bottom-right" closeButton gap={8} visibleToasts={3} />
    </>
  );
}
