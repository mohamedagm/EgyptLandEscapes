"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { destinations } from "@/data/destinations";
import { atelierChapters } from "@/data/atelier";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function DestinationsMap() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(destinations[0]?.slug ?? "cairo");
  const [progress, setProgress] = useState(0);
  const current =
    destinations.find((item) => item.slug === active) ?? destinations[0];

  const scrubIndex = Math.min(
    atelierChapters.length - 1,
    Math.floor((progress / 100) * atelierChapters.length),
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    reduceMotion ? [1, 1] : [0.08, 1],
  );
  const mapY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["6%", "-4%"],
  );
  const glow = useTransform(
    scrollYProgress,
    [0.2, 0.6],
    reduceMotion ? [0.35, 0.35] : [0.2, 0.75],
  );

  const chapterHint = useMemo(
    () => atelierChapters[scrubIndex],
    [scrubIndex],
  );

  return (
    <section ref={sectionRef} className="section-pad py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Scroll story + scrubber"
          title="Watch the Nile thread as you move."
          description="Scroll to draw the river — or scrub the chapters to light each stop on the route."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0c1c1a] via-[#10241f] to-[#1a1810] p-4 md:p-6">
            <motion.div
              style={{ y: mapY }}
              className="relative mx-auto aspect-[4/5] w-full max-w-xl"
            >
              <svg
                viewBox="0 0 400 500"
                className="h-full w-full"
                role="img"
                aria-label="Stylized map of Egypt"
              >
                <defs>
                  <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1d3a34" />
                    <stop offset="100%" stopColor="#3a3224" />
                  </linearGradient>
                </defs>
                <path
                  d="M170 40 L250 55 L295 90 L330 130 L360 170 L355 220 L340 250 L360 290 L345 340 L300 390 L270 450 L230 480 L190 470 L170 420 L150 360 L120 300 L95 250 L90 200 L110 150 L140 90 Z"
                  fill="url(#land)"
                  stroke="#4eb4c4"
                  strokeOpacity="0.35"
                  strokeWidth="2"
                />
                <motion.path
                  d="M205 70 C210 140, 220 220, 230 300 C238 360, 245 410, 250 455"
                  fill="none"
                  stroke="#7ad4e0"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ pathLength, opacity: glow }}
                />
                <path
                  d="M330 160 C350 175, 370 185, 385 195"
                  fill="none"
                  stroke="#4eb4c4"
                  strokeWidth="3"
                  opacity="0.35"
                />
              </svg>

              {destinations.map((place) => {
                const isActive = place.slug === active;
                return (
                  <button
                    key={place.slug}
                    type="button"
                    onClick={() => setActive(place.slug)}
                    className={cn(
                      "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition",
                      isActive ? "z-10 scale-110" : "z-[1] hover:scale-105",
                    )}
                    style={{ left: `${place.map.x}%`, top: `${place.map.y}%` }}
                    aria-label={place.name}
                  >
                    <span
                      className={cn(
                        "block h-3.5 w-3.5 rounded-full border-2 border-white shadow",
                        isActive ? "bg-nile" : "bg-copper",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide uppercase shadow-sm",
                        isActive
                          ? "bg-nile text-white"
                          : "bg-shade/85 text-paper/90",
                      )}
                    >
                      {place.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}

              {atelierChapters.map((stop, i) => {
                const lit = i <= scrubIndex;
                return (
                  <span
                    key={`scrub-${stop.id}`}
                    className={cn(
                      "pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition",
                      lit
                        ? "bg-sand shadow-[0_0_12px_rgba(232,201,138,0.7)]"
                        : "bg-white/20",
                    )}
                    style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                  />
                );
              })}
            </motion.div>
            <p className="mt-3 text-center text-xs text-paper/55">
              Scroll to draw the Nile — scrub chapters below to light the route.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-[2rem] soft-panel p-6 md:p-8">
            <div>
              <p className="eyebrow">{current.region}</p>
              <h3 className="display mt-2 text-3xl text-ink md:text-4xl">
                {current.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
                {current.summary}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink">
                {current.highlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.16em] text-nile uppercase">
                Chapter scrubber · {chapterHint.label} · {chapterHint.day}
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(event) => setProgress(Number(event.target.value))}
                className="mt-3 w-full accent-[var(--nile)]"
                aria-label="Chapter scrubber"
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/destinations#${current.slug}`}
                  className="inline-flex rounded-full bg-nile px-5 py-2.5 text-sm font-semibold text-white hover:bg-nile-deep"
                >
                  Open destination
                </Link>
                <Link
                  href="/customize"
                  className="inline-flex rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:border-nile/30"
                >
                  Add to custom route
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
