"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  moodQuestions,
  moodResults,
  scoreMood,
} from "@/data/trip-mood";
import { getTourBySlug } from "@/data/tours";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TourCard } from "@/components/tours/TourCard";

export function TripMoodQuiz({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= moodQuestions.length;
  const question = moodQuestions[step];

  const resultId = useMemo(
    () => (done ? scoreMood(answers) : null),
    [answers, done],
  );
  const result = resultId ? moodResults[resultId] : null;
  const sampleTour = result?.tourSlug
    ? getTourBySlug(result.tourSlug)
    : undefined;

  const progress = done
    ? 100
    : Math.round((step / moodQuestions.length) * 100);

  return (
    <div
      className={
        compact
          ? "rounded-[2rem] soft-panel p-6 md:p-8"
          : "rounded-[2rem] soft-panel p-6 md:p-10"
      }
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-[11px] tracking-[0.2em] text-nile uppercase">
          Trip mood
        </p>
        <p className="text-xs text-ink-soft">{progress}%</p>
      </div>
      <div className="mb-8 h-1 overflow-hidden rounded-full bg-ink/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-nile to-copper"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!done && question ? (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.28 }}
          >
            <h2 className="display text-3xl text-ink md:text-4xl">
              {question.prompt}
            </h2>
            <div className="mt-6 grid gap-3">
              {question.answers.map((answer) => (
                <button
                  key={answer.id}
                  type="button"
                  onClick={() => {
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: answer.id,
                    }));
                    setStep((value) => value + 1);
                  }}
                  className="choice-chip rounded-2xl px-4 py-4 text-left text-sm font-medium transition hover:-translate-y-0.5"
                >
                  {answer.label}
                </button>
              ))}
            </div>
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((value) => Math.max(0, value - 1))}
                className="mt-5 text-xs font-semibold text-ink-soft hover:text-ink"
              >
                ← Back
              </button>
            ) : null}
          </motion.div>
        ) : result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-[11px] tracking-[0.18em] text-copper uppercase">
              Your journey feel
            </p>
            <h2 className="display mt-2 text-3xl text-ink md:text-5xl">
              {result.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
              {result.blurb}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={result.href}>{result.cta}</ButtonLink>
              <ButtonLink href="/customize" variant="ghost">
                Customize from this mood
              </ButtonLink>
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
                className="rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink-soft hover:text-ink"
              >
                Retake
              </button>
            </div>
            {sampleTour && !compact ? (
              <div className="mt-10 max-w-md">
                <p className="mb-4 text-xs tracking-[0.14em] text-ink-soft uppercase">
                  A published route in this mood
                </p>
                <TourCard tour={sampleTour} />
              </div>
            ) : sampleTour && compact ? (
              <p className="mt-6 text-sm text-ink-soft">
                Start with{" "}
                <Link
                  href={`/tours/${sampleTour.slug}`}
                  className="font-semibold text-nile"
                >
                  {sampleTour.title}
                </Link>
                .
              </p>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
