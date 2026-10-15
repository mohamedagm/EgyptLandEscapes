"use client";

import Image from "next/image";
import { useState } from "react";
import { imageBlurDataUrl } from "@/data/media";
import {
  CinematicLightbox,
  type LightboxShot,
} from "@/components/premium/CinematicLightbox";

export function JournalLightboxFigure({
  src,
  title,
  caption,
}: {
  src: string;
  title: string;
  caption: string;
}) {
  const [open, setOpen] = useState(false);
  const shot: LightboxShot = { src, place: title, caption };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative mt-8 block w-full overflow-hidden rounded-[1.5rem] text-left"
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 700px"
            placeholder="blur"
            blurDataURL={imageBlurDataUrl}
          />
        </div>
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-shade/70 to-transparent p-4 text-xs tracking-wide text-paper uppercase">
          Open cinematic view
        </span>
      </button>
      <CinematicLightbox item={open ? shot : null} onClose={() => setOpen(false)} />
    </>
  );
}
