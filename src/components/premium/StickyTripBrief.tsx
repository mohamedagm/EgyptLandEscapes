"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getTourBySlug } from "@/data/tours";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useShortlist } from "@/components/shortlist/ShortlistProvider";

const BRIEF_PATHS = [/^\/tours(\/|$)/, /^\/trip-builder$/];

export function StickyTripBrief() {
  const pathname = usePathname();
  const { slugs, count, setOpen } = useShortlist();
  const allowed = BRIEF_PATHS.some((pattern) => pattern.test(pathname));

  const items = slugs
    .map((slug) => getTourBySlug(slug))
    .filter((tour): tour is NonNullable<typeof tour> => Boolean(tour));

  const places = Array.from(
    new Set(items.flatMap((tour) => tour.destinations)),
  ).slice(0, 4);
  const nightsHint = items[0]?.duration ?? "Mixed durations";

  const visible = allowed && count > 0;

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-brief",
      visible ? "on" : "off",
    );
    return () => document.documentElement.setAttribute("data-brief", "off");
  }, [visible]);

  if (!visible) return null;

  const message = [
    "Hello Egypt Land Escapes — sticky brief:",
    "",
    ...items.map(
      (tour, i) =>
        `${i + 1}. ${tour.title} (${tour.duration}${
          tour.priceFrom > 0 ? ` · from $${tour.priceFrom}` : ""
        })`,
    ),
    "",
    "Please shape a private proposal around these.",
  ].join("\n");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:p-4">
      <div className="pointer-events-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 rounded-full border border-[color:var(--chip-border)] bg-mist/95 px-4 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur md:px-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {count} journey{count === 1 ? "" : "s"} · {nightsHint}
          </p>
          <p className="truncate text-xs text-ink-soft">
            {places.length ? places.join(" · ") : "Private Egypt brief"}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border border-ink/15 px-3 py-2 text-xs font-semibold text-ink"
          >
            Edit
          </button>
          <a
            href={buildWhatsAppUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-nile px-4 py-2 text-xs font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
