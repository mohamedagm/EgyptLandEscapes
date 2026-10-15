import Link from "next/link";
import { tourRails } from "@/data/home-content";
import { getToursByCategory } from "@/data/tours";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TourCard } from "@/components/tours/TourCard";

export function CategoryTourRails() {
  return (
    <section className="section-pad py-10 md:py-16">
      <div className="container-page space-y-20 md:space-y-28">
        {tourRails.map((rail) => {
          const tours = getToursByCategory(rail.category).slice(0, 3);
          return (
            <div key={rail.category}>
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <SectionHeading
                  eyebrow={rail.eyebrow}
                  title={rail.title}
                  description={rail.description}
                  className="max-w-2xl"
                />
                <Link
                  href={`/tours?category=${rail.category}`}
                  className="text-sm font-semibold text-nile hover:text-nile-deep"
                >
                  See all →
                </Link>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
