"use client";

import { motion } from "framer-motion";
import { durations } from "@/data/home-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function TripDurations() {
  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Choose by duration"
            title="More cities do not always make a better trip"
            description="A strong Egypt itinerary protects sightseeing quality by matching destinations, domestic connections, and daily walking to the time you actually have."
            className="max-w-3xl"
          />
          <ButtonLink href="/contact" variant="ghost" className="self-start">
            Tell us your dates
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {durations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="soft-panel rounded-[1.6rem] p-6"
            >
              <p className="text-[11px] tracking-[0.18em] text-nile uppercase">
                {item.range}
              </p>
              <h3 className="display mt-3 text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
