import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="section-pad py-14 md:py-20">
      <div className="container-page max-w-3xl space-y-4 text-ink-soft">
        <h1 className="display text-4xl text-ink">Privacy Policy</h1>
        <p>
          This is a short MVP privacy notice for {siteConfig.name}. Enquiry
          forms may collect your name, email, phone number, and message so we
          can respond to travel requests.
        </p>
        <p>
          Do not submit payment-card numbers or passport scans through the
          public contact form. We will request sensitive documents only through
          a secure process when a booking is confirmed.
        </p>
        <p>
          Demo mode currently logs enquiries on the server for development. Replace
          this flow with your preferred email or CRM before production launch.
        </p>
      </div>
    </div>
  );
}
