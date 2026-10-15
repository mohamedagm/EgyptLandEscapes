import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TripBuilder } from "@/components/trip-builder/TripBuilder";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Trip Builder",
  description:
    "Visually build a private Egypt itinerary day by day — Cairo, Nile cruise, desert, and Red Sea chapters — then send your route on WhatsApp.",
};

export default function TripBuilderPage() {
  return (
    <>
      <PageHero
        eyebrow="Trip builder"
        title={
          <>
            Build the route
            <span className="mt-1 block italic text-sand">
              one day at a time
            </span>
          </>
        }
        description="Drag chapters onto your timeline, start from a preset, or tap to place. When it feels right, send the route on WhatsApp for a written private proposal."
        image="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Build a private Egypt trip timeline"
        height="sm"
        actions={
          <>
            <ButtonLink href="#builder" variant="primary">
              Start building
            </ButtonLink>
            <ButtonLink
              href="/trip-mood"
              variant="ghost"
              className="!border-white/25 !bg-white/8 !text-white hover:!bg-white/16"
            >
              Not sure? Try Trip Mood
            </ButtonLink>
          </>
        }
      />

      <div id="builder" className="section-pad scroll-mt-28 py-14 md:py-20">
        <div className="container-page">
          <Reveal>
            <TripBuilder />
          </Reveal>
        </div>
      </div>
    </>
  );
}
