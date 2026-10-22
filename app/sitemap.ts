import type { MetadataRoute } from "next";
import { DECK_ORDER, slugForDeck } from "@/app/speakers/data";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rovno.dev").replace(
  /\/$/,
  "",
);

export default function sitemap(): MetadataRoute.Sitemap {
  return DECK_ORDER.map((id) => ({
    url: `${SITE_URL}${slugForDeck(id)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: id === "event" ? 1 : 0.8,
  }));
}
