import type { Tour } from "@/data/tours";

export function TourItineraryTimeline({
  itinerary,
}: {
  itinerary: Tour["itinerary"];
}) {
  return (
    <section>
      <h2 className="display text-3xl text-ink">Day-by-day / sample flow</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        A paced outline you can reshape — hotel level, free time, and temple
        order stay flexible until the written proposal.
      </p>

      <ol className="relative mt-8 space-y-0 border-s-2 border-nile/20 ms-3 ps-8">
        {itinerary.map((step, index) => (
          <li key={step.title} className="relative pb-8 last:pb-0">
            <span className="absolute -start-[2.55rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-nile text-xs font-semibold text-white">
              {index + 1}
            </span>
            <div className="rounded-[1.5rem] soft-panel p-5">
              <p className="text-[11px] tracking-[0.16em] text-nile uppercase">
                Chapter {index + 1}
              </p>
              <h3 className="display mt-2 text-2xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
