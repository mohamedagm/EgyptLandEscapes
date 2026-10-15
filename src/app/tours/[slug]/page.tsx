import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TourCard } from "@/components/tours/TourCard";
import { TourFaqList } from "@/components/tours/TourFaqList";
import { TourGallery } from "@/components/tours/TourGallery";
import { TourItineraryTimeline } from "@/components/tours/TourItineraryTimeline";
import { TourDetailHero } from "@/components/tours/TourDetailHero";
import { BeforeAfterItinerary } from "@/components/premium/BeforeAfterItinerary";
import { GuideVoiceCards } from "@/components/premium/GuideVoiceCards";
import { TourJsonLd } from "@/components/seo/TourJsonLd";
import {
  categoryLabels,
  getTourBySlug,
  getTourGallery,
  tours,
} from "@/data/tours";
import { destinations } from "@/data/destinations";
import { siteConfig } from "@/data/site";
import { getRelatedTours, getTourFaqs } from "@/lib/tour-detail";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppUrl, tourEnquiryMessage } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { ShortlistHeart } from "@/components/shortlist/ShortlistDrawer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour not found" };
  return {
    title: tour.title,
    description: tour.shortDescription,
    openGraph: {
      title: tour.title,
      description: tour.shortDescription,
      images: [{ url: tour.image }],
    },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const places = destinations.filter((d) =>
    tour.destinations.includes(d.slug),
  );
  const gallery = getTourGallery(tour);
  const faqs = getTourFaqs(tour);
  const related = getRelatedTours(tour);

  return (
    <article>
      <TourJsonLd tour={tour} />
      <TourDetailHero
        image={tour.image}
        title={tour.title}
        eyebrow={`${categoryLabels[tour.category]} · ${tour.duration}`}
        description={tour.shortDescription}
        morphName={`tour-hero-${tour.slug}`}
        chips={
          <>
            <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-paper backdrop-blur-sm">
              Private pacing
            </span>
            <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-paper backdrop-blur-sm">
              Written proposal
            </span>
            <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-paper backdrop-blur-sm">
              {siteConfig.trust.rating}/5 demo score
            </span>
          </>
        }
      />

      <div className="section-pad py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-14">
            <Reveal>
              <TourGallery images={gallery} title={tour.title} />
            </Reveal>

            <Reveal>
              <section>
                <h2 className="display text-3xl text-ink">Highlights</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {tour.highlights.map((item) => (
                    <li
                      key={item}
                      className="border-s-2 border-nile/40 ps-4 text-sm text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <TourItineraryTimeline itinerary={tour.itinerary} />
            </Reveal>

            <Reveal>
              <BeforeAfterItinerary />
            </Reveal>

            <Reveal>
              <section className="grid gap-8 sm:grid-cols-2">
                <div className="rounded-[1.5rem] soft-panel p-6">
                  <h2 className="display text-2xl text-ink">Includes</h2>
                  <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                    {tour.includes.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[1.5rem] soft-panel p-6">
                  <h2 className="display text-2xl text-ink">Excludes</h2>
                  <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                    {tour.excludes.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </Reveal>

            {places.length > 0 ? (
              <Reveal>
                <section>
                  <h2 className="display text-2xl text-ink">
                    Destinations on this route
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {places.map((place) => (
                      <Link
                        key={place.slug}
                        href={`/destinations#${place.slug}`}
                        className="choice-chip rounded-full px-4 py-2 text-sm transition hover:border-nile/40"
                      >
                        {place.name}
                      </Link>
                    ))}
                  </div>
                </section>
              </Reveal>
            ) : null}

            <Reveal>
              <TourFaqList items={faqs} />
            </Reveal>

            <Reveal>
              <GuideVoiceCards
                title="Who can hold this journey"
                description="Sample specialist voices — your proposal names the actual guide language and pacing for your dates."
              />
            </Reveal>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="relative rounded-[1.75rem] soft-panel p-6 shadow-[0_16px_40px_rgba(20,33,28,0.08)]">
                <ShortlistHeart
                  slug={tour.slug}
                  className="absolute top-4 end-4"
                />
                <p className="text-xs tracking-[0.16em] text-nile uppercase">
                  From
                </p>
                <p className="display mt-2 text-4xl text-ink">
                  {tour.priceFrom > 0
                    ? formatPrice(tour.priceFrom)
                    : "Custom quote"}
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  Demo pricing for MVP — final quote depends on season, hotels,
                  and group size.
                </p>
                <ul className="mt-5 space-y-2 border-t border-ink/8 pt-4 text-sm text-ink-soft">
                  <li>• Duration: {tour.duration}</li>
                  <li>• Style: {categoryLabels[tour.category]}</li>
                  <li>• Reply via WhatsApp or form</li>
                </ul>
                <div className="mt-6 space-y-3">
                  <ButtonLink
                    href={buildWhatsAppUrl(tourEnquiryMessage(tour.title))}
                    external
                    className="w-full"
                  >
                    Enquire on WhatsApp
                  </ButtonLink>
                  <ButtonLink href="/customize" variant="ghost" className="w-full">
                    Customize this route
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[1.75rem] soft-panel p-6">
                <h2 className="display text-2xl text-ink">Quick enquiry</h2>
                <p className="mt-2 mb-5 text-sm text-ink-soft">
                  Send dates and traveler count. With Resend configured, this
                  emails the team — otherwise it logs in demo mode.
                </p>
                <ContactForm defaultSubject={`Enquiry: ${tour.title}`} />
              </div>
            </Reveal>
          </aside>
        </div>

        <div className="container-page mt-20">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Related journeys</p>
                <h2 className="display mt-2 text-3xl text-ink md:text-4xl">
                  You may also like
                </h2>
              </div>
              <Link href="/tours" className="text-sm font-semibold text-nile">
                View all tours →
              </Link>
            </div>
          </Reveal>
          <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <StaggerItem key={item.slug}>
                <TourCard tour={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </article>
  );
}
