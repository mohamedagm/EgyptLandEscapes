"use client";

import Image from "next/image";
import { atelierGuides } from "@/data/atelier";
import { imageBlurDataUrl } from "@/data/media";

export function GuideVoiceCards({
  title = "Who holds the journey",
  description = "Local specialists — private guiding, Nile hosting, desert nights.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section>
      <h2 className="display text-3xl text-ink md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
        {description}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {atelierGuides.map((guide) => (
          <article
            key={guide.name}
            className="overflow-hidden rounded-[1.5rem] soft-panel"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={guide.image}
                alt={guide.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="blur"
                blurDataURL={imageBlurDataUrl}
              />
            </div>
            <div className="space-y-3 p-5">
              <div>
                <h3 className="display text-2xl text-ink">{guide.name}</h3>
                <p className="mt-1 text-xs tracking-wide text-nile uppercase">
                  {guide.role}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft italic">
                “{guide.voice}”
              </p>
              <p className="text-xs text-ink-soft">
                {guide.languages.join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
