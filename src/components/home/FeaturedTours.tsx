import Link from "next/link";
import { getFeaturedTours } from "@/data/tours";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TourCard } from "@/components/tours/TourCard";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function FeaturedTours() {
  const featured = getFeaturedTours();
  const [lead, ...rest] = featured;

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured journeys"
            title="Start with a strong route"
            description="Ready-made private itineraries you can book as written — or reshape night by night into something fully yours. Every featured journey is a composed Egypt arc, not a crowded departure."
          />
          <ButtonLink href="/tours" variant="ghost" className="self-start md:self-auto">
            View all tours
          </ButtonLink>
        </div>

        <div className="mt-12">
          <TourCard tour={lead} featured />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 6).map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-soft">
          Prefer a blank page?{" "}
          <Link
            href="/tailor-made"
            className="font-semibold text-nile"
          >
            Request a tailor-made plan
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
