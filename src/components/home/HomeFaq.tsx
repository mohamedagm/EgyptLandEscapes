"use client";

import { useState } from "react";
import { homeFaqs } from "@/data/home-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function HomeFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Good questions"
          title="Before you send the first WhatsApp"
          description="A few calm answers for first-time Egypt planners. Demo copy for MVP — refine with your real policies later."
          className="max-w-xl lg:sticky lg:top-28 lg:self-start"
        />

        <div className="space-y-3">
          {homeFaqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.q}
                className="soft-panel overflow-hidden rounded-[1.4rem]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="display text-lg text-ink md:text-xl">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "text-nile transition",
                      isOpen && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <p className="border-t border-ink/8 px-5 pb-5 pt-3 text-sm leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
