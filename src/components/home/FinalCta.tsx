"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { useShortlist } from "@/components/shortlist/ShortlistProvider";

export function FinalCta() {
  const { count, setOpen } = useShortlist();

  return (
    <section className="section-pad pb-24 pt-6">
      <div className="container-page relative overflow-hidden rounded-[2rem] bg-nile-deep px-6 py-16 text-paper md:px-14 md:py-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sand/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <p className="text-[11px] tracking-[0.22em] text-sand uppercase">
            {count > 0 ? "Your shortlist is warm" : "Ready when you are"}
          </p>
          <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">
            {count > 0 ? (
              <>
                {count} journey{count === 1 ? "" : "s"} waiting.
                <span className="mt-1 block italic text-sand">
                  Let’s shape the proposal.
                </span>
              </>
            ) : (
              <>
                Tell us your month.
                <span className="mt-1 block italic text-sand">
                  We’ll shape the route.
                </span>
              </>
            )}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-paper/80">
            {count > 0
              ? "Open the shortlist, refine the mix, or send a customize brief — we’ll reply with a written outline before anything locks."
              : "Demo contact lines are live for this MVP — swap them later for your real WhatsApp, email, and office details."}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {count > 0 ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink"
              >
                Open shortlist
              </button>
            ) : (
              <ButtonLink
                href="/customize"
                variant="secondary"
                className="btn-on-light"
              >
                Customize my tour
              </ButtonLink>
            )}
            <ButtonLink
              href={
                count > 0 ? "/customize" : buildWhatsAppUrl(generalEnquiryMessage())
              }
              external={count === 0}
              variant="ghost"
              magnetic={false}
              className="!border-white/25 !bg-transparent !text-paper hover:!bg-white/10"
            >
              {count > 0
                ? "Turn shortlist into a brief"
                : `WhatsApp ${siteConfig.contact.phoneDisplay}`}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
