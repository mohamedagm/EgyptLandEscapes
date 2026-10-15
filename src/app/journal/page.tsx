import type { Metadata } from "next";
import { journalPosts } from "@/data/journal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JournalCard } from "@/components/journal/JournalCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Egypt travel journal — planning notes on private tours, Nile cruises, seasons, desert nights, and Red Sea recovery.",
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel journal"
        title={
          <>
            Essays for travelers
            <span className="mt-1 block italic text-sand">
              who want Egypt without the scramble
            </span>
          </>
        }
        description="From first-time pacing to Nile direction and desert-versus-beach choices — written in a premium planning voice."
        image="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Egypt travel journal"
        height="sm"
        actions={
          <ButtonLink
            href="/customize"
            variant="ghost"
            className="!border-white/25 !bg-white/8 !text-white hover:!bg-white/16"
          >
            Ask for a proposal
          </ButtonLink>
        }
      />

      <div className="section-pad py-14 md:py-20">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <SectionHeading
                eyebrow="Read before you plan"
                title="Calm notes for private itineraries"
                description="Use these pieces as thinking companions — then send your month and we shape a route in writing."
              />
              <div className="rounded-[1.5rem] soft-panel p-5 text-sm leading-relaxed text-ink-soft">
                <p>
                  Prefer a human reply over another article? Send your month and
                  traveler details — we shape a private route in writing.
                </p>
                <div className="mt-4">
                  <ButtonLink
                    href="/contact"
                    variant="ghost"
                    className="!py-2.5 !text-xs"
                  >
                    Ask for a proposal
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {journalPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <JournalCard post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </>
  );
}
