"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SandLoader() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="section-pad flex min-h-[60vh] items-center justify-center py-24">
      <div className="relative flex flex-col items-center">
        <div className="relative h-28 w-28">
          {Array.from({ length: 12 }).map((_, index) => {
            const angle = (index / 12) * Math.PI * 2;
            const x = Math.cos(angle) * 42;
            const y = Math.sin(angle) * 42;
            return (
              <motion.span
                key={index}
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand"
                style={{ boxShadow: "0 0 10px color-mix(in oklab, var(--sand) 50%, transparent)" }}
                initial={
                  reduceMotion
                    ? { opacity: 0.7, x: 0, y: 0 }
                    : { opacity: 0.2, x, y, scale: 0.6 }
                }
                animate={
                  reduceMotion
                    ? { opacity: [0.4, 1, 0.4] }
                    : {
                        opacity: [0.25, 1, 0.85],
                        x: [x, 0, 0],
                        y: [y, 0, 0],
                        scale: [0.55, 1, 0.9],
                      }
                }
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          })}
          <motion.div
            className="absolute inset-6 rounded-full border border-nile/25 bg-nile/10"
            animate={
              reduceMotion
                ? undefined
                : { scale: [0.92, 1, 0.92], opacity: [0.5, 1, 0.5] }
            }
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
        <p className="display mt-6 text-2xl text-ink">Egypt Land Escapes</p>
        <p className="mt-2 text-sm tracking-[0.18em] text-ink-soft uppercase">
          Gathering the journey…
        </p>
      </div>
    </div>
  );
}
