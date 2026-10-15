"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { seasons } from "@/data/home-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/effects/Magnetic";
import { cn } from "@/lib/utils";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Fixed positions — avoid SSR/client float drift from Math.cos/sin */
const monthPositions = [
  { left: "50%", top: "8%" },
  { left: "71%", top: "13.627%" },
  { left: "86.373%", top: "29%" },
  { left: "92%", top: "50%" },
  { left: "86.373%", top: "71%" },
  { left: "71%", top: "86.373%" },
  { left: "50%", top: "92%" },
  { left: "29%", top: "86.373%" },
  { left: "13.627%", top: "71%" },
  { left: "8%", top: "50%" },
  { left: "13.627%", top: "29%" },
  { left: "29%", top: "13.627%" },
] as const;

function seasonForMonth(monthIndex: number) {
  if (monthIndex === 11 || monthIndex === 0) return seasons[2]; // Dec–Jan festive
  if (monthIndex >= 4 && monthIndex <= 8) return seasons[1]; // May–Sep
  return seasons[0]; // Oct–Apr prime
}

const hues = [
  "from-[#0d4a55] to-[#1a2a24]", // Jan
  "from-[#0a5866] to-[#2a3a28]", // Feb
  "from-[#5a3a22] to-[#1a2420]", // Mar
  "from-[#0d4a55] to-[#243028]", // Apr
  "from-[#6a4020] to-[#1e2822]", // May
  "from-[#7a4a24] to-[#221c16]", // Jun
  "from-[#8a5528] to-[#1a1814]", // Jul
  "from-[#7a4a24] to-[#1e1a16]", // Aug
  "from-[#5a4030] to-[#1a2420]", // Sep
  "from-[#0d4a55] to-[#243028]", // Oct
  "from-[#0a5866] to-[#1a2a28]", // Nov
  "from-[#0d4550] to-[#1a2428]", // Dec
];

export function SeasonDial() {
  const reduceMotion = useReducedMotion();
  // Stable SSR default; sync to the visitor's month after mount
  const [month, setMonth] = useState(9);
  const active = useMemo(() => seasonForMonth(month), [month]);
  const needleRotation = month * 30;

  useEffect(() => {
    setMonth(new Date().getMonth());
  }, []);

  return (
    <section className="section-pad py-20 md:py-28">
      <div
        className={cn(
          "container-page overflow-hidden rounded-[2rem] bg-gradient-to-br px-6 py-12 text-paper transition-[background] duration-700 md:px-12 md:py-16",
          hues[month],
        )}
      >
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="When to go"
              title="Turn the month. Feel the light change."
              description="Tap any month — the panel warmth shifts with heat, Nile demand, and walking comfort."
              className="!max-w-xl [&_.display]:text-white [&_.eyebrow]:text-sand [&_p]:text-paper/75"
            />
            <p className="mt-6 text-sm text-sand">
              Selected:{" "}
              <span className="font-semibold text-white">{months[month]}</span>
            </p>
            <div className="mt-4 rounded-[1.25rem] border border-white/15 bg-white/8 p-5 backdrop-blur">
              <p className="text-xs tracking-[0.16em] text-sand uppercase">
                {active.name}
              </p>
              <h3 className="display mt-2 text-2xl text-white">{active.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">
                {active.text}
              </p>
            </div>
            <div className="mt-6">
              <Magnetic>
                <ButtonLink
                  href="/customize"
                  magnetic={false}
                  className="btn-on-light"
                >
                  Plan around this month
                </ButtonLink>
              </Magnetic>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md select-none">
            <div
              className="pointer-events-none absolute inset-[12%] rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              aria-hidden
            />

            <motion.div
              className="pointer-events-none absolute inset-0 z-[1]"
              aria-hidden
              animate={
                reduceMotion ? undefined : { rotate: needleRotation }
              }
              transition={{ type: "spring", stiffness: 70, damping: 18 }}
            >
              <div className="absolute left-1/2 top-[14%] h-[22%] w-1 -translate-x-1/2 rounded-full bg-sand shadow-[0_0_12px_rgba(232,201,138,0.55)]" />
            </motion.div>

            <div className="absolute inset-0 z-[2]">
              {months.map((label, index) => {
                const selected = index === month;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setMonth(index)}
                    aria-pressed={selected}
                    aria-label={`Select ${label}`}
                    className={cn(
                      "absolute z-[3] -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-semibold tracking-wide uppercase transition",
                      "min-h-10 min-w-10 touch-manipulation",
                      selected
                        ? "bg-sand text-ink shadow-lg"
                        : "bg-white/15 text-paper/85 hover:bg-white/30",
                    )}
                    style={monthPositions[index]}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center">
              <div className="rounded-full border border-white/20 bg-shade/40 px-5 py-4 text-center backdrop-blur">
                <p className="text-[10px] tracking-[0.2em] text-sand uppercase">
                  Dial
                </p>
                <p className="display mt-1 text-3xl text-white">
                  {months[month]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
