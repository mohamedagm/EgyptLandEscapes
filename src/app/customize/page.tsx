import type { Metadata } from "next";
import { CustomizeForm } from "@/components/customize/CustomizeForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Customize Your Egypt Tour",
  description:
    "Design a private Egypt itinerary around your dates, hotel level, Nile cruise preference, and travel style with Egypt Land Escapes.",
};

const steps = [
  {
    title: "Share the essentials",
    text: "Dates, travelers, hotel feel, and what matters most — temples, Nile, desert, or beach.",
  },
  {
    title: "Receive a written outline",
    text: "We reply with a paced route, inclusions, and a clear starting proposal.",
  },
  {
    title: "Refine before you lock",
    text: "Adjust nights, cruise direction, or free days until the plan fits — then confirm.",
  },
];

export default function CustomizePage() {
  return (
    <>
      <PageHero
        eyebrow="Tailor-made request"
        title={
          <>
            Build a private Egypt route
            <span className="mt-1 block italic text-sand">
              around your month
            </span>
          </>
        }
        description="Fill the brief once. We’ll open WhatsApp with your details ready — then send a written proposal you can compare calmly."
        image="https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Customize a private Egypt journey"
        height="md"
        actions={
          <>
            <ButtonLink href="#brief" variant="primary">
              Jump to brief
            </ButtonLink>
            <ButtonLink
              href="/tours"
              variant="ghost"
              className="!border-white/25 !bg-white/8 !text-white hover:!bg-white/16"
            >
              Browse published tours
            </ButtonLink>
          </>
        }
      />

      <div className="section-pad py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="A clearer brief. A stronger proposal."
              description="The more we know about pace and priorities, the less back-and-forth before your first written outline."
            />
            <Stagger className="mt-8 space-y-5">
              {steps.map((step, index) => (
                <StaggerItem key={step.title}>
                  <div className="border-s-2 border-nile/35 ps-4">
                    <p className="text-[11px] tracking-[0.16em] text-nile uppercase">
                      0{index + 1}
                    </p>
                    <h2 className="display mt-1 text-2xl text-ink">{step.title}</h2>
                    <p className="mt-2 text-sm text-ink-soft">{step.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-8 rounded-[1.5rem] soft-panel p-5 text-sm text-ink-soft">
              Prefer a short chat first? WhatsApp{" "}
              <span className="font-semibold text-ink">
                {siteConfig.contact.phoneDisplay}
              </span>{" "}
              or browse ready itineraries.
              <div className="mt-4">
                <ButtonLink
                  href="/tours"
                  variant="ghost"
                  className="!py-2.5 !text-xs"
                >
                  Browse published tours
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              id="brief"
              className="scroll-mt-28 rounded-[1.75rem] soft-panel p-6 md:p-8"
            >
              <h2 className="display text-3xl text-ink">Your travel brief</h2>
              <p className="mt-2 mb-6 text-sm text-ink-soft">
                Don’t send passport or card details here — just planning notes.
              </p>
              <CustomizeForm />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
