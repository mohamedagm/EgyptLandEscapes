"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Choose a starting tour",
    text: "Pick a published itinerary — or tell us you want something fully custom from the first message.",
  },
  {
    title: "Send dates on WhatsApp or the form",
    text: "Share travelers, month, hotel style, walking comfort, and anything that matters for pace.",
  },
  {
    title: "Receive a clear proposal",
    text: "We confirm inclusions and price in writing before anything is locked or paid.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page rounded-[2rem] soft-panel px-6 py-12 md:px-12 md:py-16">
        <SectionHeading
          eyebrow="How it works"
          title="Three quiet steps to a private trip"
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative text-center md:text-left"
            >
              {index < steps.length - 1 ? (
                <div className="pointer-events-none absolute top-8 right-[-20%] hidden h-px w-[40%] bg-gradient-to-r from-nile/30 to-transparent md:block" />
              ) : null}
              <p className="display text-6xl text-nile/20">0{index + 1}</p>
              <h3 className="mt-2 display text-2xl text-ink md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
