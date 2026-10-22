import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpeakersDeck } from "@/app/speakers/deck";
import {
  SPEAKERS,
  deckFromSlug,
  slugForDeck,
  type DeckId,
} from "@/app/speakers/data";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rovno.dev").replace(
  /\/$/,
  "",
);

const OG_IMAGE_PATH = "/nash-dev-cover.webp";
const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "НАШ.DEV - IT и бизнес-конференция для студентов · 23 октября 2026 · МЦК КИТС",
};

const DESCRIPTION_BY_DECK: Record<DeckId, string> = {
  event:
    "IT и бизнес-конференция для студентов. 23 октября 2026 · МЦК КИТС, Казань. Бесплатно, 16+.",
  amir:
    SPEAKERS.amir.shortBio ||
    "Амир Бадрутдинов - волонтёрство и медиа. НАШ.DEV 2026.",
  niyaz:
    SPEAKERS.niyaz.shortBio ||
    "Нияз Гимадиев - CTO Rovno.dev, Founder Unidoka. НАШ.DEV 2026.",
  anastasia:
    SPEAKERS.anastasia.shortBio ||
    "Анастасия Пугачёва - UX и когнитивистика. НАШ.DEV 2026.",
  mikhail:
    SPEAKERS.mikhail.shortBio ||
    "Михаил и Данил - CMO и арт-директор Rovno.dev. НАШ.DEV 2026.",
  contest:
    "Розыгрыш Яндекс Станции Лайт на конференции НАШ.DEV - за лучший вопрос спикеру.",
  singers:
    "Сцена — видео-фон и облака между докладами. НАШ.DEV 2026.",
  break:
    "Перерыв на конференции НАШ.DEV — 10 минут, кофе и нетворкинг.",
  thanks:
    "Спасибо за НАШ.DEV 2026! Результаты и реплеи — в Telegram-канале @rovno.dev.",
};

const KEYWORDS_BASE = [
  "НАШ.DEV",
  "наш дэв",
  "конференция",
  "IT конференция",
  "бизнес конференция",
  "студенческая конференция",
  "Казань",
  "МЦК КИТС",
  "Rovno.dev",
  "Unidoka",
  "23 октября 2026",
  "бесплатно",
];

const EVENT_LOCATION = {
  "@type": "Place" as const,
  name: "МЦК КИТС",
  address: {
    "@type": "PostalAddress" as const,
    addressLocality: "Казань",
    addressCountry: "RU",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deckId = deckFromSlug(slug);

  if (!deckId) {
    return {
      title: "Страница не найдена",
      robots: { index: false, follow: false },
    };
  }

  const s = SPEAKERS[deckId];
  const path = slugForDeck(deckId);
  const canonical = `${SITE_URL}${path}`;

  const title =
    deckId === "event"
      ? "НАШ.DEV - Конференция для создателей будущего"
      : `${s.name} - НАШ.DEV 2026`;
  const description = DESCRIPTION_BY_DECK[deckId];

  return {
    title: { absolute: title },
    description,
    keywords: deckId === "event" ? KEYWORDS_BASE : [...KEYWORDS_BASE, s.name],
    alternates: {
      canonical,
      languages: { "ru-RU": canonical },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "НАШ.DEV",
      locale: "ru_RU",
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: OG_IMAGE_PATH, alt: OG_IMAGE.alt }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
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

  const s = SPEAKERS[deckId];
  const canonical = `${SITE_URL}${slugForDeck(deckId)}`;

  // ponytail: JSON-LD per deck. Event on root, Person on speaker decks.
  // Contest is a prize inside the event → falls back to the event schema.
  const jsonLd =
    deckId === "event" || deckId === "contest"
      ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "НАШ.DEV 2026",
        startDate: "2026-10-23",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode:
          "https://schema.org/OfflineEventAttendanceMode",
        location: EVENT_LOCATION,
        image: [`${SITE_URL}${OG_IMAGE_PATH}`],
        description: DESCRIPTION_BY_DECK.event,
        url: canonical,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
          url: canonical,
        },
        organizer: {
          "@type": "Organization",
          name: "Rovno.dev",
          url: "https://rovno.dev",
        },
      }
      : {
        "@context": "https://schema.org",
        "@type": "Person",
        name: s.name,
        jobTitle: s.subtitle
          .replace(/^\/\/\s*/, "")
          .replace(/\s*\/\/\s*/g, " · "),
        description: s.shortBio || undefined,
        image: s.photos.map((p) => `${SITE_URL}${p}`),
        url: canonical,
        mainEntityOfPage: canonical,
      };

  return (
    <>
      <script
        type="application/ld+json"
        // ponytail: static, trusted data - no XSS surface.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpeakersDeck deckId={deckId} />
    </>
  );
}
