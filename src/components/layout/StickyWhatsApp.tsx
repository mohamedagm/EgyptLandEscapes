"use client";

import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export function StickyWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl(generalEnquiryMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed end-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#1FAF5B] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(16,25,22,0.28)] transition hover:-translate-y-0.5 hover:bg-[#18964d] md:end-6 md:bottom-6 [[data-brief=on]_&]:bottom-24 [[data-brief=on]_&]:md:bottom-28"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-base">
        ✆
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
