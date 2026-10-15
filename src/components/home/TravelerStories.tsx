"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { stories } from "@/data/home-content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TravelerStories() {
  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Traveler notes"
          title="Quiet praise. Private pacing."
          description="Demo reviews for the MVP — replace with TripAdvisor or Google quotes when you’re ready."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="overflow-hidden rounded-[1.75rem] soft-panel"
            >
              <div className="relative h-44">
                <Image
                  src={story.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
              <div className="space-y-5 p-6 pt-2">
                <p className="display text-2xl leading-snug text-ink">
                  “{story.quote}”
                </p>
                <div>
                  <p className="font-semibold text-ink">{story.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{story.detail}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
