export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "first-time-egypt-itinerary",
    title: "How to pace a first Egypt journey without rushing the temples",
    excerpt:
      "A calm framework for Cairo, Luxor, Aswan, and optional Nile nights — so your first visit feels composed, not crowded.",
    category: "Planning",
    readTime: "6 min",
    date: "July 2026",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
    content: [
      "Most first-time visitors try to collect too many cities in too few days. The result is early alarms, long transfers, and temples that blur together.",
      "A stronger private route usually protects three things: one unhurried Giza morning, enough Upper Egypt time for Karnak and the West Bank, and at least one soft evening that is not spent packing again.",
      "If you have 8–10 days, Cairo plus a Nile cruise segment is often the cleanest classic arc. If you have 11–15 days, add Red Sea recovery or Alexandria without compressing the temple chapters.",
      "Share your month, walking comfort, and hotel style — we reshape any published itinerary into a written private proposal before anything is locked.",
    ],
  },
  {
    slug: "nile-cruise-luxor-or-aswan",
    title: "Luxor to Aswan or Aswan to Luxor — which Nile direction fits you?",
    excerpt:
      "Both sailings visit the great temples. The difference is embarkation logistics, flight connections, and how you want the journey to open and close.",
    category: "Nile cruise",
    readTime: "5 min",
    date: "July 2026",
    image:
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=80",
    content: [
      "A Nile cruise is not only a cabin — it is a rhythm of temple mornings and river evenings between Luxor and Aswan.",
      "Luxor embarkation suits travelers who want the West Bank and Karnak early in the story. Aswan embarkation can feel softer if you arrive from Abu Simbel or prefer Philae as an opening note.",
      "Cabin category, sailing dates, and whether you want a short 3–4 night cruise or a longer river chapter all change the final quote.",
      "Tell us your flights and preferred hotel level. We match direction, nights, and sightseeing so the river feels intentional.",
    ],
  },
  {
    slug: "best-time-to-visit-egypt",
    title: "Best time to visit Egypt for private touring",
    excerpt:
      "Prime season light, quieter warm months, and festive weeks each ask for a different pacing strategy.",
    category: "Seasons",
    readTime: "4 min",
    date: "June 2026",
    image:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=80",
    content: [
      "October to April is the classic window for long outdoor temple days and comfortable Nile mornings.",
      "May to September can still be beautiful with earlier starts, shaded museum time, and Red Sea recovery days after Upper Egypt.",
      "December and January bring festive demand — cruise cabins and beach hotels should be discussed earlier so the plan stays calm.",
      "The best month is the one you actually have. We design around heat, crowds, and your walking comfort rather than forcing a single calendar.",
    ],
  },
  {
    slug: "white-desert-vs-red-sea",
    title: "White Desert night or Red Sea recovery — which soft chapter do you need?",
    excerpt:
      "After Giza and the temples, some travelers want surreal chalk formations. Others need salt water and slow mornings.",
    category: "Add-ons",
    readTime: "5 min",
    date: "June 2026",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
    content: [
      "A White Desert camp gives you silence, strange geology, and a night under open sky — ideal if adventure and atmosphere matter more than spa recovery.",
      "Hurghada or Sharm El Sheikh gives reef color, boat days, and soft hotel mornings after intensive culture.",
      "Families often prefer beach recovery. Couples sometimes split the difference with a short desert chapter and a few Red Sea nights.",
      "Both can sit cleanly after a Nile cruise. Tell us which feeling you want after the temples — we place the soft chapter where the trip can breathe.",
    ],
  },
  {
    slug: "private-guide-vs-group-tour",
    title: "Why private guiding changes the feeling of Egypt",
    excerpt:
      "Same monuments. Completely different day — when the vehicle, language, and pace belong to you.",
    category: "Private travel",
    readTime: "4 min",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80",
    content: [
      "Group bus days optimize for schedule density. Private days optimize for attention — photo stops, rest, and the questions you actually want to ask.",
      "With a private Egyptologist, you can linger at a viewpoint, skip a crowded alley, or rearrange a museum hour when energy drops.",
      "Nile cruises still share the vessel, but your embarkation, transfers, and land touring can remain privately held.",
      "If you are traveling with children, seniors, or mixed interests, private pacing is usually the difference between endurance and enjoyment.",
    ],
  },
  {
    slug: "what-to-pack-egypt-tour",
    title: "What to pack for a private Egypt tour",
    excerpt:
      "Light layers, modest temple clothing, desert night warmth, and the small comforts that keep long days elegant.",
    category: "Practical",
    readTime: "3 min",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
    content: [
      "Pack for sun and air-conditioning in the same day: breathable layers, a light scarf, and shoes you can walk in for hours.",
      "Temple visits ask for comfortable coverage. Desert camps ask for an extra warm layer after sunset.",
      "Bring a refillable bottle, sunglasses, and any personal medication — we handle the logistics; you keep the day soft.",
      "If you are combining cruise and beach, leave a little suitcase space for the rhythm change. We confirm climate notes with your final proposal.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}

export function getFeaturedJournal(limit = 3) {
  return journalPosts.slice(0, limit);
}
