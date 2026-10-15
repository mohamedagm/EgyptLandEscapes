"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TourCard } from "@/components/tours/TourCard";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { destinations } from "@/data/destinations";
import {
  categories,
  filterTours,
  type DurationFilter,
  type PriceFilter,
  type TourCategory,
} from "@/data/tours";
import { cn } from "@/lib/utils";

const durationOptions: { id: DurationFilter; label: string }[] = [
  { id: "all", label: "Any duration" },
  { id: "day", label: "Day tours" },
  { id: "short", label: "2–5 days" },
  { id: "classic", label: "6–10 days" },
  { id: "long", label: "11+ days" },
  { id: "flex", label: "Flexible / custom" },
];

const priceOptions: { id: PriceFilter; label: string }[] = [
  { id: "all", label: "Any price" },
  { id: "under-200", label: "Under $200" },
  { id: "200-1000", label: "$200–$1,000" },
  { id: "1000-plus", label: "$1,000+" },
  { id: "custom", label: "Custom quote" },
];

export function ToursExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = (searchParams.get("category") || "all") as TourCategory | "all";
  const destination = searchParams.get("destination") || "all";
  const duration = (searchParams.get("duration") || "all") as DurationFilter;
  const price = (searchParams.get("price") || "all") as PriceFilter;

  const filtered = useMemo(
    () => filterTours({ category, destination, duration, price }),
    [category, destination, duration, price],
  );

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clearFilters() {
    router.push(pathname, { scroll: false });
  }

  const hasExtraFilters =
    destination !== "all" || duration !== "all" || price !== "all";

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => updateParam("category", item.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              category === item.id
                ? "bg-nile text-white"
                : "surface-chip",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="surface-muted mt-5 grid gap-3 rounded-[1.5rem] p-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1.5 block text-xs tracking-[0.14em] text-ink-soft uppercase">
            Destination
          </span>
          <select
            value={destination}
            onChange={(event) => updateParam("destination", event.target.value)}
            className="field-input !rounded-xl !py-2.5"
          >
            <option value="all">All destinations</option>
            {destinations.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-xs tracking-[0.14em] text-ink-soft uppercase">
            Duration
          </span>
          <select
            value={duration}
            onChange={(event) => updateParam("duration", event.target.value)}
            className="field-input !rounded-xl !py-2.5"
          >
            {durationOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-xs tracking-[0.14em] text-ink-soft uppercase">
            Price from
          </span>
          <select
            value={price}
            onChange={(event) => updateParam("price", event.target.value)}
            className="field-input !rounded-xl !py-2.5"
          >
            {priceOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
        <p>
          Showing <span className="font-semibold text-ink">{filtered.length}</span>{" "}
          tour{filtered.length === 1 ? "" : "s"}
        </p>
        {(category !== "all" || hasExtraFilters) && (
          <button type="button" onClick={clearFilters} className="text-nile">
            Clear filters
          </button>
        )}
      </div>

      <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tour) => (
          <StaggerItem key={tour.slug}>
            <TourCard tour={tour} />
          </StaggerItem>
        ))}
      </Stagger>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-[1.5rem] soft-panel p-8 text-center">
          <p className="display text-2xl text-ink">No tours match these filters</p>
          <p className="mt-2 text-sm text-ink-soft">
            Try clearing filters or{" "}
            <Link href="/tailor-made" className="text-nile">
              request a tailor-made plan
            </Link>
            .
          </p>
        </div>
      ) : null}
    </div>
  );
}
