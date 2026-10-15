"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  builderChapters,
  builderPresets,
  buildTripWhatsAppMessage,
  getBuilderChapter,
  summarizeRoute,
  type BuilderChapter,
} from "@/data/trip-builder";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RouteDraw } from "@/components/effects/RouteDraw";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ele-trip-builder-v1";
const MAX_DAYS = 16;
const MIN_DAYS = 4;

const toneClass: Record<BuilderChapter["tone"], string> = {
  city: "border-nile/30 bg-nile/15 text-sand",
  river: "border-copper/35 bg-copper/15 text-sand",
  desert: "border-sand/40 bg-sand/15 text-sand",
  sea: "border-cyan-400/25 bg-cyan-400/10 text-cyan-100",
  flex: "border-white/15 bg-white/5 text-ink-soft",
};

function makeDays(count: number, fill: Array<string | null> = []) {
  return Array.from({ length: count }, (_, index) => fill[index] ?? null);
}

export function TripBuilder() {
  const [days, setDays] = useState<Array<string | null>>(() =>
    makeDays(8, builderPresets[0]?.days),
  );
  const [selectedChapter, setSelectedChapter] = useState<string | null>("cairo");
  const [notes, setNotes] = useState("");
  const [dragOverDay, setDragOverDay] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          days?: Array<string | null>;
          notes?: string;
        };
        if (parsed.days?.length) setDays(parsed.days);
        if (parsed.notes) setNotes(parsed.notes);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ days, notes }));
  }, [days, notes, ready]);

  const summary = useMemo(() => summarizeRoute(days), [days]);
  const filledCount = days.filter(Boolean).length;
  const whatsappHref = buildWhatsAppUrl(
    buildTripWhatsAppMessage(days, notes),
  );

  const placeChapter = (dayIndex: number, chapterId: string | null) => {
    setDays((prev) => prev.map((item, index) => (index === dayIndex ? chapterId : item)));
  };

  const applyPreset = (presetId: string) => {
    const preset = builderPresets.find((item) => item.id === presetId);
    if (!preset) return;
    setDays(makeDays(preset.days.length, preset.days));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-6">
        <div className="rounded-[1.75rem] soft-panel p-5 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-[0.18em] text-nile uppercase">
                Chapters
              </p>
              <h2 className="display mt-1 text-2xl text-ink md:text-3xl">
                Drag onto a day — or tap a day after selecting
              </h2>
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {builderChapters.map((chapter) => {
              const active = selectedChapter === chapter.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData("text/chapter", chapter.id);
                    event.dataTransfer.effectAllowed = "copy";
                    setSelectedChapter(chapter.id);
                  }}
                  onClick={() => setSelectedChapter(chapter.id)}
                  className={cn(
                    "rounded-2xl border px-3 py-3 text-left transition",
                    toneClass[chapter.tone],
                    active && "ring-2 ring-nile/40",
                  )}
                >
                  <p className="text-sm font-semibold">{chapter.name}</p>
                  <p className="mt-1 text-xs opacity-80">{chapter.blurb}</p>
                  <p className="mt-2 text-[10px] tracking-[0.14em] uppercase opacity-70">
                    Often {chapter.suggestedNights} night
                    {chapter.suggestedNights === 1 ? "" : "s"}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[1.75rem] soft-panel p-5 md:p-6">
          <p className="text-[11px] tracking-[0.18em] text-nile uppercase">
            Start from a shape
          </p>
          <div className="mt-4 grid gap-2">
            {builderPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className="choice-chip rounded-2xl px-4 py-3 text-left transition hover:border-nile/35"
              >
                <p className="text-sm font-semibold text-ink">{preset.label}</p>
                <p className="mt-1 text-xs text-ink-soft">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.75rem] soft-panel p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-[0.18em] text-nile uppercase">
                Your timeline
              </p>
              <h2 className="display mt-1 text-2xl text-ink md:text-3xl">
                {days.length} days · {filledCount} placed
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={days.length <= MIN_DAYS}
                onClick={() =>
                  setDays((prev) =>
                    prev.length > MIN_DAYS ? prev.slice(0, -1) : prev,
                  )
                }
                className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink disabled:opacity-40"
              >
                − Day
              </button>
              <button
                type="button"
                disabled={days.length >= MAX_DAYS}
                onClick={() =>
                  setDays((prev) =>
                    prev.length < MAX_DAYS ? [...prev, null] : prev,
                  )
                }
                className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink disabled:opacity-40"
              >
                + Day
              </button>
              <button
                type="button"
                onClick={() => setDays(makeDays(days.length))}
                className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink-soft"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-[10px] tracking-[0.16em] text-ink-soft uppercase">
              Route draw
            </p>
            <RouteDraw days={days} />
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {days.map((chapterId, index) => {
                const chapter = chapterId
                  ? getBuilderChapter(chapterId)
                  : null;
                return (
                  <motion.button
                    key={`day-${index}`}
                    type="button"
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    onClick={() => {
                      if (selectedChapter) placeChapter(index, selectedChapter);
                    }}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragOverDay(index);
                    }}
                    onDragLeave={() => setDragOverDay(null)}
                    onDrop={(event) => {
                      event.preventDefault();
                      const id = event.dataTransfer.getData("text/chapter");
                      if (id) placeChapter(index, id);
                      setDragOverDay(null);
                    }}
                    className={cn(
                      "min-h-[5.5rem] rounded-2xl border border-dashed p-3 text-left transition",
                      dragOverDay === index
                        ? "border-nile bg-nile/10"
                        : chapter
                      ? "border-solid border-[color:var(--chip-border)] bg-[color:var(--muted-surface)]"
                      : "border-[color:var(--chip-border)] bg-[color:var(--field-bg)]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[10px] tracking-[0.16em] text-ink-soft uppercase">
                        Day {index + 1}
                      </p>
                      {chapter ? (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(event) => {
                            event.stopPropagation();
                            placeChapter(index, null);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              placeChapter(index, null);
                            }
                          }}
                          className="text-[10px] font-semibold text-copper"
                        >
                          Remove
                        </span>
                      ) : null}
                    </div>
                    {chapter ? (
                      <>
                        <p className="mt-2 text-sm font-semibold text-ink">
                          {chapter.name}
                        </p>
                        <p className="mt-1 text-xs text-ink-soft">
                          {chapter.blurb}
                        </p>
                      </>
                    ) : (
                      <p className="mt-3 text-xs text-ink-soft">
                        Drop a chapter here
                        {selectedChapter ? " · or tap to place selected" : ""}
                      </p>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="rounded-[1.75rem] soft-panel p-5 md:p-6">
          <p className="text-[11px] tracking-[0.18em] text-nile uppercase">
            Route summary
          </p>
          {summary.length === 0 ? (
            <p className="mt-3 text-sm text-ink-soft">
              Place a few chapters to see night counts by destination.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {summary.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-[color:var(--muted-surface)] px-3 py-2 text-sm"
                >
                  <span className="font-medium text-ink">{item.name}</span>
                  <span className="text-ink-soft">
                    {item.nights} day{item.nights === 1 ? "" : "s"}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <label className="mt-5 block">
            <span className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
              Notes for our team
            </span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Travel month, adults/children, hotel level, walking comfort…"
              className="mt-2 w-full field-input !rounded-2xl text-sm"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink
              href={whatsappHref}
              external
              className={!filledCount ? "pointer-events-none opacity-40" : ""}
            >
              Send route on WhatsApp
            </ButtonLink>
            <ButtonLink href="/customize" variant="ghost">
              Continue in customize form
            </ButtonLink>
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            Planning board only — we reply with a written proposal before anything
            locks.
          </p>
        </div>
      </div>
    </div>
  );
}
