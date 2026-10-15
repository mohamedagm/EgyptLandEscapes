export type TourCategory =
  | "day-tours"
  | "packages"
  | "nile-cruise"
  | "desert"
  | "red-sea"
  | "custom";

export type Tour = {
  slug: string;
  title: string;
  shortDescription: string;
  duration: string;
  category: TourCategory;
  destinations: string[];
  priceFrom: number;
  featured: boolean;
  image: string;
  highlights: string[];
  itinerary: { title: string; description: string }[];
  includes: string[];
  excludes: string[];
};

export const categories: { id: TourCategory | "all"; label: string }[] = [
  { id: "all", label: "All tours" },
  { id: "day-tours", label: "Day tours" },
  { id: "packages", label: "Packages" },
  { id: "nile-cruise", label: "Nile cruise" },
  { id: "desert", label: "Desert" },
  { id: "red-sea", label: "Red Sea" },
  { id: "custom", label: "Custom" },
];

export const categoryLabels: Record<TourCategory, string> = {
  "day-tours": "Day tours",
  packages: "Packages",
  "nile-cruise": "Nile cruise",
  desert: "Desert",
  "red-sea": "Red Sea",
  custom: "Custom",
};

export const tours: Tour[] = [
  {
    slug: "giza-pyramids-sphinx-day-tour",
    title: "Giza Pyramids & Sphinx Private Day Tour",
    shortDescription:
      "Stand before the last Ancient Wonder with a private Egyptologist, optional camel ride, and a paced Giza morning.",
    duration: "6–7 hours",
    category: "day-tours",
    destinations: ["cairo"],
    priceFrom: 89,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Private guide & vehicle",
      "Giza Plateau photo stops",
      "Sphinx viewpoint",
      "Optional camel photo stop",
    ],
    itinerary: [
      {
        title: "Hotel pickup",
        description:
          "Meet your driver-guide in Cairo or Giza and transfer to the plateau with bottled water onboard.",
      },
      {
        title: "Pyramids of Giza",
        description:
          "Explore the Great Pyramid area, Khafre, and Menkaure with context on building methods and dynasty history.",
      },
      {
        title: "Sphinx & panorama",
        description:
          "Visit the Sphinx enclosure viewpoint and a classic desert panorama before returning to your hotel.",
      },
    ],
    includes: [
      "Private Egyptologist guide",
      "Air-conditioned vehicle",
      "Bottled water",
      "Hotel pickup & drop-off (Cairo/Giza)",
    ],
    excludes: [
      "Entrance tickets",
      "Camel ride fees",
      "Gratuities",
      "Personal expenses",
    ],
  },
  {
    slug: "cairo-islamic-coptic-day-tour",
    title: "Islamic Cairo, Old Cairo & Khan El Khalili",
    shortDescription:
      "A full-day walk through citadel views, Coptic lanes, and the bazaar’s spice-scented alleys.",
    duration: "8 hours",
    category: "day-tours",
    destinations: ["cairo"],
    priceFrom: 99,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Citadel overlook",
      "Coptic Cairo churches",
      "Khan El Khalili time",
      "Private pacing",
    ],
    itinerary: [
      {
        title: "Citadel of Saladin",
        description:
          "Visit the citadel area and Mohamed Ali Mosque for city-wide views and Ottoman-era context.",
      },
      {
        title: "Old Cairo",
        description:
          "Walk Coptic Cairo’s historic core, including key churches and the layered story of the old city.",
      },
      {
        title: "Khan El Khalili",
        description:
          "Browse the bazaar with free time for tea, souvenirs, and photos before hotel return.",
      },
    ],
    includes: [
      "Private guide",
      "Private transfers",
      "Bottled water",
      "Hotel pickup & drop-off",
    ],
    excludes: ["Entrance fees", "Lunch", "Shopping purchases", "Gratuities"],
  },
  {
    slug: "alexandria-day-trip-from-cairo",
    title: "Alexandria Day Trip from Cairo",
    shortDescription:
      "Mediterranean light, library architecture, and coastal fortresses — a full day on Egypt’s northern shore.",
    duration: "10–12 hours",
    category: "day-tours",
    destinations: ["cairo"],
    priceFrom: 120,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Bibliotheca Alexandrina exterior/visit",
      "Qaitbay Citadel",
      "Corniche drive",
      "Catacombs option",
    ],
    itinerary: [
      {
        title: "Morning transfer",
        description:
          "Private drive from Cairo to Alexandria with rest stops as needed.",
      },
      {
        title: "City highlights",
        description:
          "Visit the library area, Qaitbay Citadel, and selected Roman/medieval stops based on timing.",
      },
      {
        title: "Return to Cairo",
        description:
          "Late afternoon departure back to your Cairo or Giza hotel.",
      },
    ],
    includes: [
      "Private vehicle & guide",
      "Bottled water",
      "Hotel pickup & drop-off",
    ],
    excludes: ["Entrance tickets", "Lunch", "Gratuities"],
  },
  {
    slug: "luxor-east-west-bank-day-tour",
    title: "Luxor East & West Bank Day Tour",
    shortDescription:
      "Karnak at golden light, Valley of the Kings, and Hatshepsut’s cliff temple in one carefully timed day.",
    duration: "8–9 hours",
    category: "day-tours",
    destinations: ["luxor"],
    priceFrom: 110,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Valley of the Kings",
      "Hatshepsut Temple",
      "Karnak Temple",
      "Private Egyptologist",
    ],
    itinerary: [
      {
        title: "West Bank morning",
        description:
          "Explore royal tombs and the terraced temple of Hatshepsut with Colossi photo stop.",
      },
      {
        title: "East Bank afternoon",
        description:
          "Continue to Karnak’s hypostyle hall and avenue of sphinxes before hotel or cruise return.",
      },
    ],
    includes: [
      "Private guide",
      "Private transfers",
      "Bottled water",
    ],
    excludes: [
      "Entrance tickets",
      "Tomb upgrades inside Valley of the Kings",
      "Lunch",
      "Gratuities",
    ],
  },
  {
    slug: "classic-egypt-8-days",
    title: "Classic Egypt — Cairo, Nile & Luxor · 8 Days",
    shortDescription:
      "A first-timer’s private route: Giza and Cairo, a short Nile cruise, and Luxor’s essential temples.",
    duration: "8 days / 7 nights",
    category: "packages",
    destinations: ["cairo", "luxor", "aswan"],
    priceFrom: 1180,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Private Cairo touring",
      "Nile cruise segment",
      "Luxor West & East Bank",
      "Domestic flight coordination",
    ],
    itinerary: [
      {
        title: "Days 1–2 · Cairo",
        description:
          "Arrive, rest, then explore Giza and selected Cairo highlights with private guiding.",
      },
      {
        title: "Days 3–6 · Nile & Upper Egypt",
        description:
          "Fly south for cruise sailing with temple visits between Luxor and Aswan (direction may vary).",
      },
      {
        title: "Days 7–8 · Luxor finale",
        description:
          "Final West/East Bank visits as needed, then departure transfer.",
      },
    ],
    includes: [
      "Hotels & cruise nights as quoted",
      "Private guiding on sightseeing days",
      "Transfers listed in your proposal",
      "Breakfast daily (cruise full board typical)",
    ],
    excludes: [
      "International flights",
      "Visa fees",
      "Optional excursions",
      "Travel insurance",
    ],
  },
  {
    slug: "pyramids-nile-hurghada-12-days",
    title: "Pyramids, Nile Cruise & Hurghada · 12 Days",
    shortDescription:
      "History, river days, then Red Sea recovery — the balanced Egypt holiday most travelers imagine.",
    duration: "12 days / 11 nights",
    category: "packages",
    destinations: ["cairo", "luxor", "aswan", "hurghada"],
    priceFrom: 1490,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Cairo & Giza",
      "Nile cruise temples",
      "Hurghada beach time",
      "Private transfers",
    ],
    itinerary: [
      {
        title: "Cairo opening",
        description:
          "Pyramids, museum time, and city orientation before flying south.",
      },
      {
        title: "Nile cruise",
        description:
          "Sail with guided temple stops — Edfu, Kom Ombo, Philae / Luxor highlights depending on route.",
      },
      {
        title: "Hurghada unwind",
        description:
          "Resort nights with optional snorkeling or island boat day before final departure.",
      },
    ],
    includes: [
      "Accommodation nights as proposed",
      "Sightseeing with private guide where listed",
      "Domestic transport in the written quote",
      "Breakfast daily",
    ],
    excludes: [
      "International flights",
      "Optional Red Sea activities",
      "Entrance upgrades",
      "Gratuities",
    ],
  },
  {
    slug: "nile-cruise-luxor-aswan-5-days",
    title: "Nile Cruise Luxor to Aswan · 5 Days",
    shortDescription:
      "Temple mornings, soft river light, and cabin nights between Luxor and Aswan.",
    duration: "5 days / 4 nights",
    category: "nile-cruise",
    destinations: ["luxor", "aswan"],
    priceFrom: 980,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Luxor temples & tombs",
      "Edfu & Kom Ombo",
      "Philae Temple",
      "Full-board cruise style",
    ],
    itinerary: [
      {
        title: "Embark Luxor",
        description:
          "Board your cruise, then visit East and/or West Bank highlights based on sailing schedule.",
      },
      {
        title: "River temples",
        description:
          "Stop for Edfu and Kom Ombo with guided walks and return to the boat for meals.",
      },
      {
        title: "Aswan arrival",
        description:
          "Philae Temple and Aswan scenery before disembarkation transfer.",
      },
    ],
    includes: [
      "Cruise cabin (category as quoted)",
      "Full board on cruise",
      "Guided temple visits listed",
      "Transfers to/from cruise as agreed",
    ],
    excludes: [
      "Drinks package extras",
      "Abu Simbel optional tour",
      "Tips for cruise staff",
      "Flights",
    ],
  },
  {
    slug: "nile-cruise-aswan-luxor-4-days",
    title: "Nile Cruise Aswan to Luxor · 4 Days",
    shortDescription:
      "A shorter sailing for travelers who want the river without a long multi-city package.",
    duration: "4 days / 3 nights",
    category: "nile-cruise",
    destinations: ["aswan", "luxor"],
    priceFrom: 820,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Philae & Aswan start",
      "Kom Ombo & Edfu",
      "Luxor finale",
      "Compact itinerary",
    ],
    itinerary: [
      {
        title: "Aswan embarkation",
        description:
          "Board in Aswan and visit Philae before sailing north.",
      },
      {
        title: "Temple stops",
        description:
          "Guided visits at Kom Ombo and Edfu with leisure time onboard.",
      },
      {
        title: "Luxor disembark",
        description:
          "Arrive Luxor for East/West Bank visits depending on schedule, then transfer out.",
      },
    ],
    includes: [
      "Cruise accommodation",
      "Meals on board as listed",
      "Guided sightseeing stops",
    ],
    excludes: ["Flights", "Optional tours", "Personal expenses", "Gratuities"],
  },
  {
    slug: "white-desert-camping-2-days",
    title: "Bahariya & White Desert Camping · 2 Days",
    shortDescription:
      "Black desert contrast, chalk sculptures at sunset, and a night camp under Western Desert stars.",
    duration: "2 days / 1 night",
    category: "desert",
    destinations: ["white-desert"],
    priceFrom: 199,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "4x4 desert driving",
      "White Desert formations",
      "Camping dinner & breakfast",
      "Bahariya Oasis",
    ],
    itinerary: [
      {
        title: "Day 1 · Into the desert",
        description:
          "Drive to Bahariya, switch to 4x4, explore black desert viewpoints, then camp in the White Desert.",
      },
      {
        title: "Day 2 · Sunrise & return",
        description:
          "Sunrise among the formations, breakfast, oasis stop, then return toward Cairo.",
      },
    ],
    includes: [
      "4x4 safari",
      "Camp setup & meals listed",
      "Guide / driver team",
      "Pickup from Cairo area as quoted",
    ],
    excludes: [
      "Sleeping bag rental if needed",
      "Soft drinks beyond water",
      "Personal gear",
      "Gratuities",
    ],
  },
  {
    slug: "fayoum-oasis-day-tour",
    title: "Fayoum Oasis & Lake Qarun Day Tour",
    shortDescription:
      "Water wheels, desert lakes, and a softer pace just southwest of Cairo — ideal for a nature-leaning day.",
    duration: "9–10 hours",
    category: "desert",
    destinations: ["cairo"],
    priceFrom: 140,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Lake Qarun viewpoints",
      "Wadi El Rayan area (as timed)",
      "Village / oasis atmosphere",
      "Private vehicle",
    ],
    itinerary: [
      {
        title: "Morning departure",
        description:
          "Leave Cairo for Fayoum with scenic countryside approach.",
      },
      {
        title: "Oasis circuit",
        description:
          "Visit lake viewpoints and selected natural stops based on season and road conditions.",
      },
      {
        title: "Return",
        description: "Afternoon transfer back to your Cairo or Giza hotel.",
      },
    ],
    includes: ["Private transfers", "Guide", "Bottled water"],
    excludes: ["Entrance fees", "Lunch", "Optional boat rides", "Gratuities"],
  },
  {
    slug: "sharm-snorkeling-day",
    title: "Sharm El Sheikh Snorkeling Boat Day",
    shortDescription:
      "Reef colors, soft boat time, and an easy Red Sea day from Sharm — add-on after culture-heavy travel.",
    duration: "Full day",
    category: "red-sea",
    destinations: ["sharm-el-sheikh"],
    priceFrom: 65,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Boat snorkeling stops",
      "Equipment typically provided",
      "Lunch onboard (as operated)",
      "Hotel transfer area dependent",
    ],
    itinerary: [
      {
        title: "Marina departure",
        description:
          "Transfer to the marina, safety briefing, and sail to the day’s reef stops.",
      },
      {
        title: "Snorkel & lunch",
        description:
          "Multiple water entries with rest time on deck and a simple lunch service.",
      },
      {
        title: "Return",
        description: "Afternoon marina return and hotel drop-off.",
      },
    ],
    includes: [
      "Boat day as operated",
      "Snorkel gear (standard)",
      "Lunch when included by operator",
    ],
    excludes: [
      "Photos / extras",
      "Alcoholic drinks",
      "National park fees if separate",
      "Gratuities",
    ],
  },
  {
    slug: "tailor-made-private-egypt",
    title: "Tailor-Made Private Egypt Journey",
    shortDescription:
      "Your dates, pace, and hotel level — we design a private route across Cairo, the Nile, desert, or Red Sea.",
    duration: "Flexible",
    category: "custom",
    destinations: ["cairo", "luxor", "aswan", "hurghada"],
    priceFrom: 0,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Custom itinerary design",
      "Private guiding & transfers",
      "Hotel & cruise matching",
      "WhatsApp planning support",
    ],
    itinerary: [
      {
        title: "Share your brief",
        description:
          "Tell us dates, travelers, interests, walking comfort, and hotel style.",
      },
      {
        title: "Receive a written outline",
        description:
          "We reply with a paced route, inclusions, and a clear quote for review.",
      },
      {
        title: "Refine & confirm",
        description:
          "Adjust nights, cruise category, or free days until the plan fits — then lock services.",
      },
    ],
    includes: [
      "Trip design consultation",
      "Written proposal",
      "Local coordination once booked",
    ],
    excludes: [
      "Services not listed in the final quote",
      "International flights unless requested",
    ],
  },
];

