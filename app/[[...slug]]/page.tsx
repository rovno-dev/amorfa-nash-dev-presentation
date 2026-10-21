import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpeakersDeck } from "@/app/speakers/deck";
import { SPEAKERS, deckFromSlug } from "@/app/speakers/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deckId = deckFromSlug(slug);
  if (!deckId) return { title: "НАШ.DEV" };
  const s = SPEAKERS[deckId];
  return {
    title: `НАШ.DEV — ${s.name}`,
    description: s.shortBio || "Конференция НАШ.DEV. 23 октября 2026.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const deckId = deckFromSlug(slug);
  if (!deckId) notFound();
  return <SpeakersDeck deckId={deckId} />;
}
