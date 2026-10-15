"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";
import type { TourCategory } from "@/data/tours";
import { categoryLabels } from "@/data/tours";

type StepKey = "traveler" | "duration" | "priority" | "result";

const travelers = [
  { id: "family", label: "Family with children" },
  { id: "couple", label: "Couple / honeymoon" },
  { id: "senior", label: "Senior / softer pace" },
  { id: "friends", label: "Friends or group" },
  { id: "solo", label: "Solo traveler" },
] as const;

const durations = [
  { id: "short", label: "3–5 days", hint: "Focused chapter" },
  { id: "essential", label: "6–7 days", hint: "Essential Egypt" },
  { id: "classic", label: "8–10 days", hint: "Classic + Nile" },
  { id: "long", label: "11–15+ days", hint: "Complete journey" },
] as const;

const priorities = [
  {
    id: "classic",
    label: "Pyramids & classic highlights",
    category: "packages" as TourCategory,
    href: "/tours?category=packages",
    blurb:
      "A balanced first visit: Giza, Cairo, Luxor/Aswan, and optional Nile nights.",
  },
  {
    id: "nile",
    label: "Nile cruise & temples",
    category: "nile-cruise" as TourCategory,
    href: "/tours?category=nile-cruise",
    blurb:
      "Cabin nights between Luxor and Aswan with guided temple mornings.",
  },
  {
    id: "family",
    label: "Family balance + beach",
    category: "packages" as TourCategory,
    href: "/tours?category=packages&duration=classic",
    blurb:
      "Culture days with softer pacing and Red Sea recovery built in.",
  },
  {
    id: "desert",
    label: "Adventure & desert",
    category: "desert" as TourCategory,
    href: "/tours?category=desert",
    blurb:
      "Oasis drives, White Desert camping, and wilder atmosphere chapters.",
  },
  {
    id: "day",
    label: "Private day touring only",
    category: "day-tours" as TourCategory,
    href: "/tours?category=day-tours",
    blurb:
      "Same-day private touring from Cairo, Luxor, or cruise ports.",
  },
  {
    id: "custom",
    label: "Fully tailor-made",
    category: "custom" as TourCategory,
    href: "/tailor-made",
    blurb:
      "Your dates, pace, hotel level, and accessibility notes in a written quote.",
  },
] as const;

export function TourFinder() {
  const [step, setStep] = useState<StepKey>("traveler");
  const [traveler, setTraveler] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [priority, setPriority] = useState<(typeof priorities)[number] | null>(
    null,
  );

  const progress = useMemo(() => {
    if (step === "traveler") return 25;
    if (step === "duration") return 50;
    if (step === "priority") return 75;
    return 100;
  }, [step]);

  return (
    <section className="section-pad py-16 md:py-24">
      <div className="container-page overflow-hidden rounded-[2rem] soft-panel">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-ink/8 bg-nile-deep px-6 py-10 text-paper md:px-10 lg:border-b-0 lg:border-r lg:border-white/10">
            <p className="text-[11px] tracking-[0.22em] text-sand uppercase">
              Private tour finder
            </p>
            <h2 className="display mt-3 text-3xl md:text-4xl">
              Build a starting point around your time and travel style
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/75">
              Answer three calm questions. We recommend a category — then you
              browse real itineraries or ask for a custom written proposal.
            </p>
            <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-sand transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-xs tracking-[0.14em] text-paper/55 uppercase">
              Step{" "}
              {step === "traveler"
                ? "1"
                : step === "duration"
                  ? "2"
                  : step === "priority"
                    ? "3"
                    : "4"}{" "}
              of 4
            </p>
          </div>

          <div className="px-6 py-10 md:px-10">
            {step === "traveler" ? (
              <div>
                <SectionHeading
                  title="Who is traveling?"
                  description="This helps set walking load, rooming, and daily pace."
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {travelers.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setTraveler(item.id);
                        setStep("duration");
                      }}
                      className={cn(
                        "rounded-2xl border px-4 py-4 text-left text-sm font-medium transition",
                        traveler === item.id
                          ? "border-nile bg-nile/15 text-nile"
                          : "choice-chip",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === "duration" ? (
              <div>
                <SectionHeading
                  title="How many days do you have?"
                  description="More cities are not always better — we protect sightseeing quality."
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {durations.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setDuration(item.id);
                        setStep("priority");
                      }}
                      className={cn(
                        "rounded-2xl border px-4 py-4 text-left transition",
                        duration === item.id
                          ? "border-nile bg-nile/15 text-nile"
                          : "choice-chip",
                      )}
                    >
                      <span className="block font-semibold text-ink">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs text-ink-soft">
                        {item.hint}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-5 text-sm text-nile"
                  onClick={() => setStep("traveler")}
                >
                  ← Back
                </button>
              </div>
            ) : null}

            {step === "priority" ? (
              <div>
                <SectionHeading
                  title="What matters most?"
                  description="Pick the feeling you want the trip to center on."
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {priorities.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setPriority(item);
                        setStep("result");
                      }}
                      className="choice-chip rounded-2xl px-4 py-4 text-left transition"
                    >
                      <span className="block font-semibold text-ink">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs text-ink-soft">
                        {categoryLabels[item.category]}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-5 text-sm text-nile"
                  onClick={() => setStep("duration")}
                >
                  ← Back
                </button>
              </div>
            ) : null}

            {step === "result" && priority ? (
              <div>
                <p className="eyebrow">Recommended starting category</p>
                <h3 className="display mt-3 text-3xl text-ink md:text-4xl">
                  {categoryLabels[priority.category]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
                  {priority.blurb}
                </p>
                <p className="mt-3 text-xs text-ink-soft">
                  Based on: {travelers.find((t) => t.id === traveler)?.label} ·{" "}
                  {durations.find((d) => d.id === duration)?.label}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={priority.href}>
                    Open recommended tours
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="ghost">
                    Request a custom quote
                  </ButtonLink>
                </div>
                <button
                  type="button"
                  className="mt-6 text-sm text-nile"
                  onClick={() => {
                    setStep("traveler");
                    setTraveler("");
                    setDuration("");
                    setPriority(null);
                  }}
                >
                  Start over
                </button>
                <p className="mt-4 text-xs text-ink-soft">
                  Or browse everything in the{" "}
                  <Link href="/tours" className="font-semibold text-nile">
                    full catalog
                  </Link>
                  .
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
