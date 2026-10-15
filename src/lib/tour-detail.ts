import type { Tour } from "@/data/tours";
import { tours } from "@/data/tours";

export type TourFaq = { q: string; a: string };

export function getTourFaqs(tour: Tour): TourFaq[] {
  const isDay =
    tour.category === "day-tours" ||
    tour.duration.toLowerCase().includes("hour") ||
    tour.duration.toLowerCase().includes("full day");

  return [
    {
      q: "Is this experience private?",
      a: isDay
        ? "Yes. Guiding and vehicle are private for your party unless you request otherwise."
        : tour.category === "nile-cruise"
          ? "Land touring and transfers are privately coordinated. The cruise vessel is shared with other guests, while your cabin category is matched in the written quote."
          : "Core sightseeing and transfers are private by default. Shared elements (if any) are listed clearly in your proposal.",
    },
    {
      q: "What should I send to get an accurate quote?",
      a: "Travel month or dates, number of adults/children, preferred hotel level, and any walking or accessibility notes. WhatsApp is fastest.",
    },
    {
      q: "Are entrance tickets included?",
      a: tour.excludes.some((item) =>
        item.toLowerCase().includes("entrance"),
      )
        ? "Entrance tickets are typically listed under Excludes for this demo itinerary. Your final written proposal confirms what is included for your dates."
        : "Check the Includes / Excludes lists on this page. The final written proposal confirms tickets for your travel dates.",
    },
    {
      q: "Can we reshape the itinerary?",
      a: "Yes. Treat this page as a starting shape. We adjust pace, free time, cruise direction, or add desert/Red Sea chapters before booking.",
    },
    {
      q: "How do deposits and confirmation work?",
      a: "Nothing is locked until you approve a written proposal. Payment steps and cancellation terms will be confirmed with your real operator policy before public bookings.",
    },
  ];
}

export function getRelatedTours(tour: Tour, limit = 3) {
  const sameCategory = tours.filter(
    (item) => item.slug !== tour.slug && item.category === tour.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fillers = tours.filter(
    (item) =>
      item.slug !== tour.slug &&
      !sameCategory.some((s) => s.slug === item.slug),
  );
  return [...sameCategory, ...fillers].slice(0, limit);
}
