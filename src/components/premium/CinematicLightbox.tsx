"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export type LightboxShot = {
  src: string;
  caption: string;
  place: string;
};

export function CinematicLightbox({
  item,
  onClose,
}: {
  item: LightboxShot | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-shade/80 p-4 backdrop-blur-sm md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.figure
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[1.5rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={item.src}
                alt={item.place}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            <figcaption className="bg-[#0b1210] px-5 py-4 text-paper md:px-7">
              <p className="text-[11px] tracking-[0.18em] text-sand uppercase">
                {item.place}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed md:text-base">
                {item.caption}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 text-xs font-semibold tracking-wide text-sand uppercase"
              >
                Close
              </button>
            </figcaption>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
