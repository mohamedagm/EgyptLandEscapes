import Link from "next/link";
import { categories } from "@/data/tours";
import { SectionHeading } from "@/components/ui/SectionHeading";

const copy: Record<string, string> = {
  "day-tours": "Same-day private touring from Cairo, Luxor, and beyond.",
  packages: "Multi-day routes mixing cities, cruise, and beach.",
  "nile-cruise": "Cabin nights between Luxor and Aswan temple stops.",
  desert: "Oasis drives, chalk formations, and camp mornings.",
  "red-sea": "Reef days and soft recovery after heavy sightseeing.",
  custom: "Dates, pace, and hotel level designed around your brief.",
};

export function Categories() {
  const items = categories.filter((c) => c.id !== "all");

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Browse by style"
          title="Pick the shape of your trip"
          description="Every category is a door into private planning — not a locked group departure."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((category, index) => (
            <Link
              key={category.id}
              href={`/tours?category=${category.id}`}
              className="group relative overflow-hidden rounded-[1.6rem] soft-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-nile/30"
            >
              <div className="absolute -right-3 -top-3 display text-7xl text-nile/[0.07] transition group-hover:text-nile/15">
                0{index + 1}
              </div>
              <p className="text-[11px] tracking-[0.18em] text-nile uppercase">
                Category
              </p>
              <h3 className="mt-3 display text-2xl text-ink transition group-hover:text-nile-deep md:text-3xl">
                {category.label}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                {copy[category.id]}
              </p>
              <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-nile uppercase">
                Explore →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
