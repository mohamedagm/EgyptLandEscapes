"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    title: "Private by default",
    text: "Your vehicle, your guide language, your pace — no bus-group rush through sacred places.",
  },
  {
    title: "Written before you book",
    text: "Clear inclusions, hotel level, and timing in a simple proposal you can compare calmly.",
  },
  {
    title: "Local coordination",
    text: "On-ground team for pickups, cruise timing, desert logistics, and last-mile changes.",
  },
  {
    title: "WhatsApp-first support",
    text: "Fast answers while you compare dates, cabins, walking comfort, and free days.",
  },
];

export function WhyUs() {
  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionHeading
            eyebrow="Why travel with us"
            title="Less logistics. More Egypt."
            description="We keep the planning quiet and the days clear — temples when the light is right, river nights when you want them, beach days when you need them."
          />
          <p className="max-w-md justify-self-end text-sm leading-relaxed text-ink-soft lg:text-right">
            Egypt Land Escapes is built for travelers who want atmosphere over
            checklist tourism — private, paced, and confirmed in writing.
          </p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="relative border-t border-nile/35 pt-6"
            >
              <p className="display absolute -top-5 right-0 text-5xl text-nile/15">
                0{index + 1}
              </p>
              <h3 className="display text-2xl text-ink md:text-[1.7rem]">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
