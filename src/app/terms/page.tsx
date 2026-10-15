import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <div className="section-pad py-14 md:py-20">
      <div className="container-page max-w-3xl space-y-4 text-ink-soft">
        <h1 className="display text-4xl text-ink">Terms</h1>
        <p>
          Tour descriptions and prices on this MVP website are samples for
          design and flow review. Final services, inclusions, and rates are
          confirmed only in a written proposal from {siteConfig.name}.
        </p>
        <p>
          WhatsApp and form enquiries are requests for information — not
          confirmed bookings until both sides agree the itinerary and payment
          terms in writing.
        </p>
        <p>
          Replace this page with your full operator terms before taking public
          bookings.
        </p>
      </div>
    </div>
  );
}
