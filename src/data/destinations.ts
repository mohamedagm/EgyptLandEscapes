export type Destination = {
  slug: string;
  name: string;
  region: string;
  summary: string;
  image: string;
  highlights: string[];
  /** Percentage position on the stylized Egypt map */
  map: { x: number; y: number };
};

export const destinations: Destination[] = [
  {
    slug: "cairo",
    name: "Cairo & Giza",
    region: "Lower Egypt",
    summary:
      "Pyramids, museums, and the living pulse of the capital — the classic gateway to Egypt.",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Giza Plateau", "Egyptian Museum / GEM", "Khan El Khalili"],
    map: { x: 48, y: 28 },
  },
  {
    slug: "luxor",
    name: "Luxor",
    region: "Upper Egypt",
    summary:
      "The world’s greatest open-air museum — temples, tombs, and the West Bank at golden hour.",
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Karnak Temple", "Valley of the Kings", "Hatshepsut Temple"],
    map: { x: 62, y: 58 },
  },
  {
    slug: "aswan",
    name: "Aswan",
    region: "Upper Egypt",
    summary:
      "Nile islands, Nubian culture, and the calm before Abu Simbel — Aswan slows the journey down.",
    image:
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Philae Temple", "Nubian Village", "Abu Simbel day trip"],
    map: { x: 58, y: 78 },
  },
  {
    slug: "hurghada",
    name: "Hurghada",
    region: "Red Sea",
    summary:
      "Clear water, reef days, and easy recovery after temple-heavy itineraries.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Snorkeling", "Island boat days", "Resort downtime"],
    map: { x: 78, y: 48 },
  },
  {
    slug: "sharm-el-sheikh",
    name: "Sharm El Sheikh",
    region: "Red Sea",
    summary:
      "South Sinai’s dive capital — reefs, desert edges, and optional St. Catherine escapes.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Ras Mohamed", "Coral gardens", "Desert jeep safari"],
    map: { x: 86, y: 38 },
  },
  {
    slug: "white-desert",
    name: "White Desert",
    region: "Western Desert",
    summary:
      "Surreal chalk formations, black desert contrast, and nights under a desert sky.",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Camping", "Bahariya Oasis", "Sunset formations"],
    map: { x: 28, y: 36 },
  },
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
