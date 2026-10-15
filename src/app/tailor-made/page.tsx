import type { Metadata } from "next";
import { CustomizeForm } from "@/components/customize/CustomizeForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getFeaturedTours } from "@/data/tours";
import { TourCard } from "@/components/tours/TourCard";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Tailor-Made Egypt Tours",
  description:
    "Design a fully private Egypt holiday around your dates, pace, hotel level, Nile cruise preference, and travel style.",
};

const pillars = [
  {
    title: "Your dates, not a group calendar",
    text: "We build around arrival flights, walking comfort, and how many hotel changes you actually want.",
  },
  {
    title: "Written before anything locks",
    text: "Nights, inclusions, cruise category, and transfers appear in a proposal you can compare calmly.",
  },
  {
    title: "Private by default",
    text: "Guiding and transfers stay private. Shared elements (like a cruise vessel) are stated clearly.",
  },
];

const sampleShapes = [
  "Cairo + short Nile cruise",
  "Classic 8–10 day culture arc",
  "Pyramids, Nile & Red Sea recovery",
  "Desert night + temple days",
  "Family-soft pacing with beach",
  "Senior-friendly fewer moves",
];

export default function TailorMadePage() {
  const samples = getFeaturedTours().slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Tailor-made Egypt"
        title={
          <>
            A private journey
            <span className="mt-1 block italic text-sand">
              written for the people traveling
            </span>
          </>
        }
        description="Start from a blank brief — or reshape a published itinerary. Either way, you get a paced route and a clear proposal before booking."
        image="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Tailor-made private Egypt travel"
        objectPosition="object-[center_35%]"
        height="lg"
        actions={
          <>
            <ButtonLink href="#brief">Start your brief</ButtonLink>
            <ButtonLink
              href="/nile-cruises"
              variant="ghost"
              className="!border-white/25 !bg-white/10 !text-white"
            >
              Explore Nile options
            </ButtonLink>
          </>
        }
      />

      <div className="section-pad py-16 md:py-24">
        <div className="container-page">
          <Stagger className="grid gap-6 md:grid-cols-3">
            {pillars.map((item, index) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-[1.5rem] soft-panel p-6 transition duration-500 hover:-translate-y-1">
                  <p className="text-[11px] tracking-[0.16em] text-nile uppercase">
                    0{index + 1}
                  </p>
                  <h2 className="display mt-2 text-2xl text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Popular shapes"
                title="Most private trips start as one of these"
                description="Use them as language for your brief — not as locked packages."
              />
              <ul className="mt-8 space-y-3">
                {sampleShapes.map((item) => (
                  <li
                    key={item}
                    className="choice-chip rounded-2xl px-4 py-3 text-sm transition"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink href="/tours" variant="ghost">
                  Browse ready itineraries
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                id="brief"
                className="scroll-mt-28 rounded-[1.75rem] soft-panel p-6 md:p-8"
              >
                <h2 className="display text-3xl text-ink">Tell us your month</h2>
                <p className="mt-2 mb-6 text-sm text-ink-soft">
                  Submit the form to open WhatsApp with a ready brief for our
                  team.
                </p>
                <CustomizeForm />
              </div>
            </Reveal>
          </div>

          <div className="mt-20">
            <Reveal>
              <SectionHeading
                eyebrow="Need a starting draft?"
                title="Published journeys you can fully reshape"
              />
            </Reveal>
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {samples.map((tour) => (
                <StaggerItem key={tour.slug}>
                  <TourCard tour={tour} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </>
  );
}
