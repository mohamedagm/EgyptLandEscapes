"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Burst = {
  id: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

export function dispatchShortlistBurst(fromX: number, fromY: number) {
  const target = document.querySelector<HTMLElement>("[data-shortlist-fab]");
  const rect = target?.getBoundingClientRect();
  const toX = rect ? rect.left + rect.width / 2 : 48;
  const toY = rect ? rect.top + rect.height / 2 : window.innerHeight - 48;
  window.dispatchEvent(
    new CustomEvent("ele:shortlist-burst", {
      detail: { fromX, fromY, toX, toY },
    }),
  );
}

export function ShortlistBurstLayer() {
  const reduceMotion = useReducedMotion();
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const onBurst = (event: Event) => {
      if (reduceMotion) return;
      const detail = (event as CustomEvent).detail as Omit<Burst, "id">;
      const id = Date.now() + Math.random();
      setBursts((prev) => [...prev, { id, ...detail }]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((item) => item.id !== id));
      }, 900);
    };
    window.addEventListener("ele:shortlist-burst", onBurst);
    return () => window.removeEventListener("ele:shortlist-burst", onBurst);
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[85]" aria-hidden>
      <AnimatePresence>
        {bursts.map((burst) =>
          Array.from({ length: 7 }).map((_, index) => {
            const drift = (index - 3) * 10;
            return (
              <motion.span
                key={`${burst.id}-${index}`}
                className="absolute h-2.5 w-2.5 rounded-full"
                style={{
                  left: burst.fromX,
                  top: burst.fromY,
                  background:
                    index % 2 === 0
                      ? "var(--sand)"
                      : "var(--copper)",
                  boxShadow: "0 0 12px color-mix(in oklab, var(--sand) 60%, transparent)",
                }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: burst.toX - burst.fromX + drift,
                  y: burst.toY - burst.fromY,
                  scale: 0.35,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          }),
        )}
      </AnimatePresence>
    </div>
  );
}