export function getTourBySlug(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}

export function getFeaturedTours() {
  return tours.filter((tour) => tour.featured);
}

export function getToursByCategory(category: TourCategory | "all") {
  if (category === "all") return tours;
  return tours.filter((tour) => tour.category === category);
}

export type DurationFilter = "all" | "day" | "short" | "classic" | "long" | "flex";
export type PriceFilter = "all" | "under-200" | "200-1000" | "1000-plus" | "custom";

export function getDurationBucket(tour: Tour): DurationFilter {
  if (tour.category === "custom" || tour.priceFrom === 0) return "flex";
  if (
    tour.category === "day-tours" ||
    tour.duration.toLowerCase().includes("hour") ||
    tour.duration.toLowerCase().includes("full day")
  ) {
    return "day";
  }
  const match = tour.duration.match(/(\d+)/);
  const days = match ? Number(match[1]) : 0;
  if (days <= 5) return "short";
  if (days <= 10) return "classic";
  return "long";
}

export function getPriceBucket(tour: Tour): PriceFilter {
  if (tour.priceFrom <= 0) return "custom";
  if (tour.priceFrom < 200) return "under-200";
  if (tour.priceFrom <= 1000) return "200-1000";
  return "1000-plus";
}

export type TourFilters = {
  category?: TourCategory | "all";
  destination?: string;
  duration?: DurationFilter;
  price?: PriceFilter;
};

export function filterTours(filters: TourFilters = {}) {
  const category = filters.category || "all";
  const destination = filters.destination || "all";
  const duration = filters.duration || "all";
  const price = filters.price || "all";

  return tours.filter((tour) => {
    if (category !== "all" && tour.category !== category) return false;
    if (destination !== "all" && !tour.destinations.includes(destination)) {
      return false;
    }
    if (duration !== "all" && getDurationBucket(tour) !== duration) return false;
    if (price !== "all" && getPriceBucket(tour) !== price) return false;
    return true;
  });
}

const galleryPool = [
  "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
];

export function getTourGallery(tour: Tour) {
  const extras = galleryPool.filter((url) => url !== tour.image);
  return [tour.image, ...extras].slice(0, 5);
}

