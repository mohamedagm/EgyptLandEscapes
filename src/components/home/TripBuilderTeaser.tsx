import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { imageBlurDataUrl } from "@/data/media";

export function TripBuilderTeaser() {
  return (
    <section className="section-pad py-16 md:py-24">
      <div className="container-page overflow-hidden rounded-[2rem] border border-ink/10 bg-shade text-paper lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-64 lg:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=80"
            alt="Build a private Egypt route"
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={imageBlurDataUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-shade via-shade/40 to-transparent" />
        </div>
        <div className="relative p-8 md:p-12">
          <p className="text-[11px] tracking-[0.22em] text-sand uppercase">
            Trip builder
          </p>
          <h2 className="display mt-3 text-3xl text-white md:text-5xl">
            Sketch the days.
            <span className="mt-1 block italic text-sand">
              We’ll shape the proposal.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/75 md:text-base">
            Drag Cairo, Nile nights, desert, or Red Sea onto a timeline — then
            send the route on WhatsApp in one tap. A planning board, not a locked
            booking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/trip-builder"
              variant="secondary"
              className="btn-on-light"
            >
              Open trip builder
            </ButtonLink>
            <ButtonLink
              href="/customize"
              variant="ghost"
              className="!border-white/25 !text-paper hover:!bg-white/10"
            >
              Prefer a written brief?
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
