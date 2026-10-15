"use client";

import { useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Orb = {
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  tone: "sand" | "nile" | "pearl";
  blur: number;
  opacity: number;
};

function buildOrbs(count: number): Orb[] {
  // Mostly pearl/nile — avoid sand washing half the screen warm
  const tones: Orb["tone"][] = ["pearl", "nile", "pearl", "nile", "sand"];
  return Array.from({ length: count }, (_, index) => {
    const seed = index * 17 + 3;
    return {
      left: `${(seed * 7) % 94 + 3}%`,
      size: 5 + (seed % 22),
      duration: 20 + (seed % 24),
      delay: -((seed * 3) % 24),
      drift: ((seed % 11) - 5) * 12,
      tone: tones[index % tones.length],
      blur: 0.6 + (seed % 5) * 0.35,
      opacity: 0.12 + (seed % 4) * 0.04,
    };
  });
}

export function NightAtmosphere() {
  const reduceMotion = useReducedMotion();
  const orbs = useMemo(() => buildOrbs(22), []);

  return (
    <div
      className="night-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Slow breathing aurora */}
      <div className="night-aurora night-aurora-a" />
      <div className="night-aurora night-aurora-b" />
      <div className="night-aurora night-aurora-c" />

      {/* Soft horizon glow — quiet night, no teal/sand split */}
      <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Rising lantern orbs */}
      {!reduceMotion
        ? orbs.map((orb, index) => (
            <span
              key={index}
              className={`night-orb night-orb-${orb.tone}`}
              style={{
                left: orb.left,
                width: orb.size,
                height: orb.size,
                animationDuration: `${orb.duration}s`,
                animationDelay: `${orb.delay}s`,
                ["--orb-drift" as string]: `${orb.drift}px`,
                filter: `blur(${orb.blur}px)`,
                opacity: orb.opacity * 0.65,
              }}
            />
          ))
        : null}

      {/* Fine dust / stars */}
      <div className="night-dust" />

      {/* Soft vignette for comfort */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,6,5,0.55)_100%)]" />
    </div>
  );
}
