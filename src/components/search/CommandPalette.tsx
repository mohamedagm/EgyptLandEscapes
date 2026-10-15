"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { tours, categoryLabels } from "@/data/tours";
import { destinations } from "@/data/destinations";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

type Hit = {
  id: string;
  label: string;
  hint: string;
  href: string;
  group: "Pages" | "Tours" | "Destinations";
};

const pageHits: Hit[] = [
  ...navLinks.map((link) => ({
    id: `page-${link.href}`,
    label: link.label,
    hint: "Page",
    href: link.href,
    group: "Pages" as const,
  })),
  {
    id: "page-customize",
    label: "Customize my tour",
    hint: "Request form",
    href: "/customize",
    group: "Pages",
  },
  {
    id: "page-mood",
    label: "Trip Mood quiz",
    hint: "Find your journey feel",
    href: "/trip-mood",
    group: "Pages",
  },
  {
    id: "page-builder",
    label: "Trip Builder",
    hint: "Visual day-by-day route",
    href: "/trip-builder",
    group: "Pages",
  },
];

export function CommandPalette() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const catalog = useMemo<Hit[]>(() => {
    const tourHits = tours.map((tour) => ({
      id: `tour-${tour.slug}`,
      label: tour.title,
      hint: `${categoryLabels[tour.category]} · ${tour.duration}`,
      href: `/tours/${tour.slug}`,
      group: "Tours" as const,
    }));
    const destinationHits = destinations.map((place) => ({
      id: `dest-${place.slug}`,
      label: place.name,
      hint: place.region,
      href: `/destinations#${place.slug}`,
      group: "Destinations" as const,
    }));
    return [...pageHits, ...tourHits, ...destinationHits];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalog.slice(0, 10);
    return catalog
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.hint.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q),
      )
      .slice(0, 12);
  }, [catalog, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const isToggle =
        (event.key === "k" || event.key === "K") &&
        (event.metaKey || event.ctrlKey);
      if (isToggle) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ele:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ele:open-search", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-shade/50 px-4 pt-[12vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search journeys"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-white/20 bg-mist shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-b border-ink/10 px-4 py-3">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setActive((i) => Math.min(i + 1, results.length - 1));
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setActive((i) => Math.max(i - 1, 0));
                    } else if (event.key === "Enter" && results[active]) {
                      event.preventDefault();
                      go(results[active].href);
                    }
                  }}
                  placeholder="Search tours, destinations, pages…"
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-soft"
                />
              </div>
              <ul className="max-h-[50vh] overflow-y-auto py-2">
                {results.length === 0 ? (
                  <li className="px-4 py-6 text-sm text-ink-soft">
                    No matches — try “Nile”, “Luxor”, or “Customize”.
                  </li>
                ) : (
                  results.map((item, index) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(index)}
                        onClick={() => go(item.href)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition",
                          index === active ? "bg-nile/10" : "hover:bg-[color:var(--muted-surface)]",
                        )}
                      >
                        <span>
                          <span className="block text-sm font-semibold text-ink">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-ink-soft">
                            {item.group} · {item.hint}
                          </span>
                        </span>
                        <span className="text-[10px] tracking-[0.14em] text-ink-soft uppercase">
                          Open
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
              <div className="border-t border-ink/10 px-4 py-2 text-[10px] tracking-[0.12em] text-ink-soft uppercase">
                ↑↓ navigate · Enter open · Esc close
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
