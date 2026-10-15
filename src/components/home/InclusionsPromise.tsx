"use client";

import { motion } from "framer-motion";
import { inclusionsPromise } from "@/data/home-content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InclusionsPromise() {
  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="What private planning includes"
          title="The quiet details that keep Egypt feeling held"
          description="Every written proposal lists what is in — and what is out — so you are never guessing on arrival day."
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {inclusionsPromise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-[1.6rem] bg-shade px-6 py-7 text-paper"
            >
              <p className="text-[11px] tracking-[0.18em] text-sand uppercase">
                0{index + 1}
              </p>
              <h3 className="display mt-3 text-2xl text-white md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
