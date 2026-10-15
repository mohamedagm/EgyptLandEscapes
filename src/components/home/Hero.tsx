"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { heroMedia, imageBlurDataUrl } from "@/data/media";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/effects/Magnetic";
import { useShortlist } from "@/components/shortlist/ShortlistProvider";
import { cn } from "@/lib/utils";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { count } = useShortlist();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [videoReady, setVideoReady] = useState(false);
  const [paused, setPaused] = useState(false);

  const primaryCta =
    count > 0
      ? `Continue ${count} shortlisted`
      : "Explore journeys";
  const primaryHref = count > 0 ? "/tours" : "/tours";
  const supporting =
    count > 0
      ? "Your shortlist is already shaping a quieter route — open tours to refine, or customize from here."
      : "Private day tours across Giza and Luxor. Nile cabin nights between temples. Desert camps under chalk formations. Red Sea recovery when the journey needs air — designed by local specialists, confirmed on WhatsApp.";

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || reduceMotion) return;

    const tryPlay = async () => {
      if (userPausedRef.current) return;
      try {
        await video.play();
        setPaused(false);
      } catch {
        setPaused(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        void tryPlay();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    void tryPlay();
    return () => observer.disconnect();
  }, [reduceMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;
    if (video.paused) {
      userPausedRef.current = false;
      void video.play();
      setPaused(false);
    } else {
      userPausedRef.current = true;
      video.pause();
      setPaused(true);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-[94vh] overflow-hidden">
      <motion.div
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={heroMedia.poster}
          alt={heroMedia.videoAlt}
          fill
          priority
          placeholder="blur"
          blurDataURL={imageBlurDataUrl}
          className={cn(
            "object-cover object-[center_40%] transition-opacity duration-1000",
            videoReady && !reduceMotion ? "opacity-0" : "opacity-100",
          )}
          sizes="100vw"
        />

        {!reduceMotion ? (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-[center_40%] transition-opacity duration-1000",
              videoReady ? "opacity-100" : "opacity-0",
            )}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroMedia.poster}
            onLoadedData={() => setVideoReady(true)}
            aria-hidden
          >
            <source src={heroMedia.video} type="video/mp4" />
          </video>
        ) : null}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-shade/88 via-shade/55 to-shade/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-shade/75 via-transparent to-shade/35" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-mist to-transparent" />

      <div className="section-pad relative flex min-h-[94vh] items-end pb-20 pt-28 md:items-center md:pb-24">
        <div className="container-page w-full">
          <div className="max-w-3xl text-paper">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="h-px w-10 bg-sand/80" />
              <span className="text-[11px] tracking-[0.28em] text-sand uppercase">
                {siteConfig.name}
              </span>
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08 }}
              className="display text-[3.4rem] text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]"
            >
              Egypt, held
              <span className="mt-1 block italic text-sand">quietly private.</span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-paper/85 sm:text-lg"
            >
              {supporting}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={12}>
                <ButtonLink
                  href={primaryHref}
                  variant="primary"
                  magnetic={false}
                  className="!px-7 !py-3.5"
                >
                  {primaryCta}
                </ButtonLink>
              </Magnetic>
              <ButtonLink
                href="/customize"
                variant="ghost"
                magnetic={false}
                className="!border-white/25 !bg-white/8 !px-7 !py-3.5 !text-white hover:!bg-white/16"
              >
                {count > 0 ? "Turn shortlist into a brief" : "Customize my tour"}
              </ButtonLink>
              {!reduceMotion ? (
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="ml-1 rounded-full border border-white/20 bg-white/8 px-4 py-2.5 text-xs font-semibold tracking-wide text-white/90 uppercase backdrop-blur-sm hover:bg-white/14"
                  aria-pressed={!paused}
                >
                  {paused ? "Play film" : "Pause film"}
                </button>
              ) : null}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.24em] text-paper/55 uppercase">
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-paper/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
