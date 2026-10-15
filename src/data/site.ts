export const siteConfig = {
  name: "Egypt Land Escapes",
  tagline: "Private journeys through timeless Egypt",
  description:
    "Egypt Land Escapes designs private Egypt tours, Nile cruises, and desert escapes with local specialists — from the Pyramids to the Red Sea.",
  url: "https://egyptlandescapes.com",
  contact: {
    phoneDisplay: "+20 100 000 0000",
    phoneTel: "+201000000000",
    whatsapp: "201000000000",
    email: "hello@egyptlandescapes.com",
    address: "12 Nile Corniche, Giza, Egypt",
    hours: "Daily · 8:00 AM – 10:00 PM (Cairo time)",
  },
  trust: {
    established: "Est. 2018",
    license: "Tourism License No. DEMO-988",
    iata: "IATA partner (demo)",
    rating: "4.9",
    reviewCount: "186",
    reviewSource: "Demo traveler score",
    support: "24/7 local WhatsApp support",
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tripadvisor: "https://tripadvisor.com",
  },
} as const;

export const navLinks = [
  { href: "/tours", label: "Tours" },
  { href: "/trip-builder", label: "Trip Builder" },
  { href: "/nile-cruises", label: "Nile Cruises" },
  { href: "/tailor-made", label: "Tailor-Made" },
  { href: "/destinations", label: "Destinations" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
