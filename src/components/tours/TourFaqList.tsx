"use client";

import { useState } from "react";
import type { TourFaq } from "@/lib/tour-detail";
import { cn } from "@/lib/utils";

export function TourFaqList({ items }: { items: TourFaq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section>
      <h2 className="display text-3xl text-ink">Tour questions</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        Practical answers before you enquire — refine with your real booking
        policy later.
      </p>
      <div className="mt-6 space-y-3">
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <div
              key={item.q}
              className="soft-panel overflow-hidden rounded-[1.35rem]"
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
                <span className={cn("text-nile transition", isOpen && "rotate-45")}>
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
    </section>
  );
}
