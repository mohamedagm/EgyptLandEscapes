"use client";

import { motion } from "framer-motion";
import { comfortLevels } from "@/data/home-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ComfortLevels() {
  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page rounded-[2rem] soft-panel px-6 py-12 md:px-12 md:py-16">
        <SectionHeading
          eyebrow="Comfort & value"
          title="Compare the whole service — not only the starting price"
          description="Hotel category, cruise standard, private transport, guide setup, domestic flights, and room configuration all change the final feeling of the journey."
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {comfortLevels.map((level, index) => (
            <motion.div
              key={level.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="border-t border-nile/30 pt-5"
            >
              <p className="text-[11px] tracking-[0.16em] text-nile uppercase">
                {level.label}
              </p>
              <h3 className="display mt-2 text-2xl text-ink">{level.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {level.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <ButtonLink href="/tailor-made">
            Request a comfort-matched quote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
