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

// ponytail: metadataBase makes relative URLs (og:image="/nash-dev-cover.webp") resolve
// to absolute. Override via NEXT_PUBLIC_SITE_URL in prod.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rovno.dev").replace(
  /\/$/,
  "",
);
const OG_IMAGE = {
  url: "/nash-dev-cover.webp",
  // ponytail: confirm actual dims of public/nash-dev-cover.webp; 1200×630 is the OG standard.
  width: 1200,
  height: 630,
  alt: "НАШ.DEV — IT и бизнес-конференция для студентов · 23 октября 2026 · МЦК КИТС",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "НАШ.DEV 2026 — Конференция для создателей будущего",
    template: "%s · НАШ.DEV",
  },
  description:
    "IT и бизнес-конференция для студентов. 23 октября 2026 · МЦК КИТС, Казань. Бесплатно, 16+.",
  applicationName: "НАШ.DEV",
  authors: [{ name: "Rovno.dev", url: "https://rovno.dev" }],
  creator: "Rovno.dev",
  publisher: "Rovno.dev",
  category: "technology",
  icons: { icon: "/favicon.ico" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "НАШ.DEV",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={cn(Geist.className, "font-sans")}
      suppressHydrationWarning
    >
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
