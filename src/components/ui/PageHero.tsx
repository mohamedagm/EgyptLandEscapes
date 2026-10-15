"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { imageBlurDataUrl } from "@/data/media";
import { cn } from "@/lib/utils";

type Height = "sm" | "md" | "lg";

const heightClass: Record<Height, string> = {
  sm: "min-h-[38vh]",
  md: "min-h-[46vh]",
  lg: "min-h-[56vh]",
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  height = "md",
  objectPosition = "object-center",
  actions,
  align = "bottom",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image: string;
  imageAlt: string;
  height?: Height;
  objectPosition?: string;
  actions?: ReactNode;
  align?: "bottom" | "center";
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.55]);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", heightClass[height])}
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            placeholder="blur"
            blurDataURL={imageBlurDataUrl}
            className={cn("object-cover", objectPosition)}
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-shade/88 via-shade/55 to-shade/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-shade/70 via-transparent to-shade/30" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-mist to-transparent" />

      <div
        className={cn(
          "section-pad relative flex pt-28",
          heightClass[height],
          align === "center" ? "items-center pb-16" : "items-end pb-12 md:pb-14",
        )}
      >
        <div className="container-page max-w-3xl text-paper">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-sand/80" />
            <p className="text-[11px] tracking-[0.22em] text-sand uppercase">
              {eyebrow}
            </p>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06 }}
            className="display text-4xl text-white sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>

          {description ? (
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
              className="mt-4 max-w-2xl text-base leading-relaxed text-paper/85"
            >
              {description}
            </motion.p>
          ) : null}

          {actions ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              {actions}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
