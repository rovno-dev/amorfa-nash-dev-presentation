export type DeckId =
  | "event"
  | "amir"
  | "niyaz"
  | "anastasia"
  | "mikhail"
  | "contest";

export const DECK_ORDER: DeckId[] = [
  "event",
  "amir",
  "niyaz",
  "anastasia",
  "mikhail",
  "contest",
];

export const SPEAKER_SLUGS: Record<DeckId, string> = {
  event: "",
  amir: "amir",
  niyaz: "niyazgim",
  anastasia: "anastasia",
  mikhail: "rovno",
  contest: "contest",
};

export function slugForDeck(id: DeckId): string {
  const s = SPEAKER_SLUGS[id];
  return s === "" ? "/" : "/" + s;
}

export function deckFromSlug(slug: string[] | undefined): DeckId | null {
  if (!slug || slug.length === 0) return "event";
  const path = slug.join("/");
  const entries = Object.entries(SPEAKER_SLUGS) as Array<[DeckId, string]>;
  for (const [id, s] of entries) {
    if (s === path) return id;
  }
  return null;
}

export interface Speaker {
  id: DeckId;
  num: string;
  name: string;
  subtitle: string;
  shortBio: string;
  photos: string[];
  slideCount: number;
}

export const SPEAKERS: Record<DeckId, Speaker> = {
  event: {
    id: "event",
    num: "00",
    name: "Событие",
    subtitle: "// конференция для создателей будущего",
    shortBio: "",
    photos: [],
    slideCount: 1,
  },
  amir: {
    id: "amir",
    num: "01",
    name: "Амир Бадрутдинов",
    subtitle: "// Самый молодой спикер // Волонтёрство & Медиа",
    shortBio:
      "В 16 лет случайно стал волонтёром, с детства хотел стать блогером, а теперь ещё и рассказывает об этом со сцены.",
    photos: ["/speakers/1/speaker-amir.png"],
    slideCount: 4,
  },
  niyaz: {
    id: "niyaz",
    num: "02",
    name: "Нияз Гимадиев",
    subtitle: "// CTO Rovno.dev // Founder Unidoka",
    shortBio:
      "Сделал этот сайт за 5 минут, а с текстовкой возился 1 час. Показывает календарь событий и как всё успеть.",
    photos: ["/speakers/2/speaker-niyaz.png"],
    slideCount: 4,
  },
  anastasia: {
    id: "anastasia",
    num: "03",
    name: "Анастасия Пугачёва",
    subtitle: "// CEO Визионикс // UX & Когнитивистика",
    shortBio:
      "6 лет в веб-дизайне. Исследует, как когнитивная психология и поведенческие паттерны влияют на конверсию сайтов.",
    photos: ["/speakers/3/speaker-anastasia.png"],
    slideCount: 8,
  },
  mikhail: {
    id: "mikhail",
    num: "04",
    name: "Михаил и Данил",
    subtitle: "// CMO & Арт-директор Rovno.dev",
    shortBio:
      "Сделали большую часть работы по организации мероприятия и весь 3D-дизайн.",
    photos: [
      "/speakers/4/speaker-mikhail.png",
      "/speakers/4/speaker-danil.png",
    ],
    slideCount: 5,
  },
  contest: {
    id: "contest",
    num: "05",
    name: "Розыгрыш",
    subtitle: "// Яндекс Станция Лайт",
    shortBio: "",
    photos: [],
    slideCount: 1,
  },
};
