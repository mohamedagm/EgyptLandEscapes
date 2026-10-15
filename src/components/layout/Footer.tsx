import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-shade text-paper">
      <div className="section-pad py-14">
        <div className="container-page grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display text-3xl">{siteConfig.name}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/75">
              {siteConfig.tagline}. Local planning for private day tours, Nile
              cruises, desert camps, and Red Sea add-ons.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.18em] text-sand uppercase">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/customize" className="hover:text-white">
                  Customize
                </Link>
              </li>
              <li>
                <Link href="/trip-mood" className="hover:text-white">
                  Trip Mood quiz
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.18em] text-sand uppercase">
              Contact (demo)
            </p>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="hover:text-white"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.address}</li>
              <li>
                <a
                  href={buildWhatsAppUrl(generalEnquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand hover:text-white"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-page mt-10 border-t border-white/10 pt-6 text-xs text-paper/55">
          © {new Date().getFullYear()} {siteConfig.name}. Demo contact details
          for MVP.
        </div>
      </div>
    </footer>
  );
}
