import type { Metadata } from "next";
import Link from "next/link";
import { getToursByCategory } from "@/data/tours";
import { TourCard } from "@/components/tours/TourCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { DarkCtaBand } from "@/components/ui/DarkCtaBand";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CabinPeek } from "@/components/premium/CabinPeek";

export const metadata: Metadata = {
  title: "Nile Cruises",
  description:
    "Compare Luxor–Aswan and Aswan–Luxor Nile cruises with private touring, cabin matching, and clear written proposals from Egypt Land Escapes.",
};

const directions = [
  {
    title: "Luxor → Aswan",
    text: "Start with Karnak and the West Bank, then sail south through Edfu and Kom Ombo toward Philae and Aswan’s softer river light.",
  },
  {
    title: "Aswan → Luxor",
    text: "Open with Philae and Nubian atmosphere, sail north, and finish among Luxor’s temples — strong if you arrive from Abu Simbel.",
  },
];

const cabinNotes = [
  {
    title: "Standard private comfort",
    text: "Clean cabin category, full-board style meals on cruise days, and guided temple stops as listed.",
  },
  {
    title: "Higher-category polish",
    text: "Upgraded cabins, quieter decks, and a more refined onboard rhythm for travelers who want extra ease.",
  },
  {
    title: "Dahabiya-style calm",
    text: "Smaller sailing character when available — slower nights, fewer cabins, more atmosphere on the water.",
  },
];

export default function NileCruisesPage() {
  const cruises = getToursByCategory("nile-cruise");

  return (
    <>
      <PageHero
        eyebrow="Nile cruises"
        title={
          <>
            Cabin nights
            <span className="mt-1 block italic text-sand">between temples</span>
          </>
        }
        description="Compare sailing direction, trip length, and cabin feel — then lock a private land-touring plan around your cruise dates."
        image="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Nile cruise journey"
        height="lg"
        actions={
          <>
            <ButtonLink href="/customize">Customize a cruise route</ButtonLink>
            <ButtonLink
              href="/tours?category=nile-cruise"
              variant="ghost"
              className="!border-white/25 !bg-white/10 !text-white"
            >
              All cruise tours
            </ButtonLink>
          </>
        }
      />

      <div className="section-pad py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Choose your direction"
              title="Same temples. Different opening chapter."
              description="Both sailings visit the great stops. Direction changes logistics, flight connections, and how the journey feels day one."
            />
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
            {directions.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group h-full rounded-[1.6rem] soft-panel p-6 transition duration-500 hover:-translate-y-1">
                  <h2 className="display text-3xl text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-20">
            <Reveal>
              <SectionHeading
                eyebrow="Cabin & vessel feel"
                title="Match the boat to your comfort brief"
                description="Peek cabin light, then read the category notes — your written proposal confirms the exact cruise available for your dates."
              />
            </Reveal>
            <div className="mt-10">
              <CabinPeek />
            </div>
            <Stagger className="mt-6 grid gap-4 md:grid-cols-3">
              {cabinNotes.map((item, index) => (
                <StaggerItem key={item.title}>
                  <div className="soft-panel h-full rounded-[1.5rem] p-5 transition duration-500 hover:border-nile/40">
                    <p className="text-[11px] tracking-[0.16em] text-nile uppercase">
                      0{index + 1}
                    </p>
                    <h3 className="display mt-2 text-2xl text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm text-ink-soft">{item.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-20">
            <Reveal>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <SectionHeading
                  eyebrow="Featured sailings"
                  title="Start with a published Nile cruise"
                  description="Open a sample itinerary, then reshape nights or add Cairo and Red Sea chapters."
                />
                <Link
                  href="/tours?category=nile-cruise"
                  className="text-sm font-semibold text-nile"
                >
                  See all →
                </Link>
              </div>
            </Reveal>
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cruises.map((tour) => (
                <StaggerItem key={tour.slug}>
                  <TourCard tour={tour} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-20">
            <DarkCtaBand
              eyebrow="Need a recommendation?"
              title="Not sure which direction fits your flights?"
              description="Send arrival city, preferred month, and hotel level — we’ll propose a sailing that protects temple time without rushed connections."
              actions={
                <>
                  <ButtonLink
                    href="/customize"
                    variant="secondary"
                    className="btn-on-light"
                  >
                    Request a cruise proposal
                  </ButtonLink>
                  <ButtonLink
                    href="/tailor-made"
                    variant="ghost"
                    className="!border-white/25 !text-paper"
                  >
                    Full tailor-made journey
                  </ButtonLink>
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
