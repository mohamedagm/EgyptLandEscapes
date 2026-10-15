"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { atelierCabins } from "@/data/atelier";
import { imageBlurDataUrl } from "@/data/media";
import { cn } from "@/lib/utils";

export function CabinPeek() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const cabin = atelierCabins[index];
  const x = useMotionValue(0);
  const smooth = useSpring(x, { stiffness: 120, damping: 22 });
  const imgX = useTransform(smooth, [-40, 40], reduceMotion ? [0, 0] : [-18, 18]);

  return (
    <div
      className="relative overflow-hidden rounded-[2rem]"
      onMouseMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width - 0.5) * 80;
        x.set(px);
      }}
      onMouseLeave={() => x.set(0)}
    >
      <motion.div style={{ x: imgX }} className="relative aspect-[16/10]">
        <AnimatePresence mode="wait">
          <motion.div
            key={cabin.name}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Image
              src={cabin.image}
              alt={cabin.name}
              fill
              className="scale-110 object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              placeholder="blur"
              blurDataURL={imageBlurDataUrl}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-shade/80 via-shade/20 to-transparent" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 md:p-7">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-sand uppercase">
            Cabin peek
          </p>
          <h3 className="display mt-1 text-2xl text-white md:text-3xl">
            {cabin.name}
          </h3>
          <p className="mt-1 text-sm text-paper/80">{cabin.note}</p>
        </div>
        <div className="flex gap-2">
          {atelierCabins.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition",
                i === index ? "bg-sand" : "bg-white/35",
              )}
              aria-label={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
