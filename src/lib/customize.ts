export type CustomizePayload = {
  name: string;
  email: string;
  phone: string;
  travelMonth: string;
  adults: string;
  children: string;
  duration: string;
  hotelLevel: string;
  budget: string;
  interests: string[];
  destinations: string[];
  message: string;
};

export function buildCustomizeWhatsAppMessage(data: CustomizePayload) {
  const lines = [
    "Hello Egypt Land Escapes — I'd like a tailor-made private Egypt proposal.",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `WhatsApp/Phone: ${data.phone || "—"}`,
    `Travel month: ${data.travelMonth || "—"}`,
    `Adults: ${data.adults || "—"} | Children: ${data.children || "0"}`,
    `Duration: ${data.duration || "—"}`,
    `Hotel level: ${data.hotelLevel || "—"}`,
    `Budget: ${data.budget || "—"}`,
    `Interests: ${data.interests.length ? data.interests.join(", ") : "—"}`,
    `Destinations: ${data.destinations.length ? data.destinations.join(", ") : "—"}`,
    "",
    `Notes: ${data.message || "—"}`,
  ];
  return lines.join("\n");
}
