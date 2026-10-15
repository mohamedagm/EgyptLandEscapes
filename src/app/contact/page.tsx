import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Egypt Land Escapes by WhatsApp, email, phone, or the enquiry form for private Egypt tour planning.",
};

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us when
            <span className="mt-1 block italic text-sand">you’re traveling</span>
          </>
        }
        description="Demo details below. The form emails the team when RESEND_API_KEY is set — otherwise it runs in demo mode. WhatsApp stays the fastest path for dates and traveler count."
        image="https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Contact Egypt Land Escapes"
        height="sm"
        actions={
          <>
            <ButtonLink
              href={buildWhatsAppUrl(generalEnquiryMessage())}
              external
              variant="primary"
            >
              Open WhatsApp
            </ButtonLink>
            <ButtonLink
              href="#enquiry"
              variant="ghost"
              className="!border-white/25 !bg-white/8 !text-white hover:!bg-white/16"
            >
              Use the form
            </ButtonLink>
          </>
        }
      />

      <div className="section-pad py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Reach the team"
              title="Human reply. Written proposal."
              description="Share your month, adults/children, and the feeling you want — temples, Nile nights, desert, or beach recovery."
            />

            <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
              <StaggerItem>
                <div className="soft-panel rounded-2xl p-4 transition hover:border-nile/40">
                  <p className="text-[11px] tracking-[0.14em] text-nile uppercase">
                    License
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {siteConfig.trust.license}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="soft-panel rounded-2xl p-4 transition hover:border-nile/40">
                  <p className="text-[11px] tracking-[0.14em] text-nile uppercase">
                    Traveler score
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {siteConfig.trust.rating}/5 · {siteConfig.trust.reviewCount}{" "}
                    reviews
                  </p>
                </div>
              </StaggerItem>
            </Stagger>

            <div className="mt-10 space-y-6">
              <div className="rounded-3xl soft-panel p-5">
                <p className="text-xs tracking-[0.16em] text-nile uppercase">
                  WhatsApp
                </p>
                <p className="display mt-2 text-2xl text-ink">
                  {contact.phoneDisplay}
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  Best for quick dates, traveler count, and tour links.
                </p>
                <div className="mt-4">
                  <ButtonLink
                    href={buildWhatsAppUrl(generalEnquiryMessage())}
                    external
                    className="!py-2.5 !text-xs"
                  >
                    Open WhatsApp
                  </ButtonLink>
                </div>
              </div>

              <div className="space-y-3 text-sm text-ink-soft">
                <p>
                  <span className="font-semibold text-ink">Email:</span>{" "}
                  <a href={`mailto:${contact.email}`} className="link-accent font-medium">
                    {contact.email}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-ink">Phone:</span>{" "}
                  <a href={`tel:${contact.phoneTel}`} className="link-accent font-medium">
                    {contact.phoneDisplay}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-ink">Office:</span>{" "}
                  {contact.address}
                </p>
                <p>
                  <span className="font-semibold text-ink">Hours:</span>{" "}
                  {contact.hours}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              id="enquiry"
              className="scroll-mt-28 rounded-[1.75rem] soft-panel p-6 md:p-8"
            >
              <h2 className="display text-3xl text-ink">Send an enquiry</h2>
              <p className="mt-2 mb-6 text-sm text-ink-soft">
                Include travel month, adults/children, and any mobility notes. Do
                not send passport or card details here.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
