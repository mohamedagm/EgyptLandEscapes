export const atelierGuides = [
  {
    name: "Nour El-Sayed",
    role: "Egyptologist · Cairo & Giza",
    languages: ["English", "Arabic", "French"],
    voice:
      "I leave silence between facts — so the plateau can finish the sentence.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mariana Costa",
    role: "Nile host · Luxor–Aswan",
    languages: ["English", "Portuguese", "Spanish"],
    voice:
      "Temple mornings, cabin evenings — the river keeps the itinerary honest.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Karim Hassan",
    role: "Desert lead · White Desert",
    languages: ["English", "Arabic", "German"],
    voice:
      "We camp where the chalk feels older than the schedule. Quiet is the luxury.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export const atelierCabins = [
  {
    name: "Standard Nile view",
    note: "Private balcony · soft evening light",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Junior suite",
    note: "More floor · quieter mornings",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Corner suite",
    note: "Wider glass · river bend views",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

export const atelierChapters = [
  { id: "cairo", label: "Cairo", day: "Days 1–3", x: 48, y: 28 },
  { id: "luxor", label: "Luxor", day: "Days 4–5", x: 62, y: 58 },
  { id: "nile", label: "Nile", day: "Days 6–8", x: 58, y: 68 },
  { id: "aswan", label: "Aswan", day: "Day 9", x: 55, y: 78 },
  { id: "sea", label: "Red Sea", day: "Days 10–12", x: 78, y: 48 },
] as const;

export const beforeAfter = {
  rush: {
    title: "Group rush",
    lines: [
      "05:30 bus call · shared coach",
      "90 minutes on the plateau · headset tour",
      "Packed lunch · fixed photo stops",
      "Back to hotel by schedule, not by feeling",
    ],
  },
  private: {
    title: "Private pace",
    lines: [
      "Start when the light is right",
      "Egyptologist beside you — not a loud group",
      "Pause for shade, coffee, or silence",
      "Transfer waits on your walking comfort",
    ],
  },
} as const;
