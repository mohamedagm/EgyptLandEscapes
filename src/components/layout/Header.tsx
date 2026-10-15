"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/data/site";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

function SearchHintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new Event("ele:open-search"));
      }}
      className="surface-chip hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition xl:inline-flex"
      aria-label="Search journeys"
    >
      Search
      <kbd className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-[10px] text-ink">
        ⌘K
      </kbd>
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition duration-300",
        scrolled
          ? "border-b border-[color:var(--chip-border)] bg-mist/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="section-pad">
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <Link href="/" className="group min-w-0">
            <span className="display block truncate text-xl text-ink sm:text-2xl">
              {siteConfig.name}
            </span>
            <span className="hidden text-[11px] tracking-[0.16em] text-ink-soft uppercase sm:block">
              Private Egypt journeys
            </span>
          </Link>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap text-[13px] font-medium transition xl:text-sm",
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? "text-nile"
                    : "text-ink-soft hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <SearchHintButton />
            <ButtonLink
              href="/customize"
              variant="primary"
              className="!py-2.5 !text-xs"
            >
              Customize
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              className="surface-chip inline-flex h-10 w-10 items-center justify-center rounded-full"
              onClick={() => setOpen((v) => !v)}
            >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block h-0.5 w-4 bg-ink transition",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-4 bg-ink transition",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-4 bg-ink transition",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </div>
          </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--chip-border)] bg-mist/95 px-5 py-5 backdrop-blur lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-ink"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/customize" className="w-full">
              Customize my tour
            </ButtonLink>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new Event("ele:open-search"));
              }}
              className="btn-ghost w-full rounded-full px-4 py-3 text-sm font-semibold"
            >
              Search journeys (⌘K)
            </button>
            <ButtonLink href="/trip-mood" className="w-full" variant="ghost">
              Trip Mood quiz
            </ButtonLink>
            <ButtonLink
              href={buildWhatsAppUrl(generalEnquiryMessage())}
              external
              variant="ghost"
              className="w-full"
            >
              WhatsApp us
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
