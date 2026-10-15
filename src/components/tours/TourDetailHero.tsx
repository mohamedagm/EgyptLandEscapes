"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { imageBlurDataUrl } from "@/data/media";

export function TourDetailHero({
  image,
  title,
  eyebrow,
  description,
  chips,
  morphName,
}: {
  image: string;
  title: string;
  eyebrow: string;
  description: string;
  chips?: ReactNode;
  morphName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "16%"]);

  return (
    <section ref={ref} className="relative min-h-[56vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={morphName ? { viewTransitionName: morphName } : undefined}
          >
            <Image
              src={image}
              alt={title}
              fill
              priority
              placeholder="blur"
              blurDataURL={imageBlurDataUrl}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-shade via-shade/50 to-shade/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-shade/40 via-transparent to-transparent" />

      <div className="section-pad relative flex min-h-[56vh] items-end pb-12 pt-28">
        <div className="container-page max-w-3xl text-paper">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.18em] text-sand uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.8 }}
            className="display mt-3 text-4xl sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="mt-4 max-w-2xl text-base text-paper/85"
          >
            {description}
          </motion.p>
          {chips ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.6 }}
              className="mt-6 flex flex-wrap gap-2 text-xs tracking-[0.12em] text-paper/70 uppercase"
            >
              {chips}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
