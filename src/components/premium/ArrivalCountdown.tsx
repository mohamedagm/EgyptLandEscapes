"use client";

import { useEffect, useMemo, useState } from "react";

export function ArrivalCountdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = useMemo(() => {
    if (!value) return null;
    const target = new Date(`${value}T09:00:00`).getTime();
    const diff = target - now;
    if (Number.isNaN(target) || diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
    }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      past: false,
    };
  }, [value, now]);

  return (
    <div className="rounded-[1.5rem] border border-[color:var(--chip-border)] bg-[color:var(--muted-surface)] p-5">
      <label className="block max-w-sm">
        <span className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
          Approximate arrival date
        </span>
        <input
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="field-input mt-2 w-full"
        />
      </label>
      {remaining ? (
        <div className="mt-5 grid grid-cols-4 gap-2 text-center">
          {(
            [
              ["Days", remaining.days],
              ["Hours", remaining.hours],
              ["Min", remaining.minutes],
              ["Sec", remaining.seconds],
            ] as const
          ).map(([label, amount]) => (
            <div
              key={label}
              className="rounded-2xl bg-[color:var(--field-bg)] px-2 py-3"
            >
              <p className="display text-xl text-ink md:text-2xl">{amount}</p>
              <p className="mt-1 text-[10px] tracking-[0.14em] text-ink-soft uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-soft">
          Optional — feel the quiet countdown once a date is set.
        </p>
      )}
      {remaining?.past ? (
        <p className="mt-3 text-sm text-copper">
          That date has passed — choose another.
        </p>
      ) : null}
    </div>
  );
}
