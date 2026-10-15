"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getTourBySlug } from "@/data/tours";
import { imageBlurDataUrl } from "@/data/media";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useShortlist } from "@/components/shortlist/ShortlistProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { dispatchShortlistBurst } from "@/components/effects/ShortlistBurst";

export function ShortlistDrawer() {
  const { slugs, count, open, setOpen, remove, clear } = useShortlist();
  const items = slugs
    .map((slug) => getTourBySlug(slug))
    .filter((tour): tour is NonNullable<typeof tour> => Boolean(tour));

  const whatsappMessage = [
    "Hello Egypt Land Escapes — I'm shortlisting these journeys:",
    "",
    ...items.map(
      (tour, index) =>
        `${index + 1}. ${tour.title} (${tour.duration}${
          tour.priceFrom > 0 ? ` · from $${tour.priceFrom}` : " · custom quote"
        })`,
    ),
    "",
    "Please help me shape a private proposal around these.",
  ].join("\n");

  return (
    <>
      <button
        type="button"
        data-shortlist-fab
        onClick={() => setOpen(true)}
        className="fixed start-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full border border-[color:var(--chip-border)] bg-mist/95 px-4 py-3 text-sm font-semibold text-ink shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur transition hover:-translate-y-0.5 md:start-6 md:bottom-6 [[data-brief=on]_&]:bottom-24 [[data-brief=on]_&]:md:bottom-28"
        aria-label={`Open shortlist (${count})`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-nile text-xs text-white">
          {count}
        </span>
        <span className="hidden sm:inline">Shortlist</span>
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close shortlist"
              className="fixed inset-0 z-[70] bg-shade/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Tour shortlist"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 end-0 z-[80] flex w-full max-w-md flex-col border-s border-ink/10 bg-mist shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-nile uppercase">
                    Your shortlist
                  </p>
                  <h2 className="display text-2xl text-ink">
                    {count} journey{count === 1 ? "" : "s"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
                {items.length === 0 ? (
                  <div className="rounded-[1.5rem] soft-panel p-6 text-sm text-ink-soft">
                    Save tours with the heart on any card. Then send the shortlist
                    on WhatsApp in one tap.
                    <div className="mt-4">
                      <ButtonLink
                        href="/tours"
                        variant="ghost"
                        className="!py-2.5 !text-xs"
                      >
                        Browse tours
                      </ButtonLink>
                    </div>
                  </div>
                ) : (
                  items.map((tour) => (
                    <div
                      key={tour.slug}
                      className="flex gap-3 rounded-[1.25rem] border border-[color:var(--chip-border)] bg-[color:var(--muted-surface)] p-3"
                    >
                      <Link
                        href={`/tours/${tour.slug}`}
                        onClick={() => setOpen(false)}
                        className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl"
                      >
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                          placeholder="blur"
                          blurDataURL={imageBlurDataUrl}
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/tours/${tour.slug}`}
                          onClick={() => setOpen(false)}
                          className="line-clamp-2 text-sm font-semibold text-ink hover:text-nile"
                        >
                          {tour.title}
                        </Link>
                        <p className="mt-1 text-xs text-ink-soft">
                          {tour.duration}
                          {tour.priceFrom > 0
                            ? ` · from ${formatPrice(tour.priceFrom)}`
                            : " · custom quote"}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(tour.slug)}
                          className="mt-2 text-xs font-semibold text-copper"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 ? (
                <div className="space-y-3 border-t border-ink/10 px-5 py-4">
                  <ButtonLink
                    href={buildWhatsAppUrl(whatsappMessage)}
                    external
                    className="w-full"
                  >
                    Send shortlist on WhatsApp
                  </ButtonLink>
                  <button
                    type="button"
                    onClick={clear}
                    className="w-full text-center text-xs font-semibold text-ink-soft hover:text-ink"
                  >
                    Clear all
                  </button>
                </div>
              ) : null}
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function ShortlistHeart({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { has, toggle, setOpen } = useShortlist();
  const saved = has(slug);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove from shortlist" : "Save to shortlist"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const rect = event.currentTarget.getBoundingClientRect();
        toggle(slug);
        if (!saved) {
          dispatchShortlistBurst(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
          );
          window.setTimeout(() => setOpen(true), 720);
        }
      }}
      className={`heart-on-media inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
      </svg>
    </button>
  );
}
