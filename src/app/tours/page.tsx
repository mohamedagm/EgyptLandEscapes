import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToursExplorer } from "@/components/tours/ToursExplorer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JournalStrip } from "@/components/home/JournalStrip";
import { TravelerTypes } from "@/components/home/TravelerTypes";
import { ComfortLevels } from "@/components/home/ComfortLevels";
import { HomeFaq } from "@/components/home/HomeFaq";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { DarkCtaBand } from "@/components/ui/DarkCtaBand";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Browse private Egypt day tours, classic packages, Nile cruises, desert safaris, and Red Sea days with Egypt Land Escapes.",
};

const chooseSteps = [
  {
    title: "Pick a style",
    text: "Day tour, multi-city package, Nile cruise, desert, Red Sea, or fully custom — start with the shape that matches your time.",
  },
  {
    title: "Open the sample itinerary",
    text: "Read highlights, inclusions, and pacing notes. Treat every published route as a draft you can reshape.",
  },
  {
    title: "Enquire with your dates",
    text: "WhatsApp or form — share travelers, month, hotel style, and walking comfort. We reply with a written proposal.",
  },
];

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour catalog"
        title={
          <>
            Twelve starting points.
            <span className="mt-1 block italic text-sand">
              Endless private ways to reshape them.
            </span>
          </>
        }
        description="Filter by style, open a sample itinerary, then enquire on WhatsApp or the form. Every route is a door into private planning — not a locked group departure."
        image="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Private Egypt touring"
        objectPosition="object-[center_35%]"
        height="md"
        actions={
          <>
            <ButtonLink href="/customize" variant="primary">
              Customize a route
            </ButtonLink>
            <ButtonLink
              href="/tailor-made"
              variant="ghost"
              className="!border-white/25 !bg-white/8 !text-white hover:!bg-white/16"
            >
              Prefer tailor-made?
            </ButtonLink>
          </>
        }
      />

      <div className="section-pad py-14 md:py-20">
        <div className="container-page">
          <Reveal>
            <Stagger className="grid gap-6 rounded-[1.75rem] soft-panel p-6 md:grid-cols-3 md:p-8">
              {chooseSteps.map((step, index) => (
                <StaggerItem key={step.title}>
                  <p className="text-[11px] tracking-[0.18em] text-nile uppercase">
                    0{index + 1}
                  </p>
                  <h2 className="display mt-2 text-2xl text-ink">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.text}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal className="mt-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Browse the catalog"
                title="Find a route that already feels close"
                description="Use the filters once — then open any tour for highlights, sample days, and a WhatsApp enquiry with the tour name ready."
              />
              <ButtonLink href="/tailor-made" variant="ghost" className="self-start">
                Prefer tailor-made?
              </ButtonLink>
            </div>
          </Reveal>

          <div className="mt-10">
            <Suspense
              fallback={
                <p className="text-ink-soft">Loading journeys…</p>
              }
            >
              <ToursExplorer />
            </Suspense>
          </div>
        </div>
      </div>

      <Reveal>
        <TravelerTypes />
      </Reveal>
      <Reveal>
        <ComfortLevels />
      </Reveal>

      <section className="section-pad pb-10">
        <div className="container-page">
          <DarkCtaBand
            tone="ink"
            eyebrow="Still choosing?"
            title="Tell us the month. We’ll suggest the shape."
            description="Temples only, Nile nights, desert sky, or Red Sea recovery — send the basics and we return a calm starting proposal in writing."
            actions={
              <>
                <ButtonLink
                  href="/customize"
                  variant="secondary"
                  className="btn-on-light"
                >
                  Customize
                </ButtonLink>
                <ButtonLink
                  href="/destinations"
                  variant="ghost"
                  className="!border-white/20 !text-paper"
                >
                  Destinations
                </ButtonLink>
              </>
            }
          />
        </div>
      </section>

      <Reveal>
        <JournalStrip />
      </Reveal>
      <Reveal>
        <HomeFaq />
      </Reveal>
    </>
  );
}
