"use client";

import { motion } from "framer-motion";
import { manifesto } from "@/data/home-content";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function EditorialIntro() {
  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">{manifesto.eyebrow}</p>
          <h2 className="display mt-4 text-4xl text-ink md:text-5xl lg:text-[3.4rem]">
            {manifesto.title}
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/tours">Browse private tours</ButtonLink>
            <ButtonLink href="/tailor-made" variant="ghost">
              Build a custom route
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-6">
          {manifesto.body.map((paragraph, index) => (
            <motion.p
              key={paragraph.slice(0, 24)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
