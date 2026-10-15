"use client";

import { motion } from "framer-motion";
import { seasons } from "@/data/home-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function TravelSeasons() {
  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page overflow-hidden rounded-[2rem] bg-nile-deep px-6 py-12 text-paper md:px-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-sand uppercase">
              When to go
            </p>
            <h2 className="display mt-3 text-4xl md:text-5xl">
              Season shapes the feeling
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/75 md:text-base">
              We don’t force a calendar. We match heat, crowds, cruise demand,
              and your walking comfort to the month you actually have.
            </p>
            <div className="mt-8">
              <ButtonLink
                href="/contact"
                variant="secondary"
                className="btn-on-light"
              >
                Ask for your month
              </ButtonLink>
            </div>
          </div>

          <div className="space-y-0">
            {seasons.map((season, index) => (
              <motion.div
                key={season.name}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="border-t border-white/12 py-6 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="text-xs tracking-[0.18em] text-sand uppercase">
                    {season.name}
                  </p>
                  <h3 className="display text-2xl text-white">{season.title}</h3>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/75">
                  {season.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
