import { siteConfig } from "@/data/site";

export function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`;
}

export function tourEnquiryMessage(tourTitle: string) {
  return `Hello Egypt Land Escapes — I'm interested in "${tourTitle}". Could you share availability and a private quote?`;
}

export function generalEnquiryMessage() {
  return "Hello Egypt Land Escapes — I'd like help planning a private Egypt trip.";
}
