import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function DarkCtaBand({
  eyebrow,
  title,
  description,
  actions,
  tone = "nile",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
  tone?: "nile" | "ink";
  className?: string;
}) {
  return (
    <Reveal>
      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] px-6 py-12 text-paper md:px-12 md:py-14",
          tone === "nile" ? "bg-nile-deep" : "bg-shade",
          className,
        )}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sand/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-8 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-sand uppercase">
              {eyebrow}
            </p>
            <h2 className="display mt-3 text-3xl md:text-5xl">{title}</h2>
            {description ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/75 md:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex flex-wrap gap-3 lg:justify-end">{actions}</div>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
