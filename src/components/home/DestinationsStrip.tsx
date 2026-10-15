import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { imageBlurDataUrl } from "@/data/media";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DestinationsStrip() {
  const [lead, second, third, ...rest] = destinations;

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Destinations"
            title="Where the journey unfolds"
            description="From Giza’s plateau to Luxor’s West Bank, Aswan’s river light, and Red Sea calm."
          />
          <Link
            href="/destinations"
            className="text-sm font-semibold text-nile hover:text-nile-deep"
          >
            All destinations →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <Link
            href={`/destinations#${lead.slug}`}
            className="group relative min-h-[320px] overflow-hidden rounded-[1.75rem] lg:col-span-7 lg:row-span-2 lg:min-h-[540px]"
          >
            <Image
              src={lead.image}
              alt={lead.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              placeholder="blur"
              blurDataURL={imageBlurDataUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shade/80 via-shade/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[11px] tracking-[0.16em] text-sand uppercase">
                {lead.region}
              </p>
              <h3 className="display mt-1 text-3xl text-white md:text-5xl">
                {lead.name}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/80">
                {lead.summary}
              </p>
            </div>
          </Link>

          {[second, third].map((destination) => (
            <Link
              key={destination.slug}
              href={`/destinations#${destination.slug}`}
              className="group relative min-h-56 overflow-hidden rounded-[1.75rem] lg:col-span-5"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL={imageBlurDataUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shade/75 via-shade/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-[11px] tracking-[0.16em] text-sand uppercase">
                  {destination.region}
                </p>
                <h3 className="display mt-1 text-2xl text-white md:text-3xl">
                  {destination.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {rest.map((destination) => (
            <Link
              key={destination.slug}
              href={`/destinations#${destination.slug}`}
              className="group relative min-h-52 overflow-hidden rounded-[1.75rem]"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL={imageBlurDataUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shade/75 via-shade/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] tracking-[0.16em] text-sand uppercase">
                  {destination.region}
                </p>
                <h3 className="display mt-1 text-2xl text-white">
                  {destination.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
