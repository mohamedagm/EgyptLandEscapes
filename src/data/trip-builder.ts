export type BuilderChapter = {
  id: string;
  name: string;
  short: string;
  blurb: string;
  suggestedNights: number;
  tone: "city" | "river" | "desert" | "sea" | "flex";
};

export const builderChapters: BuilderChapter[] = [
  {
    id: "cairo",
    name: "Cairo & Giza",
    short: "Cairo",
    blurb: "Pyramids, museums, old city pulse",
    suggestedNights: 2,
    tone: "city",
  },
  {
    id: "alexandria",
    name: "Alexandria",
    short: "Alex",
    blurb: "Mediterranean day from Cairo",
    suggestedNights: 1,
    tone: "city",
  },
  {
    id: "luxor",
    name: "Luxor",
    short: "Luxor",
    blurb: "East & West Bank temples",
    suggestedNights: 2,
    tone: "city",
  },
  {
    id: "nile-cruise",
    name: "Nile cruise",
    short: "Nile",
    blurb: "Cabin nights Luxor ↔ Aswan",
    suggestedNights: 3,
    tone: "river",
  },
  {
    id: "aswan",
    name: "Aswan",
    short: "Aswan",
    blurb: "Philae, Nubian light, soft river",
    suggestedNights: 2,
    tone: "city",
  },
  {
    id: "abu-simbel",
    name: "Abu Simbel",
    short: "Abu Simbel",
    blurb: "Day trip from Aswan",
    suggestedNights: 1,
    tone: "city",
  },
  {
    id: "white-desert",
    name: "White Desert",
    short: "Desert",
    blurb: "Camping under chalk formations",
    suggestedNights: 1,
    tone: "desert",
  },
  {
    id: "hurghada",
    name: "Hurghada",
    short: "Hurghada",
    blurb: "Red Sea recovery days",
    suggestedNights: 3,
    tone: "sea",
  },
  {
    id: "sharm",
    name: "Sharm El Sheikh",
    short: "Sharm",
    blurb: "South Sinai reefs & rest",
    suggestedNights: 3,
    tone: "sea",
  },
  {
    id: "free-day",
    name: "Free / soft day",
    short: "Free",
    blurb: "Hotel rest, spa, or unscheduled",
    suggestedNights: 1,
    tone: "flex",
  },
];

export type BuilderPreset = {
  id: string;
  label: string;
  description: string;
  days: string[];
};

export const builderPresets: BuilderPreset[] = [
  {
    id: "classic-8",
    label: "Classic 8 days",
    description: "Cairo → Nile → Luxor close",
    days: [
      "cairo",
      "cairo",
      "nile-cruise",
      "nile-cruise",
      "nile-cruise",
      "nile-cruise",
      "luxor",
      "luxor",
    ],
  },
  {
    id: "culture-beach-12",
    label: "Culture + beach 12",
    description: "Temples, river, then Hurghada",
    days: [
      "cairo",
      "cairo",
      "nile-cruise",
      "nile-cruise",
      "nile-cruise",
      "nile-cruise",
      "aswan",
      "hurghada",
      "hurghada",
      "hurghada",
      "hurghada",
      "free-day",
    ],
  },
  {
    id: "desert-accent",
    label: "Desert accent 7",
    description: "Cairo, desert night, Luxor",
    days: [
      "cairo",
      "cairo",
      "white-desert",
      "cairo",
      "luxor",
      "luxor",
      "free-day",
    ],
  },
];

export function getBuilderChapter(id: string) {
  return builderChapters.find((item) => item.id === id);
}

export function summarizeRoute(dayChapterIds: Array<string | null>) {
  const filled = dayChapterIds.filter(Boolean) as string[];
  const counts = new Map<string, number>();
  for (const id of filled) {
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return [...counts.entries()].map(([id, nights]) => {
    const chapter = getBuilderChapter(id);
    return {
      id,
      name: chapter?.name ?? id,
      nights,
    };
  });
}

export function buildTripWhatsAppMessage(
  dayChapterIds: Array<string | null>,
  notes?: string,
) {
  const summary = summarizeRoute(dayChapterIds);
  const lines = [
    "Hello Egypt Land Escapes — I built a private route in the trip builder.",
    "",
    `Total days: ${dayChapterIds.length}`,
    `Filled days: ${dayChapterIds.filter(Boolean).length}`,
    "",
    "Day-by-day:",
    ...dayChapterIds.map((id, index) => {
      const chapter = id ? getBuilderChapter(id) : null;
      return `Day ${index + 1}: ${chapter?.name ?? "Open / undecided"}`;
    }),
    "",
    "Summary:",
    ...summary.map((item) => `• ${item.name}: ${item.nights} day(s)`),
  ];
  if (notes?.trim()) {
    lines.push("", `Notes: ${notes.trim()}`);
  }
  lines.push("", "Please send a written private proposal.");
  return lines.join("\n");
}
