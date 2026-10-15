"use client";

import Image from "next/image";
import type { Tour } from "@/data/tours";
import { categoryLabels } from "@/data/tours";
import { imageBlurDataUrl } from "@/data/media";
import { formatPrice } from "@/lib/utils";
import { ShortlistHeart } from "@/components/shortlist/ShortlistDrawer";
import { MorphLink } from "@/components/effects/MorphLink";
import { TiltCard } from "@/components/effects/TiltCard";

export function TourCard({
  tour,
  featured = false,
}: {
  tour: Tour;
  featured?: boolean;
}) {
  const morphId = `tour-hero-${tour.slug}`;

  if (featured) {
    return (
      <TiltCard>
        <MorphLink
          href={`/tours/${tour.slug}`}
          morphId={morphId}
          className="group relative block min-h-[420px] overflow-hidden rounded-[2rem] md:min-h-[480px]"
        >
          <div className="absolute inset-0" data-morph>
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="100vw"
              priority
              placeholder="blur"
              blurDataURL={imageBlurDataUrl}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-shade/80 via-shade/45 to-shade/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-shade/70 via-transparent to-transparent" />
          <ShortlistHeart
            slug={tour.slug}
            className="absolute top-4 end-4 z-10"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
            <span className="badge-on-media w-fit rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
              {categoryLabels[tour.category]}
            </span>
            <h3 className="display mt-4 max-w-2xl text-3xl text-white md:text-5xl">
              {tour.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/85 md:text-base">
              {tour.shortDescription}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-paper/90">
              <span>{tour.duration}</span>
              <span className="h-1 w-1 rounded-full bg-sand" />
              <span className="font-semibold text-sand">
                {tour.priceFrom > 0
                  ? `From ${formatPrice(tour.priceFrom)}`
                  : "Custom quote"}
              </span>
            </div>
          </div>
        </MorphLink>
      </TiltCard>
    );
  }

  return (
    <TiltCard>
      <MorphLink
        href={`/tours/${tour.slug}`}
        morphId={morphId}
        className="group relative block overflow-hidden rounded-[1.75rem] soft-panel transition duration-500 hover:shadow-[0_24px_60px_rgba(16,25,22,0.12)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0" data-morph>
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL={imageBlurDataUrl}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-shade/60 via-transparent to-transparent" />
          <span className="badge-on-media absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
            {categoryLabels[tour.category]}
          </span>
          <ShortlistHeart
            slug={tour.slug}
            className="absolute top-3 end-3 z-10"
          />
        </div>
        <div className="space-y-3 p-5 md:p-6">
          <h3 className="display text-[1.35rem] leading-snug text-ink md:text-2xl">
            {tour.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
            {tour.shortDescription}
          </p>
          <div className="flex items-center justify-between border-t border-ink/8 pt-3 text-sm">
            <span className="text-ink-soft">{tour.duration}</span>
            <span className="font-semibold text-nile">
              {tour.priceFrom > 0
                ? `From ${formatPrice(tour.priceFrom)}`
                : "Custom quote"}
            </span>
          </div>
        </div>
      </MorphLink>
    </TiltCard>
  );
}
