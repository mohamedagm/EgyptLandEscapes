import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { DestinationsMap } from "@/components/destinations/DestinationsMap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JournalStrip } from "@/components/home/JournalStrip";
import { tours } from "@/data/tours";
import { TourCard } from "@/components/tours/TourCard";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { imageBlurDataUrl } from "@/data/media";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Cairo & Giza, Luxor, Aswan, Hurghada, Sharm El Sheikh, and the White Desert with Egypt Land Escapes.",
};

export default function DestinationsPage() {
  const featured = tours.filter((t) => t.featured).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title={
          <>
            Egypt in chapters
            <span className="mt-1 block italic text-sand">
              each with its own tempo
            </span>
          </>
        }
        description="Use these as building blocks for a private route — or open tours that already combine them with Nile nights, desert sky, or Red Sea recovery."
        image="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Egypt destinations"
        height="md"
        actions={
          <>
            <ButtonLink href="/customize">Plan a custom route</ButtonLink>
            <ButtonLink
              href="/tours"
              variant="ghost"
              className="!border-white/25 !bg-white/8 !text-white hover:!bg-white/16"
            >
              Browse tours
            </ButtonLink>
          </>
        }
      />

      <Reveal>
        <DestinationsMap />
      </Reveal>

      <div className="section-pad py-16 md:py-24">
        <div className="container-page space-y-20">
          {destinations.map((destination, index) => (
            <Reveal key={destination.slug}>
              <section
                id={destination.slug}
                className={`grid items-center gap-8 scroll-mt-28 md:grid-cols-2 ${
                  index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-72 overflow-hidden rounded-[1.75rem] md:min-h-[28rem]">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={imageBlurDataUrl}
                  />
                </div>
                <div>
                  <p className="eyebrow">{destination.region}</p>
                  <h2 className="display mt-2 text-4xl text-ink md:text-5xl">
                    {destination.name}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                    {destination.summary}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-ink">
                    {destination.highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href="/tours" variant="ghost">
                      Browse related tours
                    </ButtonLink>
                    <ButtonLink href="/customize" variant="primary">
                      Plan this chapter
                    </ButtonLink>
                  </div>
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <div className="container-page mt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Combine chapters"
              title="Most private journeys braid more than one place"
              description="Cairo for the plateau, Luxor and Aswan for temples and river nights, then desert or Red Sea when the story needs air."
            />
          </Reveal>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((tour) => (
              <StaggerItem key={tour.slug}>
                <TourCard tour={tour} />
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-center text-sm text-ink-soft">
            Prefer a blank page?{" "}
            <Link href="/tailor-made" className="font-semibold text-nile">
              Start a custom plan
            </Link>
            .
          </p>
        </div>
      </div>

      <Reveal>
        <JournalStrip />
      </Reveal>
    </>
  );
}
