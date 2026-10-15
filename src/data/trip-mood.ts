export type MoodId = "temples" | "nile" | "desert" | "beach" | "family" | "luxury";

export type MoodAnswer = {
  id: string;
  label: string;
  scores: Partial<Record<MoodId, number>>;
};

export type MoodQuestion = {
  id: string;
  prompt: string;
  answers: MoodAnswer[];
};

export const moodQuestions: MoodQuestion[] = [
  {
    id: "pace",
    prompt: "How should the days feel?",
    answers: [
      {
        id: "slow",
        label: "Unhurried mornings, soft evenings",
        scores: { nile: 2, beach: 2, luxury: 1 },
      },
      {
        id: "balanced",
        label: "One great highlight, then breathe",
        scores: { temples: 2, nile: 1, family: 1 },
      },
      {
        id: "full",
        label: "Pack the classics while we’re here",
        scores: { temples: 3, desert: 1 },
      },
    ],
  },
  {
    id: "light",
    prompt: "Which light pulls you in?",
    answers: [
      {
        id: "stone",
        label: "Warm stone and temple shadows",
        scores: { temples: 3 },
      },
      {
        id: "river",
        label: "River gold between cabin nights",
        scores: { nile: 3 },
      },
      {
        id: "sky",
        label: "Wide desert sky after dark",
        scores: { desert: 3 },
      },
      {
        id: "sea",
        label: "Blue water after the temples",
        scores: { beach: 3 },
      },
    ],
  },
  {
    id: "who",
    prompt: "Who are you traveling with?",
    answers: [
      {
        id: "couple",
        label: "Couple / friends — private and flexible",
        scores: { luxury: 1, nile: 1, temples: 1 },
      },
      {
        id: "family",
        label: "Family — softer walking, clearer pacing",
        scores: { family: 3, beach: 1 },
      },
      {
        id: "solo",
        label: "Solo or two — story over checklist",
        scores: { temples: 1, desert: 1, luxury: 1 },
      },
    ],
  },
  {
    id: "finish",
    prompt: "How should the trip close?",
    answers: [
      {
        id: "temple",
        label: "On a temple terrace at golden hour",
        scores: { temples: 2, nile: 1 },
      },
      {
        id: "deck",
        label: "On a Nile deck with nowhere else to be",
        scores: { nile: 3, luxury: 1 },
      },
      {
        id: "camp",
        label: "Under chalk formations and stars",
        scores: { desert: 3 },
      },
      {
        id: "reef",
        label: "With salt water and zero alarms",
        scores: { beach: 3, family: 1 },
      },
    ],
  },
];

export const moodResults: Record<
  MoodId,
  {
    title: string;
    blurb: string;
    href: string;
    cta: string;
    tourSlug?: string;
  }
> = {
  temples: {
    title: "Temple-first classic",
    blurb:
      "Giza light, Luxor’s West Bank, and paced museum days — culture as the main character.",
    href: "/tours?category=packages",
    cta: "See classic packages",
    tourSlug: "classic-egypt-8-days",
  },
  nile: {
    title: "River-night rhythm",
    blurb:
      "Cabin evenings between temples. Direction and length matched to your flights and hotel brief.",
    href: "/nile-cruises",
    cta: "Explore Nile cruises",
    tourSlug: "nile-cruise-luxor-aswan-5-days",
  },
  desert: {
    title: "Desert-sky chapter",
    blurb:
      "White Desert formations, quieter nights, and a contrast day after the cities.",
    href: "/tours?category=desert",
    cta: "Browse desert days",
    tourSlug: "white-desert-camping-2-days",
  },
  beach: {
    title: "Temple + recovery blue",
    blurb:
      "Protect the great sites, then hand the ending to Red Sea water and sleep.",
    href: "/tours?category=red-sea",
    cta: "See Red Sea add-ons",
    tourSlug: "pyramids-nile-hurghada-12-days",
  },
  family: {
    title: "Family-soft pacing",
    blurb:
      "Fewer hotel changes, clearer rests, and private guiding that flexes with the kids.",
    href: "/tailor-made",
    cta: "Build a family route",
    tourSlug: "classic-egypt-8-days",
  },
  luxury: {
    title: "Quiet luxury polish",
    blurb:
      "Higher cabin/hotel feel, private transfers, and a written plan that protects downtime.",
    href: "/customize",
    cta: "Request a polished brief",
    tourSlug: "tailor-made-private-egypt",
  },
};

export function scoreMood(answers: Record<string, string>): MoodId {
  const totals: Record<MoodId, number> = {
    temples: 0,
    nile: 0,
    desert: 0,
    beach: 0,
    family: 0,
    luxury: 0,
  };

  for (const question of moodQuestions) {
    const answerId = answers[question.id];
    const answer = question.answers.find((item) => item.id === answerId);
    if (!answer) continue;
    for (const [mood, value] of Object.entries(answer.scores)) {
      totals[mood as MoodId] += value ?? 0;
    }
  }

  return (Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "temples") as MoodId;
}
