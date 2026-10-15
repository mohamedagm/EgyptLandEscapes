"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { beforeAfter } from "@/data/atelier";
import { cn } from "@/lib/utils";

export function BeforeAfterItinerary() {
  const [mode, setMode] = useState<"rush" | "private">("private");
  const data = beforeAfter[mode];

  return (
    <section>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="display text-3xl text-ink">Same morning. Two feelings.</h2>
          <p className="mt-2 max-w-xl text-sm text-ink-soft">
            How private pacing differs from a fixed group rush — on a day like
            yours.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex gap-2">
          {(["rush", "private"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              className={cn(
                "flex-1 rounded-2xl border px-4 py-4 text-left transition",
                mode === key
                  ? "border-nile/40 bg-nile/10"
                  : "border-[color:var(--chip-border)] bg-[color:var(--field-bg)]",
              )}
            >
              <p className="text-sm font-semibold text-ink">
                {beforeAfter[key].title}
              </p>
              <p className="mt-1 text-xs text-ink-soft">
                {key === "rush" ? "Fixed coach pace" : "Held privately"}
              </p>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.ul
            key={mode}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="space-y-3 rounded-[1.5rem] soft-panel p-6"
          >
            {data.lines.map((line) => (
              <li
                key={line}
                className="border-s-2 border-nile/35 ps-4 text-sm text-ink-soft"
              >
                {line}
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
