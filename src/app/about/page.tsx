import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { DarkCtaBand } from "@/components/ui/DarkCtaBand";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { GuideVoiceCards } from "@/components/premium/GuideVoiceCards";

export const metadata: Metadata = {
  title: "About",
  description:
    "Egypt Land Escapes plans private Egypt tours with local coordination — day tours, Nile cruises, desert camps, and Red Sea recovery days.",
};

const pillars = [
  [
    "Private first",
    "No forced group-bus days. Your vehicle, your guide language, your pace through Giza, Luxor, and beyond.",
  ],
  [
    "Written before booking",
    "Nights, inclusions, cruise category, and transfers appear in a clear proposal you can compare calmly.",
  ],
  [
    "Local coordination",
    "On-ground ops for pickups, temple timing, desert logistics, and the small details that keep a trip quiet.",
  ],
  [
    "Human reply",
    "WhatsApp for speed, the form for longer briefs — demo lines now, your real numbers later.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${siteConfig.name}`}
        title={
          <>
            A quieter way
            <span className="mt-1 block italic text-sand">to see Egypt</span>
          </>
        }
        description="Private pacing. Clear inclusions. A local team that answers before the trip — not only on arrival day."
        image="https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Egypt journey atmosphere"
        height="lg"
        actions={
          <>
            <ButtonLink href="/tours">Browse tours</ButtonLink>
            <ButtonLink
              href="/customize"
              variant="ghost"
              className="!border-white/25 !bg-white/8 !text-white hover:!bg-white/16"
            >
              Customize a journey
            </ButtonLink>
          </>
        }
      />

      <div className="section-pad py-16 md:py-24">
        <Reveal>
          <div className="container-page grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionHeading
              eyebrow="Our approach"
              title="Atmosphere over checklist tourism"
              description="We design around Egypt’s classic arc — then soften it for the people actually traveling."
            />
            <div className="space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              <p>
                Egypt Land Escapes is built for travelers who want the great story
                without the scramble: Cairo and Giza, Luxor and Aswan, optional Nile
                cruising, desert nights, and Red Sea downtime when the temples have
                been enough.
              </p>
              <p>
                We start with a published itinerary or a blank brief. Then we tune
                walking load, hotel level, guide language, free mornings, and cruise
                direction until the route fits couples, families, seniors, friends,
                or private groups.
              </p>
              <p>
                This MVP uses demo contact details and sample journeys so you can
                review structure, tone, and booking flow before swapping in real
                tours, photography, and phone numbers. When you enquire, you receive
                a written outline — nights, transport, guiding, and what is included
                — so you can compare calmly before confirming.
              </p>
            </div>
          </div>
        </Reveal>

        <Stagger className="container-page mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(([title, text]) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-[1.5rem] soft-panel p-5 transition duration-500 hover:-translate-y-1">
                <h2 className="display text-2xl text-ink">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="container-page mt-16">
          <Reveal>
            <GuideVoiceCards />
          </Reveal>
        </div>

        <div className="container-page mt-16">
          <DarkCtaBand
            eyebrow="How we work with you"
            title="Tell us the month, the travelers, and the feeling you want. We shape the route in writing."
            description="Whether you need a single Giza morning or a twelve-day private arc with cruise and beach, the first step is a clear conversation — WhatsApp or form — followed by a proposal you can actually use."
            actions={
              <>
                <ButtonLink
                  href="/tours"
                  variant="secondary"
                  className="btn-on-light"
                >
                  Browse tours
                </ButtonLink>
                <ButtonLink
                  href={buildWhatsAppUrl(generalEnquiryMessage())}
                  external
                  variant="ghost"
                  className="!border-white/25 !text-paper hover:!bg-white/10"
                >
                  WhatsApp {siteConfig.contact.phoneDisplay}
                </ButtonLink>
              </>
            }
          />
        </div>
      </div>
    </>
  );
}
