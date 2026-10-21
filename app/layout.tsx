import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ClientRootLayout from "./client-layout";

export const Geist = localFont({
  src: "../public/fonts/Geist-VariableFont_wght.woff2",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Amorfa app",
  description: "Amorfa application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(Geist.className, "font-sans")} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <ClientRootLayout>{children}</ClientRootLayout>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
