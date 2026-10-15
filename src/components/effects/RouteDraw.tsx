"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getBuilderChapter } from "@/data/trip-builder";

export function RouteDraw({ days }: { days: Array<string | null> }) {
  const reduceMotion = useReducedMotion();
  const stops = useMemo(
    () =>
      days
        .map((id, index) => ({ index, chapter: id ? getBuilderChapter(id) : null }))
        .filter((item) => item.chapter),
    [days],
  );

  if (stops.length < 2) {
    return (
      <div className="rounded-2xl border border-dashed border-[color:var(--chip-border)] bg-[color:var(--field-bg)] px-4 py-3 text-xs text-ink-soft">
        Place at least two chapters to draw your route line.
      </div>
    );
  }

  const width = Math.max(320, stops.length * 88);
  const height = 64;
  const points = stops.map((_, i) => {
    const x = 28 + (i * (width - 56)) / (stops.length - 1);
    const y = height / 2 + (i % 2 === 0 ? -8 : 8);
    return { x, y };
  });
  const d = points
    .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className="overflow-x-auto rounded-2xl border border-[color:var(--chip-border)] bg-[color:var(--muted-surface)] px-2 py-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-16 w-full min-w-[280px]"
        role="img"
        aria-label="Drawn route between trip days"
      >
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="var(--nile)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={
            reduceMotion
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0.4 }
          }
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {points.map((point, i) => (
          <g key={`${stops[i].index}-${stops[i].chapter?.id}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="var(--sand)"
              stroke="var(--nile)"
              strokeWidth="1.5"
            />
            <text
              x={point.x}
              y={point.y + 18}
              textAnchor="middle"
              className="fill-[color:var(--ink-soft)]"
              fontSize="9"
            >
              D{stops[i].index + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
