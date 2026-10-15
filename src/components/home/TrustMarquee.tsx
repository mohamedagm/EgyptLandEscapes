"use client";

import { trustSignals } from "@/data/home-content";

export function TrustMarquee() {
  const row = [...trustSignals, ...trustSignals];

  return (
    <section className="border-y border-white/10 bg-shade py-4 text-paper">
      <div className="marquee">
        <div className="marquee-track">
          {row.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-3 whitespace-nowrap text-xs tracking-[0.18em] uppercase"
            >
              <span className="h-1 w-1 rounded-full bg-sand" />
              <span className="text-paper/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
