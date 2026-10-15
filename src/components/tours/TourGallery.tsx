"use client";

import Image from "next/image";
import { useState } from "react";
import { imageBlurDataUrl } from "@/data/media";
import { cn } from "@/lib/utils";
import {
  CinematicLightbox,
  type LightboxShot,
} from "@/components/premium/CinematicLightbox";

const captions = [
  "Held light — the frame before the day fills in.",
  "A quieter angle of the same place.",
  "Detail for the written proposal moodboard.",
  "Atmosphere more than a checklist photo.",
];

export function TourGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxShot | null>(null);

  const openAt = (index: number) => {
    setActive(index);
    setLightbox({
      src: images[index],
      place: title,
      caption: captions[index % captions.length],
    });
  };

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h2 className="display text-3xl text-ink">Gallery</h2>
        <p className="text-xs tracking-[0.14em] text-ink-soft uppercase">
          Tap to open cinematic view
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1.4fr_0.8fr]">
        <button
          type="button"
          className="relative min-h-64 overflow-hidden rounded-[1.5rem] md:min-h-[22rem]"
          onClick={() => openAt(active)}
        >
          <Image
            src={images[active]}
            alt={`${title} gallery ${active + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            placeholder="blur"
            blurDataURL={imageBlurDataUrl}
          />
        </button>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => openAt(index)}
              onMouseEnter={() => setActive(index)}
              className={cn(
                "relative min-h-24 overflow-hidden rounded-[1.1rem] md:min-h-[5.1rem]",
                active === index && "ring-2 ring-nile ring-offset-2",
              )}
            >
              <Image
                src={image}
                alt={`${title} thumb ${index + 1}`}
                fill
                className="object-cover"
                sizes="200px"
              />
            </button>
          ))}
        </div>
      </div>

      <CinematicLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
